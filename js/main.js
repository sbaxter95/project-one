var words = ['ai', 'interaction', 'automation', 'planning', 'nano', 'learning'];

var badGuesses = 0;

chosenWord = words[2].split('');
console.log(chosenWord);

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
    }
}

$('p').one('click', function (event) {
	if (chosenWord.includes($(this).attr('id'))) {
		for (var i = 0; i < chosenWord.length; i++) {
			// dash[i] = $(this).attr('id');
			var content = $(this).attr('id')
			$('.word-container').append('<div>' + content + '</div>') 

		}
	} else {
		badGuesses++;
		draw(badGuesses);
	}
});