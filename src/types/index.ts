export interface SendRequest {
  userName: string;
  friendUserName: string;
  message: string;
  groupName: string;
}

export interface MessageProps {
  id: string;
  userName: string;
  from: string;
  content: string;
  isAudio?: boolean;
  time: Date;
  prefix?: boolean;
  isLose: boolean;
  isAdmin: boolean;
}

export interface GroupProps {
  userName: string;
  room: string;
}

export interface TypingProps {
  user: string;
  isTyping: boolean;
}

export interface HeartProps {
  username: string;
  heart: string[];
}
export interface HangmanProps {
  isStart: boolean;
  password: string[];
  correctLetter: string[];
  usersHeart: HeartProps[];
  isAutomatic: boolean;
  nextWordIsPassword: boolean;
  currentWord: WordsProps;
}

export interface BotProps {
  userName: string;
  content: string;
  from: string;
  prefix?: boolean;
}

export interface MembersProps {
  userName: string;
  room: string;
  admin: boolean;
}

export interface WordsProps {
  text: string;
  tips: string[];
}

export interface GuessSingerProps {
  isStart: boolean;
  currentSong: CurrentSongProps;
  correctMessages: string[];
}

export interface CurrentSongProps {
  title: string;
  singer: string;
}