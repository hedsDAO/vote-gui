import Lottie from 'lottie-react';
import checkmarkAnimation from './config.json';

const CheckMarkAnimation = () => {
  return <Lottie animationData={checkmarkAnimation} loop={false} />;
};

export default CheckMarkAnimation;
