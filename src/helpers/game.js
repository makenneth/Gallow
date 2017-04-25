const letterFrequencies = [
  'e', 't', 'a', 'o', 'i', 'n',
  's', 'h', 'r', 'd', 'l', 'c',
  'u', 'm', 'w', 'f', 'g', 'y',
  'p', 'b', 'v', 'k', 'j', 'x',
  'q', 'z'
];

function GameSolver() {}

GameSolver.knownAnswer = (usedLetters, correctGuesses) => {

  // first if usedLetters.length < 1, guess ByFrequency
  // if greater => then filter all the word and get the most frequent letter
  // if filtered.length === 1, then solve the game
}

GameSolver.generateGuess = ({ usedLetters, correctGuesses }) => {
  // const answer = correctGuesses.filter(g => g).length < 3 ?
  //   null :
  //   GameSolver.knownAnswer(usedLetters);
  return GameSolver.guessByFrequency(usedLetters);
}

GameSolver.guessByFrequency = (usedLetters) => {
  const unusedLetterIdx = letterFrequencies.findIndex(l => !usedLetters.find(u => u === l));
  return letterFrequencies[unusedLetterIdx];
}

export default GameSolver;
