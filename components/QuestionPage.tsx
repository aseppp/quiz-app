import React, { useContext } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { RootContext } from "@/context/RootContext";

const letters = ["A", "B", "C", "D"];

const QuestionPage = () => {
  const { initialState, handleAction, handleActionUser } =
    useContext(RootContext);
  const { question, answer, options } = initialState?.question;

  return (
    <div className="w-full m-auto flex flex-col lg:flex-row lg:gap-10 p-5">
      <div className="lg:flex-1 flex flex-col justify-between items-center lg:items-start">
        <div>
          <p className="italic mb-2">
            Question {initialState?.questionIndex + 1} of{" "}
            {initialState?.questions?.length}
          </p>

          <p className="font-semibold text-2xl lg:text-4xl text-left">
            {question}
          </p>
        </div>

        <div className="my-5 w-full">
          {<Progress value={initialState?.questionIndex * 10} />}
        </div>
      </div>

      <div className="lg:flex-1 w-full lg:w-96 flex flex-col gap-5">
        {initialState?.submitAnswer
          ? options.map((item: string, index: number) => (
              <div
                key={index}
                className={`border-2 p-4 rounded-lg flex items-center gap-4 ${
                  index === answer
                    ? "text-black border-black bg-green-200 dark:border-gray-500 dark:bg-green-200 shadow-md"
                    : index === initialState?.userAnswer
                    ? "bg-red-200"
                    : "bg-white text-black"
                }`}
              >
                <span className="w-8 h-8 flex items-center justify-center rounded bg-black text-white  ">
                  {letters[index]}
                </span>
                <p className="dark:text-black">{item}</p>
              </div>
            ))
          : options.map((item: string, index: number) => (
              <div
                key={index}
                className={`${
                  initialState?.userAnswer === index
                    ? "text-black border-black bg-gray-200 dark:border-gray-500 dark:bg-gray-400 shadow-md"
                    : "bg-white text-black"
                } border-2 p-4 rounded-lg flex items-center gap-4 `}
                onClick={() => handleActionUser("select-answer", index)}
              >
                <span className="w-8 h-8 flex items-center justify-center rounded bg-black text-white  ">
                  {letters[index]}
                </span>
                <p className="dark:text-black">{item}</p>
              </div>
            ))}

        <Button
          className="mt-4 "
          disabled={
            initialState?.userAnswer !== null &&
            initialState?.userAnswer !== undefined
              ? false
              : true
          }
          size={"xl"}
          onClick={() => {
            if (initialState?.submitAnswer) {
              handleAction(
                "next-question",
                initialState?.subjectIndex,
                initialState?.questionIndex
              );
            } else {
              handleActionUser(
                "submit-answer",
                initialState?.userAnswer === answer ? 10 : 0
              );
            }
          }}
        >
          {initialState?.submitAnswer ? "Next question" : "Submit answer"}
        </Button>
      </div>
    </div>
  );
};

export default QuestionPage;
