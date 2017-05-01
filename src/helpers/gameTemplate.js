export default function gameTemplate(id, word, user) {
  return {
    info: {
      id,
      isPractice: true,
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
      correctGuesses: Array.from(new Array(word.length), _ => ''),
      guess: '',
      solving: false,
      turn: [-1, user.id][Math.round(Math.random())],
      usedLetters: [],
      wrongGuesses1: 0,
      wrongGuesses2: 0,
    }
  };
}
