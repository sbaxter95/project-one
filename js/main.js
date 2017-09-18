var planetsArray = ['tatooine', 'hoth', 'endor', 'alderaan', 'naboo', 'jakku'];

var isMatch = false;

var clicks = 0;

var chosenWord = planetsArray[3];

var dash = [];

var badGuesses = [];

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
	// switch (wrongLetters){
	// 	case 1:
	// 		$('#gallows-1').addClass('show');
	// 		break
	// 	case 2:
	// 		$('#gallows-2').addClass('show');
	// 		break;
	// 	case 3:
	// 		$('#gallows-3').addClass('show');
	// 		break;
	// 	case 4:
	// 		$('#head').addClass('show');
	// 		break;
	// }
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
}

$('p').one('click', function (event) {
	clicks++;
	var chosenLetter = $(this).attr('id');
	for (var i = 0; i < chosenWord.length; i++) {
		if (chosenLetter === chosenWord[i]) {
			isMatch = true;
			var goodGuess = true;
			console.log(isMatch);
			$(this).addClass('right-letter');
			$(this).fadeOut(1000);
			var position = i;
			dash[i] = chosenLetter;
			display();
		} else {
				isMatch = false;
			}
			// isMatch = false;
			// badGuesses.push(chosenLetter);
			// console.log(badGuesses);
			// if (badGuesses.length === chosenWord.length) {
			// 	wrongLetters++;
			// 	draw(wrongLetters);
			// 	console.log(wrongLetters);
			// }
			$(this).addClass('wrong-letter');
			$(this).fadeOut(1000);
}

if ($('.word-container').html() === chosenWord) {
		$('.result-container').html('You won!');
}

if (isMatch === false) {
	wrongLetters++;
	badGuesses.push(chosenLetter);
	badGuesses.toString();
	badGuesses = badGuesses.split(" ");
	console.log(badGuesses);
	draw(wrongLetters);
}

// console.log(clicks);
if (clicks >= 10) {
	$('.result-container').html('You lost');
}

});