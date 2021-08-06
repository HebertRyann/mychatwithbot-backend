interface TypingProps {
  user: string;
  isTyping: boolean;
}
import { usersTyping } from '../websocket/index';

export const handleTyping = async ({ user, isTyping }: TypingProps) => {

  const findUserIndex = usersTyping.findIndex(userIndex => userIndex.user === user);
  if(findUserIndex !== -1) {
    if(usersTyping[findUserIndex].isTyping !== isTyping) {
      usersTyping[findUserIndex].isTyping = isTyping;
      return usersTyping;
    } else {
      return usersTyping;
    };
  } else {
    
    usersTyping.push({ user, isTyping });
    return usersTyping;
  };
};