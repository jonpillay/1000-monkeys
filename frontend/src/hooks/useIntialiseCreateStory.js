import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CreditsContext } from "../context/CreditsContext";

import { useDispatch } from "react-redux";
import { resetStorySysInfo, initialiseStory } from "../components/Pages/create-stories-page/storyBookSysInfoSlice";
import { resetStoryBookSlice } from "../components/CreateStoryPageParts/story-book-create/storyBookSlice";
import { useCreateStory } from "./useCreateStory";
import { useNavigate } from "react-router";


export const useInitialiseStory = () => {
  const reduxDispatch = useDispatch()

  reduxDispatch(resetStorySysInfo())
  reduxDispatch(resetStoryBookSlice())

  const initialiseStoryHook = (characterChoice, genreChoice, styleChoice, prompt) => {

    const localGPTPromptHistory = []

    const GPTPrompt = {
      role: "user",
      content: prompt,
    }

    localGPTPromptHistory.push(GPTPrompt)

    localStorage.setItem('localGPTPromptHistory', JSON.stringify(localGPTPromptHistory))

    reduxDispatch(initialiseStory(characterChoice, genreChoice, styleChoice, GPTPrompt))
  }

  return { initialiseStoryHook } 
}