import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

export const Congratulation = () => {
  const { width, height } = useWindowSize();
  return <Confetti width={width - 20} height={height - 20} />;
};
