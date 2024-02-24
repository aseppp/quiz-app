import React, { useContext } from "react";
import Image from "next/image";
import { RootContext } from "@/context/RootContext";

const Header = () => {
  const { subject, initialState } = useContext(RootContext);

  return (
    <div className="p-5 flex items-center justify-between ">
      {initialState?.status === "doing" ? (
        <>
          <div className="flex items-center gap-2">
            <Image
              src={subject?.icon}
              width={200}
              height={200}
              alt="image"
              className="w-10 h-10"
            />
            <p className="text-2xl font-bold text-beige">{subject?.title}</p>
          </div>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Header;
