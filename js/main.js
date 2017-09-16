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
	var canvas = document.getElementById('stage'); 
	var ctx = canvas.getContext('2d');
	if (wrongLetters === 1) {
	        ctx.rect(20,20,150,100);
			ctx.stroke();
    	}
}

$('p').one('click', function (event) {
	clicks++;
	var chosenLetter = $(this).attr('id');
	console.log(chosenLetter);
	for (var i = 0; i < chosenWord.length; i++) {
	if (chosenLetter === chosenWord[i]) {
		isMatch = true;
		$(this).addClass('right-letter');
		$(this).fadeOut(1000);
		var position = i;
		dash[i] = chosenLetter;
		display();
	} else {
		isMatch  = false;
		badGuesses.push(chosenLetter);
		if (badGuesses.length === chosenWord.length) {
			wrongLetters++;
		}
		$(this).addClass('wrong-letter');
		$(this).fadeOut(1000);
		draw(wrongLetters);
	}
}

if ($('.word-container').html() === chosenWord) {
		$('.result-container').html('You won!');
}

// console.log(clicks);
if (clicks >= 10) {
	$('.result-container').html('You lost');
}

});