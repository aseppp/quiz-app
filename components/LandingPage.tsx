import { RootContext } from "@/context/RootContext";
import { subjects } from "@/data/subject";
import Image from "next/image";
import React, { useContext } from "react";

const LandingPage = () => {
  const { settSubject, handleAction } = useContext(RootContext);

  return (
    <div className="lg:w-full m-auto flex flex-col lg:flex-row lg:gap-10 gap-5">
      <div className="lg:flex-1">
        <div>
          <h1 className="text-[10vw] lg:text-[5rem] font-bold">
            Welcome to the
          </h1>
          <h1 className="text-4xl font-semibold">Frontend Quiz</h1>
        </div>

        <p className="mt-5 text-xl italic">Pick subject to get started.</p>
      </div>

      <div className="lg:flex-1 w-[21rem] lg:w-96 flex flex-col gap-5">
        {subjects.map((item, index) => (
          <div
            key={index}
            className="lg:w-[550px] border-2 p-4 lg:p-3 rounded-md flex items-center gap-4 hover:cursor-pointer"
            onClick={() => {
              handleAction("start", index, 0);
              settSubject(item.title);
            }}
          >
            <Image
              src={item.icon}
              width={500}
              height={500}
              alt={item.title}
              className="w-10 h-10 lg:w-14 lg:h-14"
            />
            <p className="font-semibold lg:text-xl">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
