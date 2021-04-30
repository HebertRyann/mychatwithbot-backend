import { http } from './http';
import './websocket/index';

http.listen(3333, () => {
  console.log("Server started o port 3333");
});