import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CreditsContext } from "../context/CreditsContext";

import { useDispatch } from "react-redux";
import { initialiseStory } from "../components/create-stories-page/storyBookSysInfoSlice";
import { useCreateStory } from "./useCreateStory";
import { useNavigate } from "react-router";


export const useInitialiseStory = () => {
  const reduxDispatch = useDispatch()

  const initialiseStoryHook = (characterChoice, genreChoice, styleChoice, prompt) => {

    console.log(characterChoice)
    console.log(genreChoice)
    console.log(styleChoice)

    const GPTPrompt = {
      role: "user",
      content: prompt,
    }

    localStorage.setItem('localGPTPromptHistory', JSON.stringify(GPTPrompt))

    // const GPTPromptStringy = JSON.stringify(GPTPrompt)

    reduxDispatch(initialiseStory(characterChoice, genreChoice, styleChoice, GPTPrompt))
  }
    

  return { initialiseStoryHook }
}