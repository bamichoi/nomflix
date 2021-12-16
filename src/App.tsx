import styled from "styled-components";
import { motion, useMotionValue, useTransform, useViewportScroll, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  background:linear-gradient(135deg,rgb(236, 0, 154), rgb(221, 0, 238));
`;


const Box = styled(motion.div)`
  width: 300px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.2);
  background-color:white;
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  position:absolute;
  top:100px;
`;

const boxVariant = {
  initial:{
    opacity:0,
    scale:0
  },
  visible:{
    opacity:1,
    scale:1,
    rotateZ:360
  },
  leaving:{
    opacity:0,
    y:20,
  },
}

function App() {
  const [showing, setShowing] = useState(false)
  const toggleShowing = () => {
    setShowing(prev => !prev);
  }
  return (
    <Wrapper>
      <button onClick={toggleShowing}>click</button>
      <AnimatePresence>
        { showing ? <Box variants={boxVariant} initial="initial" animate="visible" exit="leaving"/> : null }
      </AnimatePresence>
  
    </Wrapper>
  );
}

export default App;