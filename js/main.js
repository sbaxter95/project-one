var planetsArray = ['tatooine', 'hoth', 'endor', 'alderaan', 'naboo', 'jakku'];

var chosenWord = planetsArray[1];

var dash = "";

for (var i = 0; i < chosenWord.length; i++) {
	if (chosenWord.charAt(i) === " ") {
		dash += " ";
	} else {
		dash += " _ ";
	}
}

$('.word-container').html(dash);

$('p').click(function (event) {
	console.log($(this).attr('id'));
});