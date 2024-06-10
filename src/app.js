import express from 'express';
import { createServer } from 'http';
import initSocket from './init/socket.js';
import { loadGameAssets } from './init/assets.js';
//import errorHandlerMiddleware from '../middlewares/error-handler.middleware.js';
//import 'dotenv/config';

const app = express();
const server = createServer(app);
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
initSocket(server);

//app.use('/api', []);
//app.use(errorHandlerMiddleware);

server.listen(PORT, async () => {
  console.log(PORT, '포트로 서버가 열렸어요!');

  try {
    const assets = await loadGameAssets();
    console.log(assets);
    console.log('Assets loaded successfully');
  } catch (error) {
    console.error('Failed to load game assets: ', error);
  }
});
