export const DATA_MODEL = {
  users: {
    userId: {
      name: "",
    },
  },
  likes: {
    userId_tweetId: {
      userId: "",
      tweetId: "",
    },
  },
  tweets: {
    tweetId: {
      title: "",
      description: "",
      userId: 0,
      count: 0,
    },
  },
};
// Por ahora solo nos sirve como referencia del modelo de datos que usa esta app
