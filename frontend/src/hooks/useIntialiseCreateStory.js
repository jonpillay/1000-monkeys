import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CreditsContext } from "../context/CreditsContext";

import { useDispatch } from "react-redux";
import { initialiseStory } from "../components/create-stories-page/storyBookSysInfoSlice";
import { useCreateStory } from "./useCreateStory";
import { useNavigate } from "react-router";


export const useInitialiseStory = () => {
  const navigate = useNavigate()
  const { AIGenCall } = useCreateStory()
  const reduxDispatch = useDispatch()

  const initialiseStoryHook = (characterChoice, genreChoice, styleChoice, prompt) => {
    const GPTPrompt = {
      role: "user",
      content: prompt
    }

    reduxDispatch(initialiseStory(characterChoice, genreChoice, styleChoice, GPTPrompt))

    AIGenCall()
    navigate('/create')
  }
    

  return { initialiseStoryHook }
}