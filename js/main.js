$(function () {
//Game Logic

	//Arrays of words in the different categories
	var robotWords = ['ai', 'interaction', 'automation', 'planning', 'nano', 'learning'];
	var robotTypes = ['industrial', 'domestic', 'space', 'military', 'service', 'medical'];
	var robotCharacters = ['hal', 'bender', 'robocop', 'data', 'robbie', 'transformers'];

	var badGuesses = 0;

	var difficulty = '';
	var category = '';

	var position;

	var score;

	var timeRemaining = 0;

	var chosenWord;

	var $wordContainer = $('.word-container');
	var $resultContainer = $('.result-container');
	var $score = $('#score');
	var $letterButtons = $('.letter');
	var $timer = $('#timer');
	var $titleDiv = $('#title');
	var $gameDiv = $('.game');
	var $easyButton = $('#easy');
	var $mediumButton = $('#medium');
	var $hardButton = $('#hard');
	var $rwButton = $('#rw');
	var $rtButton = $('#rt');
	var $rcButton = $('#rc');

	//Function that runs the game
	function game() {
		title();
	}

	$($gameDiv).hide();
	game();

	//Draws dashes for each letter of the chosen word
	function drawDashes(chosenWord) {
		for (var i = 0; i < chosenWord.length; i++) {
			$($wordContainer).append('<div class="blank"> _ </div>')
		}
	}

	//Draws the hangman based on the number of incorrect letters chosen
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
	    } 
	    if (badGuesses === 8) {
	    	$('#left-leg').addClass('show');
	    } 
	    if (badGuesses === 9) {
	    	$('#right-leg').addClass('show');
	    	$($resultContainer).html('You lost');
	    	clearInterval(timerInterval);
	    	$($letterButtons).off('click');
	    	$(window).unbind('keydown');
	    	$($wordContainer).html(chosenWord);
	    	score = 0;
	    	displayScore();
	    }
	}

	//Checks to see if the player has chosen the correct letters and disables player input
	function checkWinner() {
		if ($('.match').length === chosenWord.length) {
			clearInterval(timerInterval);
			$($resultContainer).html('You won!');
			$($letterButtons).off('click');
			$(window).unbind('keydown');
			getScore();
			displayScore();
		}
	}

	//Bad guesses is incremented and the hangman is drawn
	function wrongLetter() {
		badGuesses++;
		drawHangman(badGuesses);
	}

	//Picks random word from selected category
	function getRandomWord(category) {
		var randomIndex = Math.floor(Math.random() * 6);
		chosenWord = category[randomIndex].split('');
		return chosenWord;  
	}

	//Logic when letter clicked on, and random hover colours 
	function letterEvents() {
		$($letterButtons).hover(function(){
	      var r = Math.floor(Math.random() * 255);
	      var g = Math.floor(Math.random() * 255);
	      var b = Math.floor(Math.random() * 255);
	      var color = "rgb("+r+","+g+","+b+")"
	      $(this).css("background-color", color);
	});

	$($letterButtons).on('click', function (event) {
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


	//Click listener for play again button
	$('#play-again').click(function (event){
		location.reload();
		getTimer();
	});

	//Sets the time the timer is counting down from based on difficulty
	function getTimer() {
		if (difficulty === 'easy') {
			//60 seconds
			timeRemaining = 60;
			timerInterval = setInterval(countdown, 1000);
		} else if (difficulty === 'medium') {
			//30 seconds
			timeRemaining = 30;
			timerInterval = setInterval(countdown, 1000);
		} else {
			//15 seconds
			timeRemaining = 15;
			timerInterval = setInterval(countdown, 1000);
		}
	}

	//Function that the timer executes every 1 second - counts down 
	function countdown() {
		if (timeRemaining === 0) {
			clearTimeout(timeRemaining);
			$($resultContainer).html('You lost');
	    	$($letterButtons).off('click');
	    	$($wordContainer).html(chosenWord);
	    	$(window).unbind('keydown');
	    	score = 0;
	    	displayScore();

		} else {
			$($timer).html(timeRemaining + ' seconds remaining');
			timeRemaining--;
		}
	}

	//Determines the score based on difficulty, time and word length
	function getScore() {
		if (difficulty === 'easy') {
			score = timeRemaining * chosenWord.length;
		} else if (difficulty === 'medium') {
			score = timeRemaining * chosenWord.length + 300;
		} else {
			score = timeRemaining * chosenWord.length + 500;
		}
		return score;
	} 

	//Displays the score on the page
	function displayScore() {
		$($score).html('Score: ' + score);
	}

	//Event listener for keyboard input
	$(window).on('keydown', function (event) {
		matchKeyInput(event.key);
		removeKey(event.key);
	});

	//Logic to check if key pressed matches the chosen word
	function matchKeyInput(letter) {
		var content = letter;
		if (chosenWord.includes(letter)) {
			for (var i = 0; i < chosenWord.length; i++) {
				if (content === chosenWord[i]) {
					$($('.blank')).eq(i).html(content);
					$($('.blank')).eq(i).addClass('match');
				}
			}
			checkWinner();
		} else {
			wrongLetter();
		}
	}

	//Removes corresponding button from the page when key is pressed
	function removeKey(letter) {
		var r = Math.floor(Math.random() * 255);
		var g = Math.floor(Math.random() * 255);
		var b = Math.floor(Math.random() * 255);
		var color = "rgb("+r+","+g+","+b+")"
		$(this).css("background-color", color);
		$('.letter-container').find('#' + letter).fadeOut(1000);
	}

	//Title Logic
	function selectDifficulty() {
		$('#header').html('Choose category');
		$($easyButton).hide();
		$($mediumButton).hide();
		$($hardButton).hide();
		$($rwButton).removeClass('hide');
		$($rtButton).removeClass('hide');
		$($rcButton).removeClass('hide');
	}

	function chooseCategory() {
		$($titleDiv).hide();
		$($titleDiv).removeClass('show');
		$($gameDiv).removeClass('hide');
		$($gameDiv).show();
		$($titleDiv).hide();
	}

	function title() {
		$($easyButton).click(function (event){
		difficulty = 'easy';
		selectDifficulty();
		getTimer();
		});

		$($mediumButton).click(function (event){
			difficulty = 'medium';
			selectDifficulty();
			getTimer();
		});

		$($hardButton).click(function (event){
			difficulty = 'hard';
			selectDifficulty();
			getTimer();
		});

		$($rwButton).click(function (event){
			chooseCategory();
			getRandomWord(robotWords);
			drawDashes(chosenWord);
			letterEvents();
		});

		$($rtButton).click(function (event){
			chooseCategory();
			getRandomWord(robotTypes);
			drawDashes(chosenWord);
			letterEvents();
		});

		$($rcButton).click(function (event){
			chooseCategory();
			getRandomWord(robotCharacters);
			drawDashes(chosenWord);
			letterEvents();
		});
	}
});