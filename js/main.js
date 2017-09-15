var planetsArray = ['tatooine', 'hoth', 'endor', 'alderaan', 'naboo', 'jakku'];

var chosenWord = planetsArray[0];

var dash = "";

for (var i = 0; i < chosenWord.length; i++) {
	if (chosenWord.charAt(i) === " ") {
		dash += " ";
	} else {
		dash += " _ ";
	}
}

$('.word-container').html(dash);