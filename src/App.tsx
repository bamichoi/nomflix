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
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.2);
  background-color:white;
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display:flex;
  justify-content:center;
  align-items:center;
  font-size:28px;
  position:absolute;
  top:100px;

`;

const boxVariants = {
   entry: (back:boolean) => ({
     x: (back === false ? 500 : -500),
     opacity:0,
     scale:0,
   }),
   center:{
     x:0,
     opacity:1,
     scale:1,
     transition:{
       duration:0.3
     }
   },
   exit: (back:boolean) => ({
     x: (back === false ? -500 : 500),
     opacity:0,
     scale:0,
     transition:{
      duration:0.3
    }
   })
}

function App() {
  const [visible, setVisible] = useState(1);
  const [back, setBack] = useState(false);
  const nextPlease = () => { 
    setBack(false);
    setVisible(prev => prev === 10 ? 1 : prev + 1) }
  const prevPlease = () => {
    setBack(true);
    setVisible(prev => prev === 1 ? 10 : prev - 1)}
  return (
    <Wrapper>
      <AnimatePresence exitBeforeEnter custom={back}>
        <Box 
          custom={back}
          key={visible} 
          variants={boxVariants} 
          initial="entry" 
          animate="center" 
          exit="exit">{visible}</Box> 
      </AnimatePresence>
      <button onClick={nextPlease}>next</button>
      <button onClick={prevPlease}>prev</button>
    </Wrapper>
  );
}

export default App;