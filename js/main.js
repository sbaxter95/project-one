$(function () {
//Game Logic

var robotWords = ['ai', 'interaction', 'automation', 'planning', 'nano', 'learning'];
var robotTypes = ['industrial', 'domestic', 'space', 'military', 'service', 'medical'];
var robotCharacters = ['hal', 'bender', 'robocop', 'data', 'optimus prime', 'r2d2'];

var badGuesses = 0;

var difficulty = '';

var difficulty = '';
var category = '';

var position;

var timeRemaining = 0;

function game() {
	title();
	letterEvents();
}

$('.game').hide();
game();

var chosenWord;

function drawDashes(chosenWord) {
	for (var i = 0; i < chosenWord.length; i++) {
		$('.word-container').append('<div class="blank"> _ </div>')
	}
}

function drawHangman (badGuesses) {
	if (badGuesses === 1) {
	        $('#gallows-1').addClass('show');
    	}
    if (badGuesses === 2) {
    	$('#gallows-2').addClass('show');
    } 
    if (badGuesses === 3) {
    	$('#gallows-3').addClass('show');
    } 
    if (badGuesses === 4) {
    	$('#head').addClass('show');
    }
    if (badGuesses === 5) {
    	$('#torso').addClass('show');
    }
    if (badGuesses === 6) {
    	$('#left-arm').addClass('show');
    }
    if (badGuesses === 7) {
    	$('#right-arm').addClass('show');
    } if (badGuesses === 8) {
    	$('#left-leg').addClass('show');
    } if (badGuesses === 9) {
    	$('#right-leg').addClass('show');
    	$('.result-container').html('You lost');
    	clearInterval(timerInterval);
    	$('.letter').off('click');
    }
}

function checkWinner() {
	if ($('.match').length === chosenWord.length) {
		clearInterval(timerInterval);
		$('.result-container').html('You won!');
		$('.letter').off('click');
	}
}

function wrongLetter() {
	badGuesses++;
	drawHangman(badGuesses);
}

function getRandomWord(category) {
	var randomIndex = Math.floor(Math.random() * 6);
	chosenWord = category[randomIndex].split('');
	return chosenWord;  
}

function letterEvents() {
	$('.letter').hover(function(){
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      var color = "rgb("+r+","+g+","+b+")"
      $(this).css("background-color", color);
  });

$('.letter').on('click', function (event) {
	var $this = $(this)
	$('p').unbind('mouseout');
	if (chosenWord.includes(($this).attr('id'))) {
		for (var i = 0; i < chosenWord.length; i++) {
			var content = $this.attr('id');
			if (content === chosenWord[i]) {
				$('.blank').eq(i).html(content);
				$('.blank').eq(i).addClass('match');
				$this.addClass('right-letter');
				$this.fadeOut(1000);
			}
		}
		checkWinner();
	} else {
		$(this).addClass('wrong-letter');
		$(this).fadeOut(1000);
		wrongLetter();
	}

});
}


$('#play-again').click(function (event){
	location.reload();
	getTimer();
});

function getTimer() {
	if (difficulty === 'easy') {
		//60 seconds
		timeRemaining = 60;
		timerInterval = setInterval(countdown, 1000);
	} else if (difficulty === 'medium') {
		//30 seconds
		timeRemaining = 30;
		timerInterval = setInterval(countdown, 1000);
	} else {
		//15 seconds
		timeRemaining = 15;
		timerInterval = setInterval(countdown, 1000);
	}
}

function countdown() {
	if (timeRemaining === 0) {
		clearTimeout(timeRemaining);
		$('.result-container').html('You lost');
    	$('.letter').off('click');
	} else {
		$('#timer').html(timeRemaining + ' seconds remaining');
		timeRemaining--;
	}
}

$(window).on('keydown', function (event) {
	if (event.keyCode === 65) {
		getKeyInput('a');
		keyHighlight('a');
	} else if (event.keyCode === 66) {
		getKeyInput('b');
	} else if (event.keyCode === 67) {
		getKeyInput('c');
	} else if (event.keyCode === 68) {
		getKeyInput('d');
	} else if (event.keyCode === 69) {
		getKeyInput('e');
	} else if (event.keyCode === 70) {
		getKeyInput('f');
	} else if (event.keyCode === 71) {
		getKeyInput('g');
	} else if (event.keyCode === 72) {
		getKeyInput('h');
	} else if (event.keyCode === 73) {
		getKeyInput('i');
	} else if (event.keyCode === 74) {
		getKeyInput('j');
	} else if (event.keyCode === 75) {
		getKeyInput('k');
	} else if (event.keyCode === 76) {
		getKeyInput('l');
	} else if (event.keyCode === 77) {
		getKeyInput('m');
	} else if (event.keyCode === 78) {
		getKeyInput('n');
	} else if (event.keyCode === 79) {
		getKeyInput('o');
	} else if (event.keyCode === 80) {
		getKeyInput('p');
	} else if (event.keyCode === 81) {
		getKeyInput('q');
	} else if (event.keyCode === 82) {
		getKeyInput('r');
	} else if (event.keyCode === 83) {
		getKeyInput('s');
	} else if (event.keyCode === 84) {
		getKeyInput('t');
	} else if (event.keyCode === 85) {
		getKeyInput('u');
	} else if (event.keyCode === 86) {
		getKeyInput('v');
	} else if (event.keyCode === 87) {
		getKeyInput('w');
	} else if (event.keyCode === 88) {
		getKeyInput('x');
	} else if (event.keyCode === 89) {
		getKeyInput('y');
	} else if (event.keyCode === 90) {
		getKeyInput('z');
	}
});

function getKeyInput(letter) {
	var content = letter;
	if (chosenWord.includes(letter)) {
		for (var i = 0; i < chosenWord.length; i++) {
			if (content === chosenWord[i]) {
				$('.blank').eq(i).html(content);
				$('.blank').eq(i).addClass('match');
			}
		}
		checkWinner();
	} else {
		// if ($('.letter').attr('id') === letter) {
		// 	$(this).addClass('right-letter');
		//  	$(this).fadeOut(1000);
		// }
		wrongLetter();
	}
}

function keyHighlight(letter) {
	if (letter === 'a') {
		var $button = $('.letter-container').find('#a');
		$button.fadeOut(1000);
	}
}

//Title Logic

function selectDifficulty() {
	$('#header').html('Choose category');
	$('#easy').hide();
	$('#medium').hide();
	$('#hard').hide();
	$('#rw').removeClass('hide');
	$('#rt').removeClass('hide');
	$('#rc').removeClass('hide');
}

function chooseCategory() {
	$('#title').hide();
	$('#title').removeClass('show');
	$('.game').removeClass('hide');
	$('.game').show();
	$('#title').hide();
}

function title() {
	$('#easy').click(function (event){
	difficulty = 'easy';
	selectDifficulty();
	getTimer();
	});

	$('#medium').click(function (event){
		difficulty = 'medium';
		selectDifficulty();
		getTimer();
	});

	$('#hard').click(function (event){
		difficulty = 'hard';
		selectDifficulty();
		getTimer();
	});

	$('#rw').click(function (event){
		chooseCategory();
		getRandomWord(robotWords);
		drawDashes(chosenWord);
	});

	$('#rt').click(function (event){
		chooseCategory();
		getRandomWord(robotTypes);
		drawDashes(chosenWord);
	});

	$('#rc').click(function (event){
		chooseCategory();
		getRandomWord(robotCharacters);
		drawDashes(chosenWord);
	});
}


});