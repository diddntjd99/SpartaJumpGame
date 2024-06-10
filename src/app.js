import express from 'express';
import { createServer } from 'http';
import initSocket from './init/socket.js';
//import errorHandlerMiddleware from '../middlewares/error-handler.middleware.js';
//import 'dotenv/config';

const app = express();
const server = createServer(app);
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
initSocket(server);

//app.use('/api', []);
//app.use(errorHandlerMiddleware);

server.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
