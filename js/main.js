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
	var highscore = localStorage.getItem("highscore");

	var timeRemaining = 0;

	var chosenWord;

	//Function that runs the game
	function game() {
		title();
		letterEvents();
	}

	$('.game').hide();
	game();

	//Draws dashes for each letter of the chosen word
	function drawDashes(chosenWord) {
		for (var i = 0; i < chosenWord.length; i++) {
			$('.word-container').append('<div class="blank"> _ </div>')
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
	    	$('.result-container').html('You lost');
	    	clearInterval(timerInterval);
	    	$('.letter').off('click');
	    	$(window).unbind('keydown');
	    	$('.word-container').html(chosenWord);
	    	score = 0;
	    	displayScore();
	    }
	}

	//Checks to see if the player has chosen the correct letters and disables player input
	function checkWinner() {
		if ($('.match').length === chosenWord.length) {
			clearInterval(timerInterval);
			$('.result-container').html('You won!');
			$('.letter').off('click');
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
			$('.result-container').html('You lost');
	    	$('.letter').off('click');
	    	$('.word-container').html(chosenWord);
	    	$(window).unbind('keydown');
	    	score = 0;
	    	displayScore();

		} else {
			$('#timer').html(timeRemaining + ' seconds remaining');
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
		$('#score').html('Score: ' + score);
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
					$('.blank').eq(i).html(content);
					$('.blank').eq(i).addClass('match');
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

	//Local storage storing the highscore
	function highscore() {
		if(highscore !== null){
		    if (score > highscore) {
		        localStorage.setItem("highscore", score);      
		    }
		}
		else{
		    localStorage.setItem("highscore", score);
		}
		console.log(localStorage.highscore);
	}

	//Title Logic
	function selectDifficulty() {
		$('#header').html('Choose category');
		$('#easy').hide();
		$('#medium').hide();
		$('#hard').hide();
		$('#rw').removeClass('hide');
		$('#rt').removeClass('hide');
		$('#rc').removeClass('hide');
	}

	function chooseCategory() {
		$('#title').hide();
		$('#title').removeClass('show');
		$('.game').removeClass('hide');
		$('.game').show();
		$('#title').hide();
	}

	function title() {
		$('#easy').click(function (event){
		difficulty = 'easy';
		selectDifficulty();
		getTimer();
		});

		$('#medium').click(function (event){
			difficulty = 'medium';
			selectDifficulty();
			getTimer();
		});

		$('#hard').click(function (event){
			difficulty = 'hard';
			selectDifficulty();
			getTimer();
		});

		$('#rw').click(function (event){
			chooseCategory();
			getRandomWord(robotWords);
			drawDashes(chosenWord);
		});

		$('#rt').click(function (event){
			chooseCategory();
			getRandomWord(robotTypes);
			drawDashes(chosenWord);
		});

		$('#rc').click(function (event){
			chooseCategory();
			getRandomWord(robotCharacters);
			drawDashes(chosenWord);
		});
	}
});