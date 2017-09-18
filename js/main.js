var robotWords = ['ai', 'interaction', 'automation', 'planning', 'nano', 'learning'];
var robotTypes = ['industrial', 'domestic', 'space', 'military', 'service', 'medical'];
var robotCharacters = ['hal', 'bender', 'robocop', 'data', 'optimus prime', 'r2d2'];

var badGuesses = 0;

var score = 0;

chosenWord = robotWords[2].split('');

drawDashes();

function drawDashes() {
	for (var i = 0; i < chosenWord.length; i++) {
		$('.word-container').append('<div class="blank"> _ </div>')
	}
}

function draw (wrongLetters) {
	if (wrongLetters === 1) {
	        $('#gallows-1').addClass('show');
    	}
    if (wrongLetters === 2) {
    	$('#gallows-2').addClass('show');
    } 
    if (wrongLetters === 3) {
    	$('#gallows-3').addClass('show');
    } 
    if (wrongLetters === 4) {
    	$('#head').addClass('show');
    }
    if (wrongLetters === 5) {
    	$('#torso').addClass('show');
    }
    if (wrongLetters === 6) {
    	$('#left-arm').addClass('show');
    }
    if (wrongLetters === 7) {
    	$('#right-arm').addClass('show');
    } if (wrongLetters === 8) {
    	$('#left-leg').addClass('show');
    } if (wrongLetters === 9) {
    	$('#right-leg').addClass('show');
    	$('.result-container').html('You lost');
    	$('result-container').html(score);
    }
}

function checkWinner() {
	if ($('.blank').html() === chosenWord) {
		$('.result-container').html('You won!');
		score++;
		$('result-container').html(score);
	}
}

function wrongLetter() {
	badGuesses++;
	draw(badGuesses);
}

$('p').one('click', function (event) {
	if (chosenWord.includes($(this).attr('id'))) {
		for (var i = 0; i < chosenWord.length; i++) {
			var content = $(this).attr('id');
			if (content === chosenWord[i]) {
				$('.blank').eq(i).html(content);
				$('.blank').eq(i).addClass('match');
			}
		}
		checkWinner();
	} else {
		wrongLetter();
	}
});