import { RootContext } from "@/context/RootContext";
import React, { useContext } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const ResultPage = () => {
  const { initialState, handleAction } = useContext(RootContext);

  return (
    <div className="w-full lg:w-[50%] container p-6 m-auto flex flex-col gap-5">
      <Card className="p-5 flex flex-col space-y-4 border-gray-700 border-2">
        <h1 className="text-4xl text-center">Quiz completed</h1>
        <h1 className="text-center text-2xl font-bold">Your score...</h1>
        <p className="text-center text-[40vw] lg:text-[10vw]">
          {initialState?.points}
        </p>
      </Card>

      <Button size={"xl"} onClick={() => handleAction("restart")}>
        Play again
      </Button>
    </div>
  );
};

export default ResultPage;
