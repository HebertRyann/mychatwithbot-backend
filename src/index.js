"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _timers = require("timers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();

const server = require('http').createServer(app);

app.use(cors());


const io = require("socket.io")(server, {
  cors: {
    origin: "https://determined-williams-1f094a.netlify.app/",
    methods: ["GET", "POST"]
  }
});

let users = [];
let usersPlay = [];
let divinationsEmojis = [{
  emojiCategorie: 'filme',
  emojis: [{
    question: ['👨🏻💭👉🏻🕛🕝🕣', '😭🌹🌹', '😭📞🙏🏻💋❤', '☝🏻😴💭👩🏻', '💃🏻💃🏻🐅👉🏻📚', '😀👆🏻👉🏻🎥😀♥🎞', '👉🏻🍺🌊🍹', '🌊🌊🌊👀🌊', '👎🏻🚗👎🏻🏡'],
    answer: [`o cara que pensa em você toda hora`, `choram as rosas`, `chora me liga implora pelo meu amor`, `eu dormir na praça pensado nela`, `quer dançar o tigrao vai te ensinar`, `sorria que estou te filmando`, `por você eu bebo mar de canudinho`, `olha a onda`, `não tenho carro não nao tenho teto`]
  }]
}, {
  emojiCategorie: 'serie',
  emojis: [{
    question: ['1-👨🏻💭👉🏻🕛🕝🕣', '2-😭🌹🌹', '3-😭📞🙏🏻💋2️⃣❎', '4-☝🏻😴💭👩🏻', '5-💃🏻💃🏻🐅👉🏻📚', '6-😀👆🏻👉🏻🎥😀♥🎞', '7-👉🏻🍺🌊🍹', '8-🌊🌊🌊👀🌊', '9-👎🏻🚗👎🏻🏡'],
    answer: [`o cara que pensa em você toda hora`, `choram as rosas`, `chora me liga implora pelo meu amor`, `eu dormir na praça pensado nela`, `quer dançar que o tigrao vai te ensinar`, `sorria que estou te filmando`, `por voce você eu bebo o mar de canudinho`, `olha a onda`, `nao não tenho carro não nao tenho teto`]
  }]
}, {
  emojiCategorie: 'musica',
  emojis: [{
    question: ['1-👨🏻💭👉🏻🕛🕝🕣', '2-😭🌹🌹', '3-😭📞🙏🏻💋2️⃣❎', '4-☝🏻😴💭👩🏻', '5-💃🏻💃🏻🐅👉🏻📚', '6-😀👆🏻👉🏻🎥😀♥🎞', '7-👉🏻🍺🌊🍹', '8-🌊🌊🌊👀🌊', '9-👎🏻🚗👎🏻🏡'],
    answer: [`o cara que pensa em você toda hora`, `choram as rosas`, `chora me liga implora pelo meu amor`, `eu dormir na praça pensado nela`, `quer dançar que o tigrao vai te ensinar`, `sorria que estou te filmando`, `por voce você eu bebo o mar de canudinho`, `olha a onda`, `nao não tenho carro não nao tenho teto`]
  }]
}];
const userTyping = [];
let totalHearts = 0;
let numberOfQuestions = ['6', '8', '10', '12'];
let currentThemeIndex = [];
let currentTheme;
let currentQuestion;
let currentThemeSelected;
let findThemes;
const correctLetter = [''];
let videoId = '';
let passwordComplete = [];
let passwordHang = [''];
let wrongLetter = [''];
let activeGameForca = false;
let allUsersComplete = false;
let isEndingGameHangman = false;
let activeGameAnswerAndQuest = false;
let activeGameEmojis = false;
let openModalEndGame = true;
let isEndingGameEmojis = false;
let isEndingGameQuest = false;
let colors = ['#FF0000', '#00ff87', '#BF00FF', '#0061ff', '#ff1b6b', '#75DBCD', '#F95738', '#FFF', '#DF99F0', '#E3B505'];
let answerCorrects = 0;
let numberPerQuestio = 0;
let numbersOfThemes = 0;
let findNumberOfQuest;
let answerEmojisLenght = 1;
let questios = [];
let coutQuestio = 0;
const themes = [{
  themeName: 'historia',
  quests: [{
    question: 'De que pais é a invenção do chuveiro elétrico?',
    tips: [''],
    answer: 'brasil',
    difficulty: 'easy'
  }, {
    question: 'Qual o nome do presidente do Brasil que ficou conhecido como Jango?',
    tips: [''],
    answer: 'joao goulart',
    difficulty: 'medium'
  }, {
    question: 'Quais as duas datas que são comemoradas em novembro?',
    tips: [''],
    answer: `
        Proclamação da República 
        Dia Nacional da Consciência Negra
        proclamaçao da república
        dia nacional da consiêcia negra
        republica consiecia negra
        república consiêcia negra  
        `,
    difficulty: 'hard'
  }]
}, {
  themeName: 'biologia',
  quests: [{
    question: 'Normalmente, quantos litros de sangue uma pessoa tem? Em média, quantos são retirados numa doação de sangue?',
    tips: [''],
    answer: '5 litros',
    difficulty: 'easy'
  }, {
    question: 'O cavalo-marinho é um mamífero?',
    tips: [''],
    answer: 'não',
    difficulty: 'medium'
  }, {
    question: 'Qual a planta que armazena água em seus caules e consegue sobreviver em solos arenosos?',
    tips: [''],
    answer: 'cacto',
    difficulty: 'hard'
  }]
}];

