//Number Guessing Game 
//ver: 1.0.0
//By: Taqwa Oumed

//IIFE ("Iffy"-Immediately Invoked Function Expression)
(function($){

    //Puts your script into strict mode
    //prevents you from declaring variables without a var keyword (const, let, var...)
   'use strict';

   //Game Variables

   //HTML Elements that we need to interact with
   //$ = represents a HTML element
   const $numInput = $('#num-input');
   const $btn = $('#btn');
   const $out = $('#out');

   //Game State Variables

   //Keep track -if game is over or not
   let isGameOver = false;

   //Keep track of the # of user guesses
   let numOfGuesses = 0;

   //Game parameter variables
   const min = 1;
   const max = 100;
   const ranNum = Math.floor(Math.random() * (max - min + 1)) + min;

   //Cheat code
   console.log(ranNum);

   //Game Event Listeners

   $btn.click(function(){
       runGame();
   });

   $(document).keypress(function(e){
       // e = the event object
       // .which -> outputs the keyboard key number
       // if e === 13 (Enter Key) -> run the game
       if(e.which === 13){
           runGame();
       }
    })

   //Game Functions

   //runGame 
   // - determines if the game is over 
   // - if it is ask the user to refresh the page
   function runGame(){
       if(isGameOver){
           $out.text('Game Over! Please refresh the page to play again.')
       }else{
           checkGuess();
       }
    }

   //checkGuess 
   // - check guess validity (separate function)
   // - determine if guess is high or low
   // - if guess is a match -> call the endGame() function
   function checkGuess(){
      //Each time the user enters a guess...
      //increase the guess counter by 1
        numOfGuesses ++;

      //Get the guess from the user 
        const guess = $numInput.val();

      //Determine if guess is valid
        const isValid = validateGuess(guess);

            if(isValid === 'blank'){
        $out.text('You did not enter a value. Please enter a number between 1 and 100.');

            return; 

            }else if(isValid === 'Not a number'){
        $out.text('Guess is not a valid number. Please enter a number between 1 and 100');
        
            return;

        }else if (isValid === 'Out of range'){
        $out.text('Guess is out of range. Please enter a number between 1 and 100.');

            return;
        }

      //At this stage the guess is valid
      //Determine if guess is high/low/correct
        if(guess > ranNum){
          $out.text('You guessed too high. Try again!');

          return;

        }else if (guess < ranNum){
         $out.text('You guessed too low. Try again!');

            return;

        }else {
          //They guessed correctly
          endGame(numOfGuesses)
        }

    }

    //Validate Guess Function 
    // - determine if guess is blank
    // - determine if value is a number
    // - determine if value is in range

    function validateGuess(value){
        if($.trim(value) === ''){
            return 'blank'
        }
    
        if(isNaN(value)){
            return 'Not a number';
        }

        if(value < min || value > max){
            return 'Out of range';
        }

        return true;
    }


    //endGame function
    // 1. change the state of the game to not running (false)
    // 2. output  "Game Over" message depending on how many guesses the user took
    function endGame(num){
        //1
        isGameOver = true;

        //2
        if(num === 1){
            $out.text('Amazing! You guessed right on the first try!');
        }else if(num < 6){
            $out.text(`Pretty good! It only took you ${num} tries to guess right!`);
        }else{
            $out.text(`Alright! It took you ${num} tries to guess right.`);
        }
    }


})(jQuery);
