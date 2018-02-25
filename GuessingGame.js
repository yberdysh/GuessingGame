function generateWinningNumber(){
  return Math.floor(Math.random() * 100) + 1;
}

function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

function Game(){
  this.playersGuess = null;
  this.pastGuesses = [];
  this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function(){
  return Math.abs(this.winningNumber - this.playersGuess);
}

Game.prototype.isLower = function(){
  if (this.playersGuess < this.winningNumber){
    return true;
  } else {
    return false;
  }
}

Game.prototype.playersGuessSubmission = function(num){
  if (num >= 1 && num <= 100){
    this.playersGuess = num;
    //this.pastGuesses.push(num);
  } else {
    throw 'That is an invalid guess.';
  }
  return this.checkGuess();
}

Game.prototype.checkGuess = function(){
  var finalString = '';
  if (this.playersGuess === this.winningNumber){
    finalString = 'You Win!';
  }

  else {
    if (this.pastGuesses.includes(this.playersGuess)){
      finalString = 'You have already guessed that number.';
    }

    else {
      this.pastGuesses.push(this.playersGuess);
      if (this.pastGuesses.length === 5){
        finalString = 'You Lose.'
      }

      else {
        if (this.difference() < 10){
          finalString = 'You\'re burning up!';
        } else if (this.difference() < 25){
          finalString = 'You\'re lukewarm.';
        } else if (this.difference() < 50){
          finalString = 'You\'re a bit chilly.';
        } else {
          finalString = 'You\'re ice cold!';
        }
      }
    }
  }
  return finalString;
}

var newGame = function(){
  return new Game();
}

Game.prototype.provideHint = function(){
  var array = [];
  array.push(this.winningNumber, generateWinningNumber(), generateWinningNumber());
  return shuffle(array);
}
