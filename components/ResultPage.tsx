import { RootContext } from "@/context/RootContext";
import React, { useContext, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const ResultPage = () => {
  const { initialState, handleAction } = useContext(RootContext);
  console.log(initialState);

  return (
    <div className="w-full lg:w-[50%] container p-6 m-auto flex flex-col gap-5">
      <Card className="p-5 flex flex-col space-y-4 border-gray-700 border-2 bg-yellow-primary">
        <h1 className="text-4xl text-center">Quiz completed</h1>
        <h1 className="text-center text-2xl font-bold">Your score...</h1>
        <p
          className={`${
            initialState?.points <= 60
              ? "text-red-primary"
              : initialState?.points <= 80
              ? "text-purple-primary"
              : initialState?.points <= 100
              ? "text-green-primary"
              : "text-black"
          }  text-center text-[40vw] lg:text-[10vw]`}
        >
          {initialState?.points}
        </p>
      </Card>

      <Button
        className="bg-green-primary hover:bg-green-primary text-black"
        size={"xl"}
        onClick={() => handleAction("restart")}
      >
        Play again
      </Button>
    </div>
  );
};

export default ResultPage;
