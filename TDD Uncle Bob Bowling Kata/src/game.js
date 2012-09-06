// private function
function Game(){

	// const
	var PINS_IN_FRAME = 10
		, NUMBER_OF_FRAMES = 10;

	// private
	var _rolls = []
		, _currentRoll = 0;

	var _isSpare = function(frameIndex) {

		return _rolls[frameIndex] + _rolls[frameIndex+1] === 10;
	};

	var _isStrike = function(frameIndex) {

		return _rolls[frameIndex] === 10;
	};

	var _spareBonus = function(frameIndex) {

		return _rolls[frameIndex+2];
	};

	var _strikeBonus = function(frameIndex) {

		return _rolls[frameIndex+1] + _rolls[frameIndex+2];
	};

	var _sumOfBallsInFrame = function(frameIndex) {

		return _rolls[frameIndex] + _rolls[frameIndex+1];
	};

	// public
	this.roll = function(pins) {

		_rolls[_currentRoll++] = pins;
	};

	this.score = function() {

		var score = 0
			, frameIndex = 0;

		for (var frame = 0; frame < NUMBER_OF_FRAMES; frame++) {

			if (_isStrike(frameIndex)) {
				score += PINS_IN_FRAME + _strikeBonus(frameIndex);
				frameIndex++;
			} 
			else if (_isSpare(frameIndex)) { 
				score += PINS_IN_FRAME + _spareBonus(frameIndex);
				frameIndex += 2;
			} 
			else {
				score += _sumOfBallsInFrame(frameIndex);
				frameIndex += 2;
			}
		}

		return score;
	};

};
