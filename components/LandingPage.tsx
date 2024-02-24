import { RootContext } from "@/context/RootContext";
import { subjects } from "@/data/subject";
import Image from "next/image";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { fadeInAnimations, lists, textAnimation } from "@/lib/animation";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const LandingPage = () => {
  const { settSubject, handleAction } = useContext(RootContext);
  const text = "Welcome to the";
  const heading = Array.isArray(text) ? text : [text];

  return (
    <>
      <div className="lg:w-full m-auto flex flex-col lg:flex-row lg:gap-10 gap-5">
        <div className="lg:flex-1">
          <div>
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={textAnimation}
              transition={{ staggerChildren: 0.1 }}
              className="text-[10vw] lg:text-[4vw] font-bold text-beige"
            >
              {heading?.map((item: any, index: any) => (
                <span className="block" key={`${item}-${index}`}>
                  {item.split(" ").map((word: any, wordIndex: any) => (
                    <span className="inline-block" key={`${word}-${wordIndex}`}>
                      {word.split("").map((char: any, charIndex: any) => (
                        <motion.span
                          key={`${char}-${charIndex}`}
                          className="inline-block"
                          variants={textAnimation}
                        >
                          {char}
                        </motion.span>
                      ))}
                      <span className="inline-block">&nbsp;</span>
                    </span>
                  ))}
                </span>
              ))}
            </motion.h1>

            <motion.h1
              variants={lists}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.2 }}
              className="text-4xl font-semibold text-beige"
            >
              Frontend Quiz
            </motion.h1>
          </div>

          <motion.p
            variants={lists}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.5 }}
            className={`${outfit.className} mt-5 text-xl italic text-beige`}
          >
            Pick subject to get started.
          </motion.p>
        </div>

        <motion.ul
          variants={fadeInAnimations}
          initial="hidden"
          animate="visible"
          className="lg:flex-1 lg:w-96 flex flex-col gap-4"
        >
          {subjects.map((item, index) => (
            <motion.li
              key={index}
              className={`${outfit.className} lg:w-[550px] border-2 border-black p-4 lg:p-5 rounded-md flex items-center gap-4 hover:cursor-pointer hover:shadow-md bg-beige hover:bg-yellow-primary hover:text-black`}
              onClick={() => {
                handleAction("start", index, 0);
                settSubject(item.title);
              }}
              variants={lists}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 },
              }}
            >
              <Image
                src={item.icon}
                width={500}
                height={500}
                alt={item.title}
                className="w-10 h-10 lg:w-16 lg:h-16"
              />
              <p className="font-semibold lg:text-2xl ">{item.title}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </>
  );
};

export default LandingPage;
