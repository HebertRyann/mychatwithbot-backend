import { hangman, modalConfetti, words } from '../constants';
import { serverIO } from '../http';
import { BotProps } from '../types';
import { MembersService } from './MembersService';
import { handleTyping } from './Typing';

export const Hangman = ({ content, from, userName }: BotProps) => {
  const { correctLetter, isStart, password, usersHeart } = hangman;

  function checkLetter(letter: string) {
    if(letter.length > 2) {
      if(password.join('') === letter) {
        console.log(letter, password)
        letter.split('').map(item => correctLetter.push(item));
        serverIO.emit('ServerResponseCorrectLetter', correctLetter);
      }
    }
    
    if (password.includes(letter)) {
      correctLetter.push(letter);
      serverIO.emit('ServerResponseCorrectLetter', correctLetter);
    } else {
      const findUserHeart = usersHeart.find(user => user.username === userName);
      if(findUserHeart) {
        usersHeart.map(user => 
          user.username === findUserHeart.username 
          ? { ...findUserHeart, heart: findUserHeart.heart.pop() } :
          user
        );
        serverIO.emit('ServerResponseSetUsersHeart', usersHeart);
      }
    }

    const checkPasswordForWin = password.every(letter => letter.length > 2 ? true : correctLetter.includes(letter))

    if(checkPasswordForWin) {
      console.log('win and open modal')
      hangman.isStart = false;
      serverIO.emit('ServeToggleModalConfetti');
      const timer = setInterval(() => {
        if(modalConfetti.isOpen) {
          clearInterval(timer);
          handleTyping({ user: 'marivalda', isTyping: true });
          setTimeout(() => {
            handleTyping({ user: 'marivalda', isTyping: false });
            serverIO.emit('ServerReceivedMessage', {
              userName: 'marivalda',
              content: `Uau !!!, para coisas como voces foram muito bem, 
              a palavra chave era ${password.join('').toUpperCase()}, 
              voces podem jogar novamente ou explorar outros jogos.`,
              from,
            });
          }, 2500);
        }
      }, 1000);
    };   
  };

  function setPasswordHangman(password: string) {
    const passwordSplited = password.split('');
    hangman.password = passwordSplited;
    serverIO.emit('ServerResponseSetPasswordHangman', passwordSplited);
  };
  
  async function setHeartsHangman() {
    const membersService = new MembersService();
    const users = await membersService.getMembers(from);
    const usersHeart = users.map((user) => user && 
    { username: user.userName, 
      heart: [
        `heart${user.userName}1`,
        `heart${user.userName}2`,
        `heart${user.userName}3`,
      ]
    });
    hangman.usersHeart = usersHeart;
    serverIO.emit('ServerResponseSetUsersHeart', usersHeart);
  };
  
  if(hangman.isStart && hangman.nextWordIsPassword && hangman.password.length <= 1) {
    setPasswordHangman(content);
    setHeartsHangman();
    return;
  };

  if(hangman.isStart && hangman.password.length > 1 && !content.includes('dica')) {
    checkLetter(content);
  };

  if(!hangman.isStart) {
    hangman.correctLetter = [];
    hangman.password = [];
    hangman.usersHeart = [];

    serverIO.emit('ServerResponseSetHangman', false);
    serverIO.emit('ServerResponseSetPasswordHangman', []);
    serverIO.emit('ServerResponseSetUsersHeart', []);
    serverIO.emit('ServerResponseCorrectLetter', []);
  };

  if(hangman.isStart && content.includes('sim')) {
    const randomInt = Math.floor(Math.random() * ( words.length - 1));
    hangman.currentWord = words[randomInt];
    hangman.isAutomatic = true;

    handleTyping({ user: 'marivalda', isTyping: true });

    setTimeout(() => {
      handleTyping({ user: 'marivalda', isTyping: false });
      serverIO.emit('ServerReceivedMessage', {
        userName: 'marivalda',
        content: `Certo, deixe-me pensar em algo`,
        from,
      });
      handleTyping({ user: 'marivalda', isTyping: true });
    }, 3000);

    setTimeout(() => {
      handleTyping({ user: 'marivalda', isTyping: false });
      serverIO.emit('ServerReceivedMessage', {
        userName: 'marivalda',
        content: `Ja pensei em algo, Dirviratm-se "humanos"`,
        from,
      });

      setPasswordHangman(hangman.currentWord.text);
      setHeartsHangman();
    }, 5000);
    return;
  }

  if(hangman.isStart && content.includes('não')) {
    hangman.nextWordIsPassword = true;
    handleTyping({ user: 'marivalda', isTyping: true });

    setTimeout(() => {
      handleTyping({ user: 'marivalda', isTyping: false });
      serverIO.emit('ServerReceivedMessage', {
        userName: 'marivalda',
        content: `Certo, pode digitar a palavra chave, sem problemas
        ninguém vera.`,
        from,
      });
    }, 3000);
    return;
  }

  if(hangman.isStart && content.includes('dica')) {
    handleTyping({ user: 'marivalda', isTyping: true });
    if(hangman.currentWord.tips) {
      setTimeout(() => {
        handleTyping({ user: 'marivalda', isTyping: false });
        serverIO.emit('ServerReceivedMessage', {
          userName: 'marivalda',
          content: `Hmmm o inevitavel hahaha.
          Enfim o que posso dizer é ${hangman.currentWord.tips[0]}`,
          from,
        });
      }, 3000);
    } else {

      setTimeout(() => {
        handleTyping({ user: 'marivalda', isTyping: false });
        serverIO.emit('ServerReceivedMessage', {
          userName: 'marivalda',
          content: `Não me disrespeito lhe dar dica, desative o cadeado
          para mandar mensagem normalmente, desativar é deixar ele vermelho
          nao sei se voce sabe`,
          from,
        });
      }, 3000);
    }
  }
};