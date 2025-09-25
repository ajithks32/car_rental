import "./Loading.css"; // Import the CSS file
import { motion } from "framer-motion";
const Loading=()=>{
  return (
    <div className="loading-container">
      <div className="loading-text">
        {/* Animated "TAXIX" transitioning color from gray to yellow from left to right */}
        <motion.span
          initial={{ backgroundPosition: "100% 0" }}
          animate={{ backgroundPosition: "0% 0" }}
          transition={{ duration: 2, ease: "easeOut", repeat: Infinity, repeatType: "reverse" }}
          className="text-gradient"
        >
          TAXIX
        </motion.span>
      </div>
      
      {/* Loading Text Animation */}
      <motion.p
        className="loading-animation"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
      >
        LOADING...
      </motion.p>
    </div>

  );
};

export default Loading;
