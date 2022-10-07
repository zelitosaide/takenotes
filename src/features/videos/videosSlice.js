import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    url: "watch?v=808n_P29Oc8",
    title: "ENGLISH FLUENCY METHOD | Why The 5Ws Method Is So Powerful",
    category: "English"
  },
  {
    url: "watch?v=ag3RnEaB3zM",
    title: "THINK AND SPEAK IN ENGLISH | How To Talk About Your Daily Life Fluently In English",
    category: "English"
  },
  {
    url: "watch?v=j2fCssBRxt0",
    title: "Why You Don't Feel Confident When You Speak English",
    category: "English"
  },
  {
    url: "watch?v=IDDmrzzB14M&t=3485s",
    title: "CS50 2022 - Lecture 0 - Scratch",
    category: "CS50"
  },
];

const videoSlice = createSlice({
  name: "videos",
  initialState,
});

export default videoSlice.reducer;