var planetsArray = ['tatooine', 'hoth', 'endor', 'alderaan', 'naboo', 'jakku'];

var isMatch = false;

var clicks = 0;

var chosenWord = planetsArray[3];

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
	clicks++;
	var chosenLetter = $(this).attr('id');
	console.log(chosenLetter);
	for (var i = 0; i < chosenWord.length; i++) {
	if (chosenLetter === chosenWord[i]) {
		isMatch = true;
		var position = i;
		dash[i] = chosenLetter;
		display();
	} else {
		isMatch  = false;
		console.log('That letter is not in the word');
		// $('.used-letters').html(chosenLetter);
		//Hangman stuff
	}

}

if ($('.word-container').html() === chosenWord) {
		$('.result-container').html('You won!');

}	

console.log(clicks);
if (clicks >= 10) {
	$('.result-container').html('You lost');
}

});

