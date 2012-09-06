describe("Bowling game", function(){

	var g = null;

	beforeEach(function(){

		g = new Game();
	});

	function rollMany(rolls, pins) {

		for (var i = 0; i < rolls; i++) {
			g.roll(pins);
		};
	};

	function rollSpare() {

		g.roll(5);
		g.roll(5);
	};

	function rollStrike() {

		g.roll(10);
	};

	describe("Test gutter game", function(){
		
		it("should create a game w/ score = to 0 after 20 rolls", function(){
			rollMany(20, 0);
			expect(g.score()).toEqual(0);
		});
	});

	describe("Test all ones", function(){
		
		it("should create a game w/ score = to 20 after 20 rolls", function(){
			rollMany(20, 1);
			expect(g.score()).toEqual(20);
		});
	});

	describe("Test one spare", function(){
		
		it("should create a game w/ score = to 16 (1 spare) after 20 rolls", function(){
			rollSpare();
			g.roll(3);
			rollMany(17, 0);
			expect(g.score()).toEqual(16);
		});
	});

	describe("Test one strike", function(){
		
		it("should create a game w/ score = to 24 (1 strike) after 20 rolls", function(){
			rollStrike();
			g.roll(3);
			g.roll(4);
			rollMany(16, 0);
			expect(g.score()).toEqual(24);
		});
	});

	describe("Test perfect game", function(){
		
		it("should create a game w/ score = to 300 after 12 rolls", function(){
			rollMany(12, 10);
			expect(g.score()).toEqual(300);
		});
	});	
	
});
