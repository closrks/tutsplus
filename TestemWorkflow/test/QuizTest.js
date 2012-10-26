var should = chai.should();

describe('A Quiz', function() {
	it('should have a default score of 0', function() {
		var quiz = new Quiz;
		quiz.score.should.be.equal(0);
	});

	it('should have a title', function() {
		var quiz = new Quiz('test');
		quiz.title.should.be.truthy;
		;
	});
});