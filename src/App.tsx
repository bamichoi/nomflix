import styled from "styled-components";
import { motion, useMotionValue, useTransform, useViewportScroll, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-around;
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
  justify-content: center;
  align-items: center;
  font-size:28px;

`;

const Circle = styled(motion.div)`
  background-color:#00a5ff;
  height:100px;
  width:100px;
  border-radius: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked(prev => !prev);

  return (
    <Wrapper onClick={toggleClicked}>
      <Box>
        { !clicked ? <Circle layoutId="circle" style={{borderRadius:50}}></Circle> : null } 
      </Box>
      <Box>
        { clicked ? <Circle layoutId="circle" style={{borderRadius:0}}></Circle> : null } 
      </Box>
    </Wrapper>
  );
}

export default App;