async function checkSetIsTypingUser({
  name,
  isTyping
}) {
  const findUser = userTyping.find(user => user.name === name);
  const findUserIndex = userTyping.findIndex(user => user.name === name);

  if (findUser && findUser.isTyping !== isTyping) {
    userTyping[findUserIndex].isTyping = isTyping;
  }

  if (!findUser) {
    userTyping.push({
      name,
      isTyping
    });
  }

  ;
  io.emit('userIsTyping', userTyping);
}

async function createUser({
  id,
  name,
  isTyping,
  answerCorrect,
  heart
}) {
  if (name === 'Admin') {
    return users;
  }

  const color = colors[Math.floor(Math.random() * 10)];
  const findUser = users.find(user => user.name === name);
  const findColor = users.find(user => user.color === color);
  console.log(color);

  if (!findUser && !findColor) {
    users.push({
      id,
      name,
      color,
      isTyping,
      answerCorrect,
      heart
    });
    const updatedColors = colors.filter(colorItem => colorItem !== color);
    colors = updatedColors;
  }

  ;

  if (findColor) {
    return new Error('user not Created');
  }

  return users;
}

async function getRandom() {
  console.log('getRadom');
  const randomIndex = Math.floor(Math.random() * 3);
  const randomIndexTheme = currentThemeIndex.find(indexTheme => indexTheme === randomIndex);
  console.log(randomIndex, '<- randomIndex', randomIndexTheme, '<- randomIndexTheme', coutQuestio, '<- cout questoes');

  if (questios.length !== numberPerQuestio * numbersOfThemes && randomIndexTheme === undefined) {
    if (coutQuestio !== numberPerQuestio) {
      questios.push(findThemes[0].quests[randomIndex]);
      coutQuestio = coutQuestio + 1;
      currentThemeIndex.push(randomIndex);
    }

    getRandom();
  } else if (questios.length === numberPerQuestio * numbersOfThemes) {
    console.log('getRadom fiished', questios);
    currentThemeIndex = [];
    coutQuestio = 0;
    getRandomQuestio(findNumberOfQuest);
    return;
  } else if (coutQuestio === numberPerQuestio) {
    console.log('chegou ao total por questoes');
    coutQuestio = 0;
    findThemes = findThemes.filter(theme => theme.themeName !== findThemes[0].themeName);
    currentThemeIndex = [];
    getRandom();
  } else if (randomIndexTheme !== undefined) {
    getRandom();
  }
}

async function incrementAnswerCorrects(answer, name) {
  const findUser = users.find(user => user.name === name);
  const findUserIndex = users.findIndex(user => user.name === name);

  if (findUser && answer) {
    const updatedUser = findUser.answerCorrect + 1;
    users[findUserIndex].answerCorrect = updatedUser;
    answerCorrects = answerCorrects + 1;
    io.emit('users', users);
    io.emit('answerCorrects', answerCorrects);

    if (activeGameAnswerAndQuest && findNumberOfQuest !== answerCorrects) {
      console.log('getRandomIndex');
      getRandomQuestio(findNumberOfQuest);
    }
  }
}

