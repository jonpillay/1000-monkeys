import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CreditsContext } from "../context/CreditsContext";

import { useDispatch } from "react-redux";
import { initialiseStory } from "../components/create-stories-page/storyBookSysInfoSlice";

import { useCreateStory } from "./useCreateStory";


export const useInitialiseStory = () => {
  const reduxDispatch = useDispatch()

  const { AIGenCall } = useCreateStory()

  const initialiseStoryHook = (characterChoice, genreChoice, styleChoice, GPTPrompt) => {
    reduxDispatch(initialiseStory(characterChoice, genreChoice, styleChoice, GPTPrompt))
    AIGenCall()
  }
    

  return { initialiseStoryHook }
}