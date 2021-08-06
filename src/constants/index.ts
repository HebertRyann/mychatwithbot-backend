import { CurrentSongProps, GuessSingerProps, HangmanProps, WordsProps } from "../types";

export const hangman: HangmanProps = { 
  isStart: false, 
  password: [], 
  correctLetter: [],
  usersHeart: [],
  isAutomatic: false,
  nextWordIsPassword: false,
  currentWord: {} as WordsProps,
};

export const guessSinger: GuessSingerProps = { 
  isStart: false,
  currentSong: {} as CurrentSongProps,
  correctMessages: [],
};
export const quest = { isStart: false };

export const words: WordsProps[] = [
  { text: 'jacare', tips: ['um animal', 'reptil', 'crocodilo']},
  { text: 'osso', tips: ['animal', 'reptil1', 'crocodilo1']},
  { text: 'arara', tips: ['animal', 'reptil2', 'crocodilo2']},
];

export const songs = [
  { title: 'ela partiu', singer: 'tim maia'},
  { title: 'meu ébano', singer: 'alcione'},
  { title: 'rosas', singer: 'ana carolina'},
]

export const modalConfetti = {
  isOpen: false,
}