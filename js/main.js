var planetsArray = ['tatooine', 'hoth', 'endor', 'alderaan', 'naboo', 'jakku'];

var isMatch = false;

var chosenWord = planetsArray[4];

var dash = [];

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

$('p').one('click', function (event) {
	var chosenLetter = $(this).attr('id');
	console.log(chosenLetter);
	var remainingLetters = chosenWord.length;
	for (var i = 0; i < chosenWord.length; i++) {
	if (chosenLetter === chosenWord[i]) {
		isMatch = true;
		console.log(remainingLetters);
		var position = i;
		dash[i] = chosenLetter;
		display();
		if (remainingLetters === 0) {
		console.log('You won!');
	}
	} else {
		isMatch  = false;
		console.log('That letter is not in the word');
		//Hangman stuff
	}
}

	
});

