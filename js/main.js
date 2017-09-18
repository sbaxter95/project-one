var robotWords = ['ai', 'interaction', 'automation', 'planning', 'nano', 'learning'];
var robotTypes = ['industrial', 'domestic', 'space', 'military', 'service', 'medical'];
var robotCharacters = ['hal', 'bender', 'robocop', 'data', 'optimus prime', 'r2d2'];

var badGuesses = 0;

var score = 0;

var chosenWord = getRandomWord();

drawDashes(chosenWord);

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
	drawHangman(badGuesses);
}

function getRandomWord() {
	var randomIndex = Math.floor(Math.random() * 6) + 1;
	var chosenWord = robotWords[randomIndex].split('');
	return chosenWord;  
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