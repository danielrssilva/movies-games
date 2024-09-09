import { StarAnimation } from "../helpers/animations";
import { Star } from "./icons";
import { motion } from "framer-motion";

interface StarButtonProps {
  className?: string;
  index: number;
  person: string;
  rating: number;
  key: string;
  onClick: (person: string, rating: number) => void;
}

const StarButton = (props: StarButtonProps) => {
  const { className, index, person, rating, key, onClick } = props;
  return (
    <motion.button
      className="group/star"
      whileInView="visible"
      initial="hidden"
      exit="hidden"
      key={key}
      variants={StarAnimation}
      viewport={{ once: false }}
      onClick={() => onClick(person, index + 1)}
      transition={{ duration: 0.2, delay: index * 0.1 }}
    >
      <Star
        className={`transition-all duration-75 group-hover/star:stroke-white ${className} ${
          rating > index ? "stroke-white" : "stroke-dark-grey-icon"
        }`}
      />
    </motion.button>
  );
};

export default StarButton;
