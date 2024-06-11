import { CLIENT_VERSION } from '../constants.js';
import { createItems } from '../models/item.model.js';
import { createStage } from '../models/stage.model.js';
import { getUser, removeUser } from '../models/user.model.js';
import handlerMappings from './handlerMapping.js';

export const handleDisconnect = (socket, uuid) => {
  removeUser(socket.id);
  console.log(`User disconnected: ${socket.id}`);
  console.log('Current users: ', getUser());
};

export const handleConnection = (socket, userUUID) => {
  console.log(`New user connected: ${userUUID} with socket ID ${socket.id}`);
  console.log('Current users:', getUser());

  // 스테이지 빈 배열 생성
  createStage(userUUID);
  createItems(userUUID);

  socket.emit('connection', { uuid: userUUID });
};

export const handleEvent = (io, socket, data) => {
  if (!CLIENT_VERSION.includes(data.clientVersion)) {
    socket.emit('response', { status: 'fail', message: 'Client version mismatch' });
    return;
  }

  const handler = handlerMappings[data.handlerId];
  if (!handler) {
    socket.emit('response', { status: 'fail', message: 'Handler not found' });
    return;
  }

  // 적절한 핸들러에 userID 와 payload를 전달하고 결과를 받습니다.
  const response = handler(data.userId, data.payload);
  // 만약 결과에 broadcast (모든 유저에게 전달)이 있다면 broadcast 합니다.
  if (response.broadcast) {
    io.emit('response', 'broadcast');
    return;
  }
  // 해당 유저에게 적절한 response를 전달합니다.
  socket.emit('response', response);
};
