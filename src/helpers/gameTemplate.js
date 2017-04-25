export default function gameTemplate(id, word, user) {
  console.log(user);
  return {
    info: {
      id,
      finished: false,
      winner: null,
      userId1: user.id,
      userId2: -1,
      username1: user.username,
      username2: 'Computer',
      nickname1: user.nickname,
      nickname2: 'Computer',
    },
    state: {
      word,
      correctGuesses: [],
      guess: '',
      solving: false,
      turn: user.id,
      usedLetters: [],
      wrongGuesses1: 0,
      wrongGuesses2: 0,
    }
  };
}
