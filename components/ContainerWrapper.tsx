"use client";

import React, { useContext, useEffect, useState } from "react";
import LandingPage from "./LandingPage";
import QuestionPage from "./QuestionPage";
import { RootContext } from "@/context/RootContext";
import Header from "./Header";
import ResultPage from "./ResultPage";

const ContainerWrapper = () => {
  const { initialState } = useContext(RootContext);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isClient) {
    return (
      <div className="md:container h-screen flex items-center justify-center">
        <div className="w-full flex flex-col">
          <Header />
          {initialState?.status === "doing" ? (
            <QuestionPage />
          ) : initialState?.status === "finish" ? (
            <ResultPage />
          ) : (
            <LandingPage />
          )}
        </div>
      </div>
    );
  }
};

export default ContainerWrapper;
