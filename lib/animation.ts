export const fadeInAnimations = {
  hidden: { opacity: 1, scale: 2 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 1.6,
      staggerChildren: 0.2,
    },
  },
};

export const fadeInOptionAnimations = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      //   delay: 1,
      //   delayChildren: 1,
      staggerChildren: 0.2,
    },
  },
};

export const lists = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export const textAnimation = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};
