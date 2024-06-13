const userIds = [];
const users = [];
let highScore = { userId: null, score: 0 };

export const addUser = (user) => {
  users.push(user);
};

export const addUserId = (user) => {
  userIds.push(user);
};

export const removeUser = (socketId) => {
  const index = users.findIndex((user) => user.socketId === socketId);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

export const getUser = () => {
  return users;
};

export const getUserIds = () => {
  return userIds;
};

export const getHighScore = () => {
  return highScore;
};

export const setHighScore = (userId, score) => {
  highScore.userId = userId;
  highScore.score = score;
};
