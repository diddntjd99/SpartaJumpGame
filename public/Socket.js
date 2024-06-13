import { CLIENT_VERSION } from './Constants.js';
import { handleResponse } from './frontHandlers/frontHelper.js';

const socket = io('http://localhost:3000', {
  query: {
    clientVersion: CLIENT_VERSION,
    userId: 'admin1',
  },
});

let userId = null;
socket.on('response', (data) => {
  handleResponse(data);
});

socket.on('connection', (data) => {
  console.log('connection: ', data);
  userId = data.uuid;
});

const sendEvent = (handlerId, payload) => {
  socket.emit('event', {
    userId,
    clientVersion: CLIENT_VERSION,
    handlerId,
    payload,
  });
};

export { sendEvent };
