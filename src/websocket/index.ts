import { serverIO, Socket } from '../http';
import { ConnectionService } from '../services/ConnectionService';


serverIO.on('connect',(socket: Socket) => {
  console.log('new sockert connected: ', socket.id)
  const connectionService = new ConnectionService();

  socket.on('clientCreateConnection', async (userName) => {
    const findUser = await connectionService.findByName(userName);

    if(!findUser) {
      await connectionService.create({
        userName,
        socket_id: socket.id
      })
    } else {
      findUser.socket_id = socket.id;
  
      await connectionService.create(findUser);
    }
    console.log('Connection created with success');
  });

  
});


