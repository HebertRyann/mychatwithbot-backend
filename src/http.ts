import express from 'express';
import cors from 'cors';
import { 
  createServer 
} from 'http';
import {
  Server,
  Socket,
} from 'socket.io';
import routes from './routes';
import './database';

let socketId: string;

const app = express();
const http = createServer(app);
const serverIO = new Server(http, {
  cors: {
    origin: '*',
  }
});
app.use(cors())
app.use(express.json());
app.use(routes)

// serverIO.on('connect', (socket) => {
//   console.log(socket.id)
//   socketId = socket.id
// })



export { http, serverIO, Socket };