async function getRandomQuestio(numberOfIndex) {
  const randomIndex = Math.floor(Math.random() * numberOfIndex);
  const randomIndexTheme = currentThemeIndex.find(indexTheme => indexTheme === randomIndex);
  console.log(randomIndex, currentThemeIndex);

  if (randomIndexTheme === undefined) {
    currentQuestion = questios[randomIndex];
    console.log(currentQuestion);
    currentThemeIndex.push(randomIndex);
    io.emit('SetCurrentQuestion', currentQuestion);

    if (currentQuestion) {
      (0, _timers.setTimeout)(async () => {
        await checkSetIsTypingUser({
          name: 'BotMarivalda',
          isTyping: true
        });
      }, 1500);
      (0, _timers.setTimeout)(async () => {
        await checkSetIsTypingUser({
          name: 'BotMarivalda',
          isTyping: false
        });
        io.emit('receivedMessage', {
          botName: 'BotMarivalda',
          message: `Deixe-me pensar em uma pergunta.`
        });
      }, 2500);
      (0, _timers.setTimeout)(async () => {
        await checkSetIsTypingUser({
          name: 'BotMarivalda',
          isTyping: true
        });
      }, 3500);
      (0, _timers.setTimeout)(async () => {
        await checkSetIsTypingUser({
          name: 'BotMarivalda',
          isTyping: false
        });
        io.emit('receivedMessage', {
          botName: 'BotMarivalda',
          message: currentQuestion.question
        });
      }, 4500);
      return;
    }
  } else if (activeGameAnswerAndQuest && findNumberOfQuest !== answerCorrects) {
    console.log('Dont can get random index for quest try again...');
    getRandomQuestio(numberOfIndex);
  }
}

