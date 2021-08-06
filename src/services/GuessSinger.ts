import { guessSinger, songs } from "../constants";
import { serverIO } from "../http";
import { MessageProps } from "../types";
import { handleTyping } from "./Typing";



const GuessSinger = async (message: MessageProps) => {

  async function setCurrentSong() {
    const randomSong = Math.floor(Math.random() * 3);
    // youtube search
    console.log('Set current Song')
    return guessSinger.currentSong = songs[randomSong];
  };

  function validateAnswer() {
    console.log('Validate Answer', message.id)
    const isCorrectAnswer = guessSinger.currentSong.title === message.content;

    if(isCorrectAnswer) {
      serverIO.emit('ServerCorrectMessages', guessSinger.correctMessages.push(message.id));
    };

    serverIO.to(message.from).emit('ServerReceivedMessage', message);

    return;
  };

  if(!guessSinger.currentSong.title) {
    const currentSong = await setCurrentSong();
    console.log(currentSong);
    handleTyping({ user: 'marivalda', isTyping: true });

    setTimeout(() => {
      handleTyping({ user: 'marivalda', isTyping: false });
      serverIO.emit('ServerReceivedMessage', {
        userName: 'marivalda',
        content: `Agora deixem-me pensar em algo`,
        from: message.from,
      });
    }, 3000);

    setTimeout(() => {
      handleTyping({ user: 'marivalda', isTyping: false });
      serverIO.emit('ServerReceivedMessage', {
        userName: 'marivalda',
        content: `Certo, Divirtam-se`,
        from: message.from,
      });
      serverIO.emit('ServerSetCurrentSong', currentSong);
    }, 4500);

    return;
  }

  if(guessSinger.currentSong.title) {
    validateAnswer();
  }
};

export { GuessSinger };