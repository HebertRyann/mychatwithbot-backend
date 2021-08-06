import { v4 } from 'uuid';
import { serverIO, Socket } from '../http';
import { handleBot } from '../services/BotService';
import { handleTyping } from '../services/Typing';
import { ConnectionService } from '../services/ConnectionService';
import { FriendService } from '../services/FriendService';
import { MembersService } from '../services/MembersService';
import { NotificationService } from '../services/NotificationService';
import { GroupProps, MessageProps, SendRequest, TypingProps } from '../types';
import { modalConfetti } from '../constants';


export const usersTyping: TypingProps[] = [];


serverIO.on('connect',(socket: Socket) => {


  socket.on('clientCreateConnection', async (userName: string) => {
    console.log(userName)
    const connectionService = new ConnectionService();

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
    serverIO.emit('ServerResponseRefreshUsers');
    console.log('Connection created with success');
  });

  socket.on('ClientSendRequest', async ({ friendUserName, userName, message, groupName }: SendRequest) => {
    const connectionService = new ConnectionService();
    const friendService = new FriendService();
    const notificationService = new NotificationService();

    const findFriend = await connectionService.findByName(friendUserName);
    

    if(findFriend) {
      if(!groupName) {
        const createRequest = await friendService.sendRequest({ 
          userName, 
          friendUserName,
        });
        serverIO.to(findFriend.socket_id)
        .emit('ServerResponseSendRequest', { id: createRequest.id, sender: userName, userName: friendUserName })
        console.log('Send Request with success');
        return
      } else {
        const notification = await notificationService.create({ friendUserName, userName, groupName, message })
        serverIO.to(findFriend.socket_id)
        .emit('ServerResponseSendRequest', { id: notification.id, sender: userName, userName: friendUserName, groupName, message })
        
        return
      }
      
    }

    console.log('Send Request ERROR');

    
  }); 

  socket.on('ClientAcceptRequest', async (requestID: string) => {
    const friendService = new FriendService();

    await friendService.acceptFriend(requestID);
    serverIO.emit('ServerResponseRefreshFriends')
    
    console.log('Request is accepted');
  }); 

  socket.on('ClientRejectRequest', async (requestID: string) => {
    const friendService = new FriendService();

    await friendService.undoFriendship(requestID);
    serverIO.emit('ServerResponseRefreshFriends');
    console.log('Request is rejected');
  }); 

  socket.on('ClientJoinToRoom', async (room: string, userName: string) => {
    // FALTA MANDA AS MESSAGES
    const memberService = new MembersService()
    const connectionService = new ConnectionService();
    const getUser = await connectionService.findByName(room)
    const members = await memberService.getMembers(room)
    if(!getUser) {
      socket.join(room)
      serverIO.to(room).emit('ClientLoadAllData', 
      { 
        members
      })
    } else {
      socket.join(getUser.socket_id)
      serverIO.to(getUser.socket_id).emit('ClientLoadAllData', 
      { 
        friend_Name: getUser.userName, 
        userName, 
        privateRoom: getUser.userName
      })
    }    
  })
  
  socket.on('ClientAcceptToRoom', async (id: string, room: string, userName: string) => {
    const notificationService = new NotificationService()
    const memberService = new MembersService()    
    await memberService.createMembers(room, userName)
    await notificationService.removeNotifications(id)
    serverIO.emit('ServerResponseRefreshFriends')
  })

  socket.on('ClientRejectRoom',async (id: string) => {
    console.log(id)
    const notificationService = new NotificationService()

    await notificationService.removeNotifications(id)

    serverIO.emit('ServerResponseRefreshFriends');
  })

  socket.on('ClientSendMessage',async (message: MessageProps) => {
    const connectionService = new ConnectionService();
    const memebersService = new MembersService();
    const findFriend = await connectionService.findByName(message.from);
    const findMember = await memebersService.getMembers(message.from);
    const member = findMember.find(user => user.userName === message.userName);

    if(message.prefix) {
      console.log('msg para o ot')
      handleBot({ 
        ...message, 
        content: message.content.toLowerCase(), 
        isAdmin: member.admin
      });
      
    } else {
      console.log('msg para pessoa')
      if(!findFriend) {
        serverIO.to(message.from).emit('ServerReceivedMessage', message);
        console.log('Error, user not exist');
        return;
      }
      serverIO.to(findFriend.socket_id).emit('ServerReceivedMessage', message);
    }
  })

  socket.on('ClientCreateGroup',async ({ userName, room }: GroupProps) => {
    const notificationService = new NotificationService()
    const memberService = new MembersService()    
    await memberService.createMembers(room, userName, true);
    serverIO.emit('ServerResponseRefreshFriends')
  })

  socket.on('ClientSetIsTyping',async  ({ user, isTyping }: TypingProps) => {
    await handleTyping({ user, isTyping });
    serverIO.emit('ServerResponseIsTyping', usersTyping);
  });

  socket.on('ClientToggleModalConfetti', (isOpen) => {
    modalConfetti.isOpen = isOpen;
  });

});


