import Lottie from 'lottie-react';
import loadingAnimation from './config.json';

const LoadingAnimation = () => {
  return <Lottie animationData={loadingAnimation} loop={true} />;
};

export default LoadingAnimation;