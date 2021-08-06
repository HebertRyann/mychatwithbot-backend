import { guessSinger, hangman } from '../constants';
import { serverIO, Socket } from '../http';
import { MessageProps } from '../types';
import { GuessSinger } from './GuessSinger';
import { Hangman } from './HangmanService';
import { handleTyping } from './Typing';

const botResource = [
  [
    'toque',
    'musica',
    'tocar',
  ],
];

export const handleBot = (message: MessageProps) => {
  const { content, isAdmin, from, isLose, userName } = message;
  
  if(botResource[0].some(item => content.includes(item))) {
    console.log('Tocar musica');
    return;
  };

  if(isAdmin) {

    if(content.includes('adivinhação')) {
      guessSinger.isStart = true;
      handleTyping({ user: 'marivalda', isTyping: true });

      setTimeout(() => {
        handleTyping({ user: 'marivalda', isTyping: false });
        serverIO.emit('ServerReceivedMessage', {
          userName: 'marivalda',
          content: `Certo, 
          antes de começar gostaria de informa a quem não sabe como funcionar o jogo.
           Basicamente vocês teram que responder o NOME de um cantor se acertarem
           ganham pontos, se errarem estao desclassificados e perde todas as moedas. Posso começar ?`,
          from,
        });
      }, 3000);

      return;
    };

    if(!hangman.isStart && content.includes('forca')) {
      hangman.isStart = true;
      serverIO.emit('ServerResponseSetHangman', hangman.isStart);
      handleTyping({ user: 'marivalda', isTyping: true });
      setTimeout(() => {
        handleTyping({ user: 'marivalda', isTyping: false });
        serverIO.emit('ServerReceivedMessage', {
          userName: 'marivalda',
          content: `Certo, antes de começar devo informa-los que podem optar por pedir
          "dica", se estiver muito dificil para voces, agora preciso perguntar, 
          voce prefere que eu escolha a palavra chave ?`,
          from,
        });
      }, 3000);
      return;
    };
  }

  if(guessSinger.isStart) {
    console.log('Call Function set Song')
    GuessSinger(message);
    return;
  }

  if(hangman.isStart && !isLose) {
    Hangman({ content, from, userName });
    return;
  };
};