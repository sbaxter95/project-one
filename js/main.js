$(function () {
//Game Logic

var robotWords = ['ai', 'interaction', 'automation', 'planning', 'nano', 'learning'];
var robotTypes = ['industrial', 'domestic', 'space', 'military', 'service', 'medical'];
var robotCharacters = ['hal', 'bender', 'robocop', 'data', 'optimus prime', 'r2d2'];

var badGuesses = 0;

var score = 0;

var difficulty = '';

var difficulty = '';
var category = '';

var timeRemaining = 0;

function game() {
	title();
	$('.game').addClass('show');
	letterEvents();
}

game();

var chosenWord;

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
    	$('.result-container').html('You lost ' + score);
    	$('.letter').off('click');
    }
}

function checkWinner() {
	if ($('.match').length === chosenWord.length) {
		score++;
		$('.result-container').html('You won! ' + score);
		$('.letter').off('click');
	}
}

function wrongLetter() {
	badGuesses++;
	drawHangman(badGuesses);
}

function getRandomWord(category) {
	var randomIndex = Math.floor(Math.random() * 6) + 1;
	var chosenWord = category[randomIndex].split('');
	return chosenWord;  
}

function letterEvents() {
	$('.letter').hover(function(){
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      var color = "rgb("+r+","+g+","+b+")"
      $(this).css("background-color", color);
  });

$('.letter').on('click', function (event) {
	var $this = $(this)
	$('p').unbind('mouseout');
	if (chosenWord.includes(($this).attr('id'))) {
		for (var i = 0; i < chosenWord.length; i++) {
			var content = $this.attr('id');
			if (content === chosenWord[i]) {
				$('.blank').eq(i).html(content);
				$('.blank').eq(i).addClass('match');
				$this.addClass('right-letter');
				$this.fadeOut(1000);
			}
		}
		checkWinner();
	} else {
		$(this).addClass('wrong-letter');
		$(this).fadeOut(1000);
		wrongLetter();
	}
});
}


$('#play-again').click(function (event){
	location.reload();
});

function timeRemainingr() {
	if (difficulty === 'easy') {
		//60 seconds
		timeRemainingRemaining = 60;
		var timeRemainingr = setInterval(countdown, 1000);
	} else if (difficulty === 'medium') {
		//30 seconds
		timeRemaining = 30;
		timeRemainingr = setInterval(countdown, 1000);
	} else {
		//15 seconds
		timeRemaining = 15;
		timeRemainingr = setInterval(countdown, 1000);
	}
}

function countdown() {
	if (timeRemaining === 0) {
		clearTimeout(timeRemainingr);
		$('.result-container').html('You lost ' + score);
    	$('.letter').off('click');
	} else {
		console.log(timeRemaining);
		$('.timeRemainingr').html(timeRemaining + 'seconds remaining');
		timeRemaining--;
	}
}

//Title Logic

//----------------------------------------------------------------------------------------------------
function selectDifficulty() {
	$('#header').html('Choose category');
	$('#easy').addClass('hide');
	$('#medium').addClass('hide');
	$('#hard').addClass('hide');
	$('#rw').removeClass('hide');
	$('#rt').removeClass('hide');
	$('#rc').removeClass('hide');
}

function chooseCategory() {
	$('#title').addClass('hide');
	$('#title').removeClass('show');
	$('.game').removeClass('hide');
	$('.game').addClass('show');
	$('#title').hide();
}

function title() {
	$('#easy').click(function (event){
	difficulty = 'easy';
	selectDifficulty();
	});

	$('#medium').click(function (event){
		difficulty = 'medium';
		selectDifficulty();
	});

	$('#hard').click(function (event){
		difficulty = 'hard';
		selectDifficulty();
	});

	$('#rw').click(function (event){
		chooseCategory();
		chosenWord = getRandomWord(robotWords);
		drawDashes(chosenWord);
	});

	$('#rt').click(function (event){
		chooseCategory();
		chosenWord = getRandomWord(robotTypes);
		drawDashes(chosenWord);
	});

	$('#rc').click(function (event){
		chooseCategory();
		chosenWord = getRandomWord(robotCharacters);
		drawDashes(chosenWord);
	});
}


});