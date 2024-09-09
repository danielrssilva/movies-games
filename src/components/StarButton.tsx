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
      key={key}
      onClick={() => onClick(person, index + 1)}
      className="group/star"
      whileInView="visible"
      transition={{ duration: 0.2, delay: index * 0.1 }}
      variants={StarAnimation}
      initial="hidden"
      exit="hidden"
      viewport={{ once: false }}
    >
      <Star
        className={`transition-all duration-75 group-hover/star:stroke-white ${className} ${
          rating > index ? "stroke-white" : "stroke-dark-grey-icon"
        }`}
      />
    </motion.button>
  );
};

const StarAnimation = {
  hidden: { opacity: 0, transform: "translateY(-10px)", scale: 0.8 },
  visible: { opacity: 1, transform: "translateY(0)", scale: 1 },
};

export default StarButton;
