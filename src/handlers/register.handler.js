import { addUser, addUserId, getHighScore, getUserIds } from '../models/user.model.js';
import { v4 as uuidv4 } from 'uuid';
import { handleConnection, handleDisconnect, handleEvent } from './helper.js';

const registerHandler = (io) => {
  io.on('connection', (socket) => {
    let userUUID;
    const userIds = getUserIds();
    const index = userIds.findIndex((user) => user.userId === socket.handshake.query.userId);
    if (index !== -1) {
      // user id의 유저가 처음 접속하는게 아닐 때
      userUUID = userIds[index].uuid;
    } else {
      // user id의 유저가 처음 접속할 때
      userUUID = uuidv4();
    }

    const highScore = getHighScore();
    if (highScore.userId === userUUID) {
      console.log('connect high score player: ' + socket.handshake.query.userId);
      socket.emit('response', {
        message: '최고 점수 기록 ' + socket.handshake.query.userId + '님 안녕하세요',
        handlerId: 1,
      });
    }

    addUserId({ userId: socket.handshake.query.userId, uuid: userUUID });
    addUser({ uuid: userUUID, socketId: socket.id });

    handleConnection(socket, userUUID);

    socket.on('event', (data) => {
      handleEvent(io, socket, data);
    });

    // 접속 해제 시 이벤트
    socket.on('disconnect', () => {
      handleDisconnect(socket, userUUID);
    });
  });
};

export default registerHandler;
