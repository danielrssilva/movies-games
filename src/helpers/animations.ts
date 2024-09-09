const dayAnimation = {
  hidden: { opacity: 0, translateX: -10, scale: 0.9 },
  visible: { opacity: 1, translateX: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.5 },
};

const LetterAnimation = {
  hidden: { opacity: 0, transform: "translateY(20px)", scale: 0.8 },
  visible: { opacity: 1, transform: "translateY(0)", scale: 1 },
};

const IconAnimation = {
  hidden: { opacity: 0, scale: 0, display: "none" },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2 },
    display: "flex",
  },
};

const StarAnimation = {
  hidden: { opacity: 0, transform: "translateY(-10px)", scale: 0.8 },
  visible: { opacity: 1, transform: "translateY(0)", scale: 1 },
};
export { dayAnimation, LetterAnimation, IconAnimation, StarAnimation };