io.on("connection", socket => {
  socket.on('join', async ({
    id,
    name,
    isTyping,
    answerCorrect,
    heart
  }) => {
    const findUser = users.find(user => user.name === name);
    await createUser({
      id,
      name,
      isTyping,
      answerCorrect,
      heart
    });
    io.emit('users', users);

    if (!findUser) {
      socket.broadcast.emit('receivedMessage', {
        name: 'Admin',
        message: `O usuario ${name} entrou na sala!`
      });
    }

    ;
    socket.on('disconnect', () => {
      socket.broadcast.emit('receivedMessage', {
        name: 'Admin',
        message: `O usuario ${name} saiu!`
      });
    });
    socket.on('sendMessage', async ({
      message,
      answer
    }) => {
      await incrementAnswerCorrects(answer, name);
      console.log(answerEmojisLenght, answerCorrects, activeGameEmojis);

      if (activeGameEmojis && answerCorrects === answerEmojisLenght) {
        activeGameEmojis = false;
        answerCorrects = 0;
        io.emit('SetDivinationEmoji', undefined);
        const usersWinners = users.filter(user => user.answerCorrect !== 0).sort().reverse();
        io.emit('SetActivieGameEmoji', false);
        (0, _timers.setTimeout)(async () => {
          io.emit('SetOpenModalActiveGameQuest', true, usersWinners);
          users = users.map(user => user.answerCorrect > 0 ? { ...user,
            answerCorrect: 0
          } : user);
        }, 5500);
        (0, _timers.setTimeout)(() => {
          io.emit('SetOpenModalActiveGameQuest', false);
          openModalEndGame = false;
        }, 12000);

        if (openModalEndGame === false) {
          await checkSetIsTypingUser({
            name: 'BotMarivalda',
            isTyping: true
          });
          (0, _timers.setTimeout)(async () => {
            await checkSetIsTypingUser({
              name: 'BotMarivalda',
              isTyping: false
            });
            io.emit('receivedMessage', {
              botName: 'BotMarivalda',
              message: `Mais que demora ja estava dormindo e olha que nem sono eu sinto.
              Vocês querem jogar novamente ? se não, fique avontande para continuar conversando ou escolher outra coisa`
            });
            isEndingGameEmojis = true;
            openModalEndGame = true;
            io.emit('SetIsEndingGameEmojis', true);
          }, 3000);
        } else {
          (0, _timers.setTimeout)(async () => {
            if (openModalEndGame === false) {
              await checkSetIsTypingUser({
                name: 'BotMarivalda',
                isTyping: true
              });
              (0, _timers.setTimeout)(async () => {
                await checkSetIsTypingUser({
                  name: 'BotMarivalda',
                  isTyping: false
                });
                io.emit('receivedMessage', {
                  botName: 'BotMarivalda',
                  message: `Mais que demora ja estava dormindo e olha que nem sono eu sinto.
                  Vocês querem jogar novamente ? se não, fique avontande para continuar conversando ou escolher outra coisa`
                });
                isEndingGameEmojis = true;
                openModalEndGame = true;
                io.emit('SetActivieGameEmoji', false);
                io.emit('SetIsEndingGameEmojis', true);
                io.emit('users', users);
              }, 3000);
            }
          }, 13000);
        }
      }

      if (activeGameForca && passwordComplete.length > 1 && passwordComplete.every(item => item === true)) {
        isEndingGameHangman = true;
        io.emit('SetPassword', ['']);
        io.emit('CorrectLetter', ['']);
        io.emit('SetEndingGame', isEndingGameHangman);
        io.emit('SetActiveGameForca', false);
        io.emit('SetUserPlay', []);
        usersPlay = [];
        passwordComplete = [];
        (0, _timers.setTimeout)(async () => {
          await checkSetIsTypingUser({
            name: 'BotMarivalda',
            isTyping: true
          });
        }, 1000);
        (0, _timers.setTimeout)(async () => {
          await checkSetIsTypingUser({
            name: 'BotMarivalda',
            isTyping: false
          });
          io.emit('receivedMessage', {
            botName: 'BotMarivalda',
            message: `Parabens a todos achei que seriam mais rapidos.
            Vocês querem jogar novamente ? se não, fique avontande para continuar conversando ou escolher outra coisa`
          });
        }, 2500);
      }

      if (activeGameForca && totalHearts === 0 && passwordHang.length > 1) {
        activeGameForca = false;
        isEndingGameHangman = true;
        io.emit('SetActiveGameForca', false);
        io.emit('SetEndingGame', isEndingGameHangman);
        io.emit('CorrectLetter', ['']);
        io.emit('SetUserPlay', []);
        usersPlay = [];
        io.emit('SetPassword', ['']);
        (0, _timers.setTimeout)(async () => {
          await checkSetIsTypingUser({
            name: 'BotMarivalda',
            isTyping: true
          });
        }, 5000);
        (0, _timers.setTimeout)(async () => {
          await checkSetIsTypingUser({
            name: 'BotMarivalda',
            isTyping: false
          });
          io.emit('receivedMessage', {
            botName: 'BotMarivalda',
            message: `Não foi dessa vez se bem que já não espera muito de vocês mesmo.A palavra era ${passwordHang.join('').toUpperCase()}, Vocês querem jogar novamente ? 
            se não, fique avontande para continuar conversando ou escolher outra coisa`
          });
        }, 7000);
        (0, _timers.setTimeout)(async () => {
          passwordHang = [];
        }, 8000);
      }

      if (activeGameAnswerAndQuest && findNumberOfQuest === answerCorrects) {
        activeGameAnswerAndQuest = false;
        answerCorrects = 0;
        io.emit('SetActiveGameAnswerAndQuest', false);
        const usersWinners = users.filter(user => user.answerCorrect !== 0).sort().reverse();
        io.emit('SetActivieGameEmoji', false);
        (0, _timers.setTimeout)(async () => {
          io.emit('SetOpenModalActiveGameQuest', true, usersWinners);
          users = users.map(user => user.answerCorrect > 0 ? { ...user,
            answerCorrect: 0
          } : user);
        }, 2000);
        (0, _timers.setTimeout)(() => {
          io.emit('SetOpenModalActiveGameQuest', false);
          openModalEndGame = false;
        }, 12000);

        if (!openModalEndGame) {
          await checkSetIsTypingUser({
            name: 'BotMarivalda',
            isTyping: true
          });
          (0, _timers.setTimeout)(async () => {
            await checkSetIsTypingUser({
              name: 'BotMarivalda',
              isTyping: false
            });
            io.emit('receivedMessage', {
              botName: 'BotMarivalda',
              message: `Parabéns a todos, consigo vê a fumaça daqui.
              Vocês querem jogar novamente ? se não, fique avontande para continuar conversando ou escolher outra coisa`
            });
            isEndingGameQuest = true;
            io.emit('SetIsEndingGameQuest', true);
          }, 3000);
        } else {
          (0, _timers.setTimeout)(async () => {
            await checkSetIsTypingUser({
              name: 'BotMarivalda',
              isTyping: true
            });
            (0, _timers.setTimeout)(async () => {
              await checkSetIsTypingUser({
                name: 'BotMarivalda',
                isTyping: false
              });
              io.emit('receivedMessage', {
                botName: 'BotMarivalda',
                message: `Parabéns a todos, consigo vê a fumaça daqui.
                Vocês querem jogar novamente ? se não, fique avontande para continuar conversando ou escolher outra coisa`
              });
              isEndingGameQuest = true;
              openModalEndGame = true;
              io.emit('users', users);
              io.emit('SetIsEndingGameQuest', true);
            }, 3000);
          }, 13000);
        }
      }

      console.log(name, message, answer);
      io.emit('receivedMessage', {
        name,
        message,
        answer
      });
    });
    socket.on('sendMessageBot', ({
      botName,
      message,
      messageBot,
      messageWinners
    }) => {
      io.emit('receivedMessage', {
        botName,
        message,
        messageBot,
        messageWinners
      });
    });
    socket.on('userTyping', ({
      name,
      isTyping
    }) => {
      checkSetIsTypingUser({
        name,
        isTyping
      });
    });
    socket.on('sendAnswerEmojisMusic', answerEmojis => {
      io.emit('answerEmojisMusic', answerEmojis);
    });
    socket.on('checkLetter', (name, letter) => {
      if (activeGameForca && passwordHang.includes(letter)) {
        correctLetter.push(letter);
        passwordComplete = passwordHang.map(letter => correctLetter.includes(letter));
        io.emit('CorrectLetter', correctLetter);
      } else {
        var _findUser$heart;

        const findWrongLetter = wrongLetter.find(letterWrong => letterWrong === letter);
        const findUser = usersPlay.find(user => user.name === name);
        console.log(passwordHang, findWrongLetter, wrongLetter);

        if (findUser && ((_findUser$heart = findUser.heart) === null || _findUser$heart === void 0 ? void 0 : _findUser$heart.length) !== 0 && !findWrongLetter) {
          var _findUser$heart2;

          wrongLetter.push(letter);
          const findKeyHeart = (_findUser$heart2 = findUser.heart) === null || _findUser$heart2 === void 0 ? void 0 : _findUser$heart2.find(heart => heart.key.includes(`heart${findUser.name}`));

          if (findKeyHeart) {
            var _findUser$heart3;

            const hearts = (_findUser$heart3 = findUser.heart) === null || _findUser$heart3 === void 0 ? void 0 : _findUser$heart3.filter(heart => heart.key !== findKeyHeart.key);

            if (hearts !== null && hearts !== void 0 && hearts.length) {
              io === null || io === void 0 ? void 0 : io.emit('updatedUser', {
                name,
                heart: hearts
              });
              totalHearts -= 1;
            } else {
              totalHearts -= 1;
              io === null || io === void 0 ? void 0 : io.emit('updatedUser', {
                name,
                heart: hearts
              });
              (0, _timers.setTimeout)(() => {
                checkSetIsTypingUser({
                  name: 'BotMarivalda',
                  isTyping: true
                });
              }, 1500);
              (0, _timers.setTimeout)(() => {
                checkSetIsTypingUser({
                  name: 'BotMarivalda',
                  isTyping: false
                });
                io.emit('receivedMessage', {
                  name: 'Admin',
                  message: `você esta fora`,
                  destination: findUser.name,
                  color: findUser.color
                });
              }, 4000);
            }
          }
        }
      }
    });
    socket.on('UpdatedUser', ({
      name,
      heart
    }) => {
      const findUser = usersPlay.find(user => user.name === name);
      const findIdexUser = usersPlay.findIndex(user => user.name === name);

      if (findUser) {
        usersPlay[findIdexUser].heart = heart;
        io.emit('UpdateUserHangman', usersPlay);
      }
    });
    socket.on('setPassword', (password, isTrue, name) => {
      var _user$heart;

      passwordHang = password;
      activeGameForca = isTrue;
      const user = usersPlay.find(user => user.name === name);
      console.log(password, isTrue, user, usersPlay); // const findIndexUser = usersPlay.findIndex(user => user.name === name);

      if (user && ((_user$heart = user.heart) === null || _user$heart === void 0 ? void 0 : _user$heart.length) === 0 && user.isPLay) {
        io.emit('updatedUser', {
          name,
          heart: [{
            key: `heart${user.name}1`
          }, {
            key: `heart${user.name}2`
          }, {
            key: `heart${user.name}3`
          }]
        });
        totalHearts += 3;
      } else if (user && user.isPLay) {
        totalHearts += 3 * usersPlay.length;
        console.log('AUMEITEI PARA +3 totalhearts', totalHearts);
      }

      io.emit('SetPassword', password);
      io.emit('SetActiveGameForca', isTrue);
    });
    socket.on('setVideoId', VideoId => {
      videoId = VideoId;
      console.log(videoId);
      io.emit('SetVideoId', videoId);
    });
    socket.on('setActiveGameAnswerAndQuest', isActiveGameAnswerAndQuest => {
      activeGameAnswerAndQuest = isActiveGameAnswerAndQuest;
      io.emit('SetActiveGameAnswerAndQuest', isActiveGameAnswerAndQuest);
    });
    socket.on('setActiveGameForca', isActiveGameForca => {
      activeGameForca = isActiveGameForca;
      console.log(isActiveGameForca);
      io.emit('SetActiveGameForca', isActiveGameForca);
    });
    socket.on('setActiveGameForcaCheckLetter', isActiveGameForca => {
      activeGameForca = isActiveGameForca;
      console.log(isActiveGameForca);
      io.emit('SetActiveGameForcaCheckLetter', isActiveGameForca);
    });
    socket.on('restartGameHangman', name => {
      const findIndexUser = users.findIndex(user => user.name === name);

      if (users[findIndexUser].heart.length === 0) {
        io.emit('updatedUser', {
          name,
          heart: [{
            key: `heart${users[findIndexUser].name}1`
          }, {
            key: `heart${users[findIndexUser].name}2`
          }, {
            key: `heart${users[findIndexUser].name}3`
          }]
        });
        totalHearts += 3;
      }
    });
    socket.on('setEndingGame', isEndindGameHangman => {
      isEndingGameHangman = isEndindGameHangman;
      io.emit('SetEndingGame', isEndindGameHangman);
    });
    socket.on('setUserPlay', ({
      name,
      heart,
      isPLay,
      color
    }) => {
      usersPlay.push({
        name,
        heart,
        isPLay,
        color
      });
      wrongLetter = [];
      const filteredUser = usersPlay.filter(user => user.heart);
      console.log(filteredUser);

      if (filteredUser && usersPlay.length === users.length) {
        usersPlay = filteredUser;
        io.emit('SetUserPlay', filteredUser);
        console.log(usersPlay);
        console.log('All users is finished');
        checkSetIsTypingUser({
          name: 'BotMarivalda',
          isTyping: true
        });
        (0, _timers.setTimeout)(() => {
          checkSetIsTypingUser({
            name: 'BotMarivalda',
            isTyping: false
          });
          io.emit('receivedMessage', {
            botName: 'BotMarivalda',
            message: `Certo, mas preciso saber se você prefere que eu escolha a palavra chave ou não ?`
          });
        }, 2500);
      }
    });
    socket.on('setIsOpeModal', isOpeModal => {
      io.emit('SetIsOpeModal', isOpeModal);
    });
    socket.on('setCurrentTheme', async message => {
      const messageArray = message.split(' ');
      findThemes = themes.filter(theme => messageArray.some(item => item === theme.themeName)).flat();
      numbersOfThemes = findThemes.length;
      findNumberOfQuest = Number(messageArray.find(item => numberOfQuestions.includes(item)));
      numberPerQuestio = findNumberOfQuest / numbersOfThemes;

      if (numbersOfThemes > 0 && findNumberOfQuest > 0) {
        getRandom();
        console.log(findThemes, findNumberOfQuest);
        console.log('if get radom');
      }
    });
    socket.on('setGameQuestRandom', () => {
      const randomNumber = Math.floor(Math.random() * 4);
      const numberOfQuests = [6, 8, 10, 12];
      questios = themes.map(theme => theme.quests).flat();
      findNumberOfQuest = numberOfQuests[randomNumber];
      console.log(numberOfQuests[randomNumber], 'Number choiced', questios, '<-Questoes');
      getRandomQuestio(findNumberOfQuest);
    });
    socket.on('handleSetEmojis', async handleSetEmoji => {
      // const findEmojiCategorie = divinationsEmojis.find(emoji => handleSetEmoji.includes(emoji.emojiCategorie))
      const divination = divinationsEmojis.find(emoji => handleSetEmoji.includes(emoji.emojiCategorie));
      answerCorrects = 0;
      console.log(handleSetEmoji, divination);
      if (divination) if (handleSetEmoji.includes('filme')) {
        io.emit('SetIsEndingGameEmojis', false);
        answerEmojisLenght = divination === null || divination === void 0 ? void 0 : divination.emojis[0].answer.length;
        console.log(answerEmojisLenght);
        await checkSetIsTypingUser({
          name: 'BotMarivalda',
          isTyping: true
        });
        (0, _timers.setTimeout)(async () => {
          await checkSetIsTypingUser({
            name: 'BotMarivalda',
            isTyping: false
          });
          io.emit('receivedMessage', {
            botName: 'BotMarivalda',
            message: 'Deixe-me pensar em algo'
          });
        }, 1500);
        (0, _timers.setTimeout)(async () => {
          await checkSetIsTypingUser({
            name: 'BotMarivalda',
            isTyping: true
          });
        }, 2000);
        (0, _timers.setTimeout)(async () => {
          await checkSetIsTypingUser({
            name: 'BotMarivalda',
            isTyping: false
          });
          io.emit('receivedMessage', {
            botName: 'BotMarivalda',
            messageBot: divination.emojis[0].question
          });
          io.emit('SetDivinationEmoji', divination.emojis[0]);
          console.log(divination.emojis[0].answer);
        }, 6000);
      }
      ;

      if (handleSetEmoji.includes('serie')) {
        if (divination) {
          await checkSetIsTypingUser({
            name: 'BotMarivalda',
            isTyping: true
          });
          (0, _timers.setTimeout)(async () => {
            await checkSetIsTypingUser({
              name: 'BotMarivalda',
              isTyping: false
            });
            io.emit('receivedMessage', {
              botName: 'BotMarivalda',
              messageBot: divination.emojis[0].question
            });
            io.emit('SetDivinationEmoji', divination.emojis[0], activeGameEmojis);
          }, 3500);
        }
      }

      if (handleSetEmoji.includes('musica')) {
        if (divination) {
          await checkSetIsTypingUser({
            name: 'BotMarivalda',
            isTyping: true
          });
          (0, _timers.setTimeout)(async () => {
            await checkSetIsTypingUser({
              name: 'BotMarivalda',
              isTyping: false
            });
            io.emit('receivedMessage', {
              botName: 'BotMarivalda',
              messageBot: 'Deixe-me pensar'
            });
            await checkSetIsTypingUser({
              name: 'BotMarivalda',
              isTyping: true
            });
          }, 2000);
          (0, _timers.setTimeout)(async () => {
            await checkSetIsTypingUser({
              name: 'BotMarivalda',
              isTyping: false
            });
            io.emit('receivedMessage', {
              botName: 'BotMarivalda',
              messageBot: divination.emojis[0].question
            });
            io.emit('SetDivinationEmoji', divination.emojis[0], activeGameEmojis);
          }, 4000);
        }
      }

      console.log(handleSetEmoji, activeGameEmojis);
      io.emit('SetDivinationEmoji', handleSetEmoji, activeGameEmojis);
    });
    socket.on('setActivieGameEmoji', isActiveGameEmoji => {
      activeGameEmojis = isActiveGameEmoji;

      if (activeGameEmojis === true) {
        isEndingGameEmojis = false;
        io.emit('SetIsEndingGameEmojis', false);
      }

      console.log(activeGameEmojis);
      io.emit('SetActivieGameEmoji', activeGameEmojis);
    });
    socket.on('setIsEndingGameEmojis', () => {
      isEndingGameEmojis = false;
      io.emit('SetIsEndingGameEmojis', false);
    });
    socket.on('setIsEndingGameQuest', () => {
      isEndingGameQuest = false;
      io.emit('SetIsEndingGameQuest', false);
    });
  });
});
server.listen(( process.env.PORT || 3333), () => {
  console.log('Server started on port 3333');
});