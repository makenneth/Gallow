export default function gameTemplate(id, word) {
  return {
    info: {
      id,
      finished: false,
      winner: null,
      userId1: 0,
      userId2: -1,
      username1: null,
      username2: 'Computer',
      nickname1: null,
      nickname2: 'Computer',
    },
    state: {
      word,
      correctGuesses: [],
      guess: '',
      solving: false,
      turn: 0,
      usedLetters: [],
      wrongGuesses1: 0,
      wrongGuesses2: 0,
    }
  };
}
