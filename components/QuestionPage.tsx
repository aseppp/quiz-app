import React, { useContext } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { RootContext } from "@/context/RootContext";
import { motion } from "framer-motion";
import { fadeInOptionAnimations, lists } from "@/lib/animation";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});
const letters = ["A", "B", "C", "D"];

const QuestionPage = () => {
  const {
    initialState,
    handleAction,
    handleActionUser,
    completed,
    correct,
    incorrect,
    finishQuiz,
    stop,
  } = useContext(RootContext);
  const { question, answer, options } = initialState?.question;

  return (
    <div className="w-full m-auto flex flex-col lg:flex-row lg:gap-10 p-5">
      <div className="lg:flex-1 flex flex-col justify-between items-start lg:items-start">
        <div>
          <p className="italic mb-2 text-beige">
            Question {initialState?.questionIndex + 1} of{" "}
            {initialState?.questions?.length}
          </p>

          <motion.p
            key={initialState?.questionIndex}
            variants={lists}
            transition={{ delay: 0 }}
            initial="hidden"
            animate="visible"
            className="font-semibold text-2xl lg:text-4xl text-left text-beige"
          >
            {question}
          </motion.p>
        </div>

        <div className="my-5 w-full">
          {
            <Progress
              className="bg-yellow-primary"
              style={{ color: "white" }}
              value={initialState?.questionIndex * 10}
            />
          }
        </div>
      </div>

      <motion.ul
        key={initialState?.questionIndex}
        variants={fadeInOptionAnimations}
        initial="hidden"
        whileInView="visible"
        className="lg:flex-1 w-full lg:w-96 flex flex-col gap-5 "
      >
        {initialState?.submitAnswer
          ? options.map((item: string, index: number) => (
              <motion.li
                key={index}
                variants={lists}
                className={`${
                  outfit.className
                } border-2 p-4 lg:p-6 rounded-lg flex items-center gap-4 ${
                  index === answer
                    ? "text-black border-black bg-green-primary dark:bg-green-200 shadow-md"
                    : index === initialState?.userAnswer
                    ? "bg-red-primary border-black"
                    : "bg-white text-black "
                }`}
              >
                <span className="w-8 h-8 flex items-center justify-center rounded bg-black text-white ">
                  {letters[index]}
                </span>
                <p className="lg:text-xl dark:text-black">{item}</p>
              </motion.li>
            ))
          : options.map((item: string, index: number) => (
              <motion.li
                variants={lists}
                key={index}
                className={`${outfit.className} ${
                  initialState?.userAnswer === index
                    ? "text-black border-black bg-yellow-primary dark:border-gray-500 dark:bg-gray-400 shadow-md"
                    : "text-black bg-beige"
                } border-2 p-4 lg:p-6 rounded-lg flex items-center gap-4 cursor-pointer`}
                onClick={() => handleActionUser("select-answer", index)}
              >
                <span className="w-8 h-8 flex items-center justify-center rounded bg-black text-white ">
                  {letters[index]}
                </span>
                <p className="lg:text-xl dark:text-black ">{item}</p>
              </motion.li>
            ))}

        <motion.span
          variants={lists}
          transition={{ delay: 1 }}
          initial="hidden"
          animate="visible"
        >
          <Button
            className={`${outfit.className} mt-4 w-full bg-purple-primary hover:bg-purple-primary text-black text-xl`}
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

                if (initialState?.userAnswer === answer && !completed) {
                  correct.play();
                } else if (initialState?.userAnswer !== answer && !completed) {
                  incorrect.play();
                } else if (completed) {
                  stop();
                  finishQuiz.play();
                }
              }
            }}
          >
            {initialState?.submitAnswer
              ? "Next question"
              : completed
              ? "Finish test"
              : "Submit answer"}
          </Button>
        </motion.span>
      </motion.ul>
    </div>
  );
};

export default QuestionPage;
