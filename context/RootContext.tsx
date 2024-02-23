"use client";

import { subjects } from "@/data/subject";
import { createContext } from "react";
import Question from "@/data/Question.json";
import { useLocalStorage } from "@/hooks";

export const RootContext = createContext<any>({});
const RootContextProvider = ({ children }: any) => {
  const [subject, setSubject] = useLocalStorage("subject", {});
  const [initialState, setInitialState] = useLocalStorage("initialState", {});

  const mainSfx = new Audio("/sfx/main-sfx.mp3");
  // mainSfx.loop = true;
  const finishQuiz = new Audio("/sfx/finish.mp3");
  const correct = new Audio("/sfx/correct.mp3");
  const incorrect = new Audio("/sfx/incorrect.mp3");

  const settSubject = (payload: any) => {
    const title: any = subjects.find((item) => item.title === payload);
    return setSubject(title);
  };

  const completed =
    initialState?.questions?.length - 1 === initialState?.questionIndex
      ? true
      : false;

  const handleAction = (
    action: string,
    subjectIndex: number,
    questionIndex: number
  ) => {
    switch (action) {
      case "start":
        setInitialState({
          ...initialState,
          status: "doing",
          subjectIndex: subjectIndex,
          questionIndex: questionIndex,
          question: Question[subjectIndex][questionIndex],
          questions: Question[subjectIndex],
          points: 0,
        });
        // mainSfx.play();
        // mainSfx.loop = true;ddser
        break;

      case "next-question":
        setInitialState({
          ...initialState,
          questionIndex: questionIndex + 1,
          question: Question[subjectIndex][questionIndex + 1],
          submitAnswer: false,
          userAnswer: null,
        });
        break;

      case "restart":
        setInitialState({
          ...initialState,
          status: "ready",
          subjectIndex: subjectIndex,
          questionIndex: questionIndex,
          questions: Question[subjectIndex],
          points: 0,
          submitAnswer: false,
          userAnswer: null,
        });
        setSubject("");
        break;

      default:
        break;
    }
  };

  const handleActionUser = (action: string, payload: any) => {
    switch (action) {
      case "select-answer":
        setInitialState({ ...initialState, userAnswer: payload });
        break;

      case "submit-answer":
        const newPoints = payload;
        setInitialState((prevState: any) => ({
          ...prevState,
          submitAnswer: true,
          points: prevState?.points + newPoints,
          status: completed ? "finish" : "doing",
        }));
        break;

      default:
        break;
    }
  };

  console.log({ initialState });

  return (
    <RootContext.Provider
      value={{
        initialState,
        setInitialState,
        subject,
        settSubject,
        handleAction,
        handleActionUser,
        completed,
        mainSfx,
        finishQuiz,
        correct,
        incorrect,
      }}
    >
      {children}
    </RootContext.Provider>
  );
};

export default RootContextProvider;
