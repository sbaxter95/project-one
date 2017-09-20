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

var $button;

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
    	$(window).unbind('keydown');
    }
}

function checkWinner() {
	if ($('.match').length === chosenWord.length) {
		clearInterval(timerInterval);
		$('.result-container').html('You won!');
		$('.letter').off('click');
		$(window).unbind('keydown');
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
		keyHighlight('b');
	} else if (event.keyCode === 67) {
		getKeyInput('c');
		keyHighlight('c');
	} else if (event.keyCode === 68) {
		getKeyInput('d');
		keyHighlight('d');
	} else if (event.keyCode === 69) {
		getKeyInput('e');
		keyHighlight('e');
	} else if (event.keyCode === 70) {
		getKeyInput('f');
		keyHighlight('f');
	} else if (event.keyCode === 71) {
		getKeyInput('g');
		keyHighlight('g');
	} else if (event.keyCode === 72) {
		getKeyInput('h');
		keyHighlight('h');
	} else if (event.keyCode === 73) {
		getKeyInput('i');
		keyHighlight('i');
	} else if (event.keyCode === 74) {
		getKeyInput('j');
		keyHighlight('j');
	} else if (event.keyCode === 75) {
		getKeyInput('k');
		keyHighlight('k');
	} else if (event.keyCode === 76) {
		getKeyInput('l');
		keyHighlight('l');
	} else if (event.keyCode === 77) {
		getKeyInput('m');
		keyHighlight('m');
	} else if (event.keyCode === 78) {
		getKeyInput('n');
		keyHighlight('n');
	} else if (event.keyCode === 79) {
		getKeyInput('o');
		keyHighlight('o');
	} else if (event.keyCode === 80) {
		getKeyInput('p');
		keyHighlight('p');
	} else if (event.keyCode === 81) {
		getKeyInput('q');
		keyHighlight('q');
	} else if (event.keyCode === 82) {
		getKeyInput('r');
		keyHighlight('r');
	} else if (event.keyCode === 83) {
		getKeyInput('s');
		keyHighlight('s');
	} else if (event.keyCode === 84) {
		getKeyInput('t');
		keyHighlight('t');
	} else if (event.keyCode === 85) {
		getKeyInput('u');
		keyHighlight('u');
	} else if (event.keyCode === 86) {
		getKeyInput('v');
		keyHighlight('v');
	} else if (event.keyCode === 87) {
		getKeyInput('w');
		keyHighlight('w');
	} else if (event.keyCode === 88) {
		getKeyInput('x');
		keyHighlight('x');
	} else if (event.keyCode === 89) {
		getKeyInput('y');
		keyHighlight('y');
	} else if (event.keyCode === 90) {
		getKeyInput('z');
		keyHighlight('z');
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
		wrongLetter();
	}
}

function keyHighlight(letter) {
	if (letter === 'a') {
		$button = $('.letter-container').find('#a');
		$button.fadeOut(1000);
	} else if (letter === 'b') {
		$button = $('.letter-container').find('#b');
		$button.fadeOut(1000);
	} else if (letter === 'c') {
		$button = $('.letter-container').find('#c');
		$button.fadeOut(1000);
	} else if (letter === 'd') {
		$button = $('.letter-container').find('#d');
		$button.fadeOut(1000);
	} else if (letter === 'e') {
		$button = $('.letter-container').find('#e');
		$button.fadeOut(1000);
	} else if (letter === 'f') {
		$button = $('.letter-container').find('#f');
		$button.fadeOut(1000);
	} else if (letter === 'g') {
		$button = $('.letter-container').find('#g');
		$button.fadeOut(1000);
	} else if (letter === 'h') {
		$button = $('.letter-container').find('#h');
		$button.fadeOut(1000);
	} else if (letter === 'i') {
		$button = $('.letter-container').find('#i');
		$button.fadeOut(1000);
	} else if (letter === 'j') {
		$button = $('.letter-container').find('#j');
		$button.fadeOut(1000);
	} else if (letter === 'k') {
		$button = $('.letter-container').find('#k');
		$button.fadeOut(1000);
	} else if (letter === 'l') {
		$button = $('.letter-container').find('#l');
		$button.fadeOut(1000);
	} else if (letter === 'm') {
		$button = $('.letter-container').find('#m');
		$button.fadeOut(1000);
	} else if (letter === 'n') {
		$button = $('.letter-container').find('#n');
		$button.fadeOut(1000);
	} else if (letter === 'o') {
		$button = $('.letter-container').find('#o');
		$button.fadeOut(1000);
	} else if (letter === 'p') {
		$button = $('.letter-container').find('#p');
		$button.fadeOut(1000);
	} else if (letter === 'q') {
		$button = $('.letter-container').find('#q');
		$button.fadeOut(1000);
	} else if (letter === 'r') {
		$button = $('.letter-container').find('#r');
		$button.fadeOut(1000);
	} else if (letter === 's') {
		$button = $('.letter-container').find('#s');
		$button.fadeOut(1000);
	} else if (letter === 't') {
		$button = $('.letter-container').find('#t');
		$button.fadeOut(1000);
	} else if (letter === 'u') {
		$button = $('.letter-container').find('#u');
		$button.fadeOut(1000);
	} else if (letter === 'v') {
		$button = $('.letter-container').find('#v');
		$button.fadeOut(1000);
	} else if (letter === 'w') {
		$button = $('.letter-container').find('#w');
		$button.fadeOut(1000);
	} else if (letter === 'x') {
		$button = $('.letter-container').find('#x');
		$button.fadeOut(1000);
	} else if (letter === 'y') {
		$button = $('.letter-container').find('#y');
		$button.fadeOut(1000);
	} else if (letter === 'z') {
		$button = $('.letter-container').find('#z');
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