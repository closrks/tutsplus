// 1: How could you rewrite the following to make it shorter?
if (foo) {
  bar.doSomething(el);
} else {
  bar.doSomethingElse(el);
}

// Carlos Avila
// use a ternary to switch between functions of a bar object
bar[foo ? 'doSomething' : 'doSomethingElse'](el);


// 2: What is the faulty logic in the following code?
var foo = 'hello';

(function() {
  var foo = foo || 'world';
  console.log(foo);
})();

// Carlos Avila
// The faulty logic is that foo inside the function will always evaluate to 'world'
// the || operator useless
// The var declarations (in this case foo) are hoisted to the top of the script
var foo = 'hello';

(function() {
  var foo = 'world';
  console.log(foo);
})();



// 3: Given the following code, how would you override the value of the bar
// property for the variable foo without affecting the value of the bar
// property for the variable bim?
//
// How would you affect the value of the bar property for both foo and bim?
//
// How would you add a method to foo and bim to console.log the value of
// each object's bar property?
//
// How would you tell if the object's bar property had been overridden for
// the particular object?
var Thinger = function() {
  return this;
};

Thinger.prototype = {
  bar : 'baz'
};

var foo = new Thinger(),
    bim = new Thinger();


// Carlos Avila
// override the value of the bar property for the variable foo without affecting bim
foo.bar = 'does not affect bim';

// Carlos Avila
// affect the value of the bar property for both foo and bim
Thinger.prototype.bar = 'affects bar property for both foo and bim';

// Carlos Avila
// add a method to foo and bim to console.log to value of bar property
Thinger.prototype.bar = function() {
  console.log(this.bar);
};

// Carlos Avila
// tell if the bar property had been overriden for the particular object
foo.hasOwnProperty('bar');
bim.hasOwnProperty('bar');


// 4: Given the following code, and assuming that each defined object has a
// 'destroy' method, how would you destroy all of the objects contained in the
// myObjects object?
var myObjects = {
  thinger: new myApp.Thinger(),
  gizmo: new myApp.Gizmo(),
  widget: new myApp.Widget()
};

// Carlos Avila
// each defined object has a destroy method
// iterate through each object in myObjects - destroy and delete
for (var object in myObjects) {
  if (myObjects.hasOwnProperty(object)) {
    myObjects[object].destroy();
    delete myObjects[obj];
  }
};


// 5: Given the following array, create an array that contains the contents of
// each array item repeated three times, with a space between each item. so,
// for example, if an array item is 'foo' then the new array should contain an
// array item 'foo foo foo'. (you can assume the library of your choice is
// available)
var myArray = [ 'foo', 'bar', 'baz' ];

// Carlos Avila
// Many solutions - depends on frequency of use
var tripleArray = [];
for (var i = 0, len = myArray.length; i < len; i++) {
  var item = myArray[i];
  tripleArray.push([item, item, item].join(' '));
}


// 6: How could you improve the following code?
$(document).ready(function() {
  $('.foo #bar').css('color', 'red');
  $('.foo #bar').css('border', '1px solid blue');
  $('.foo #bar').text('new text!');
  $('.foo #bar').click(function() {
    $(this).attr('title', 'new title');
    $(this).width('100px');
  });
  
  $('.foo #bar').click();
});


// Carlos Avila
// click handler in a named function
// a class should be used but an ID is already unique so we use that
// reduce selector use compared to above
$(document).ready(function() {
  var clickHandler = function(el) {
    el.attr('title', 'new title')
      .width('100px');
  }

  , bar = $('#bar')
    .css({
      color: 'red'
      , border; '1px solid blue'
    })
    .text('new text!')
    .click(function(e) {
      clickHandler($(e.target));
    });

  clickHandler(bar);
});

// 7: What issues do you see with the following code? How would you fix it?
(function($) {
  var foo;

  $.ajax({
    url : 'http://valid.url'
  }).success(function (resp) {
    foo = resp.foo;
  });

  if (foo) {
    // run this important code
  }
})(jQuery);

// Carlos Avila
// need to wait for the XHR to complete
// AJAX call will occur asynch therefore we need to wait for the callback to set foo
(function($) {
  var foo;

  $.ajax({
    url: 'http://valid.url'
  }).success(function (resp) {
    if (resp && resp.foo) {
      // run this important code
    }
  })

})(jQuery);


// 8: how could you rewrite the following code to make it shorter?
(function($){
  $('li.foo a').attr('title', 'i am foo');
  $('li.bar a').attr('title', 'i am bar');
  $('li.baz a').attr('title', 'i am baz');
  $('li.bop a').attr('title', 'i am bop');
})(jQuery);

// Carlos Avila
// DRY the code with jQuery each
(function($) {
  $.each(['foo', 'bar', 'baz', 'bop'], function (thisClass) {
    $('li.' + thisClass +' a').attr('title', 'i am ' + thisClass);
  });
})(jQuery);



// 9: how would you improve the following code?
for (i = 0; i <= 100; i++) {
  $('#thinger').append('<p><span class="thinger">i am thinger ' + i + '</span></p>');
  $('#gizmo').append('<p><span class="gizmo">i am gizmo ' + i + '</span></p>');
}

// Carlos Avila
// problem: global variable i because not prefixed with var
// problem: we are appending and selecting 202 elements
var thingerToDOM = [];
var gizmoToDOM = [];
var templateHTML = '<p><span class="%s">i am %s %i</span></p>';
var templateFunc = function(str, i) {
  return templateHTML.replace(/%s/g, str).replace(/%i/g, i);
};

// push all appends to a single array
for (var i = 0, len = 100; i <= len; i++) {
  thingerToDOM.push(templateFunc('thinger', i));
  gizmoToDOM.push(templateFunc('gizmo', i));
} 

// eliminate excessive selections and appends by appending once
$('#thinger').append(thingerToDOM.join(''));
$('#gizmo').append(gizmoToDOM.join(''));

// 10: A user enters their desired tip into a text box; the baseTotal, tax,
// and fee values are provided by the application. what are some potential
// issues with the following function for calculating the total?
function calculateTotal(baseTotal, tip, tax, fee) {
  return baseTotal + tip + tax + fee;
}

// Carlos Avila
// potential issues with the following function are
// the tip is in a text box and thus coming to us as a string
// converting to integers may be necessary to avoid floating point arithmetic
function calculateTotal(baseTotal, tip, tax, fee) {
  // convert from string or in case of NaN use 0
  tip = parseFloat(tip) || 0;

  // no negative tips
  if (tip < 0)
    tip = 0;

  return baseTotal + tip + tax + fee;
};