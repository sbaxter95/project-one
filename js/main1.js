var wordsArray = ['ai', 'interaction', 'automation', 'planning', 'nano', 'learning'];

var isMatch = false;

var clicks = 0;

var chosenWord = wordsArray[2];

var dash = [];

var badGuesses = [];

var goodGuesses = 0;

var wrongLetters = 0;

for (var i = 0; i < chosenWord.length; i++) {
	if (chosenWord.charAt(i) === " ") {
		dash.push (" ");
	} else {
		dash.push(" _ ");
	}
}

display();

function display () {
	$('.word-container').html(dash);
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
    }
}

$('p').one('click', function (event) {
	var chosenLetter = $(this).attr('id');
	for (var i = 0; i < chosenWord.length; i++) {
		if (chosenLetter === chosenWord[i]) {
			$(this).addClass('right-letter');
			$(this).fadeOut(1000);
			dash[i] = chosenLetter;
			console.log(dash);
			isMatch = true;
			$('#isMatched').addClass('matched');
			// return
		} else {
				isMatch = false;
				display();
				$('#isMatched').addClass('not-matched');
			}

			$(this).addClass('wrong-letter');
			$(this).fadeOut(1000);
	}

	if ($('.word-container').html() === chosenWord) {
		$('.result-container').html('You won!');
	}

	if ($('#isMatched').not('.matched')) {
		wrongLetters++;
		badGuesses.push(chosenLetter);
		badGuesses.toString();
		draw(badGuesses.length);
	}
});