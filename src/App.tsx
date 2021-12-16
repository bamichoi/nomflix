import styled from "styled-components";
import { motion, useMotionValue, useTransform, useViewportScroll, AnimatePresence, Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Variant } from "@testing-library/react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background:linear-gradient(135deg,rgb(236, 0, 154), rgb(221, 0, 238));
`;

const Grid = styled.div`
  display:grid;
  grid-template-columns:repeat(2, 1fr);
  gap:10px;
  margin-bottom:50px;
`;


const Box = styled(motion.div)`
  width: 400px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display:flex;
  justify-content: center;
  align-items: center;
  font-size:28px;

`;

const Circle = styled(motion.div)`
  background-color:rgba(255, 255, 255, 1);
  height:100px;
  width:100px;
  border-radius: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Overlay = styled(motion.div)`
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.5);
  position:absolute;
  display:flex;
  justify-content:center;
  align-items:center;
`;

const overlayVariants = {
  inactive : {
    opacity:0 //bgcolor 로 바꾸기.
    
  },
  active : {
    opacity:1
},
  exit: {
    opacity:0
  }
}



function App() {
  const [boxId, setBoxId] =  useState<null|string>(null);
  const [switched, setSwitched] = useState(false);
  const onSwitch = () => {
    setSwitched(prev => !prev)
  }
  return (
    <Wrapper >
      <Grid>
        {["1", "2", "3", "4"].map(i => (
        <Box onClick={() => setBoxId(i)} key={i} layoutId={i} whileHover={{scale:1.1}}>
          {(i === "2" && switched) ? <Circle layoutId="circle"></Circle>  : null }
          {(i === "3" && !switched) ? <Circle layoutId="circle"></Circle>  : null }
        </Box>))}
      </Grid>
      <button onClick={onSwitch}>Switch</button>
      <AnimatePresence>
        { boxId ? <Overlay 
        onClick={() => setBoxId(null)}
        variants={overlayVariants} initial="inactive" animate="active" exit="exit">
          <Box layoutId={boxId} style={{backgroundColor:"rgba(255, 255, 255, 1)", width:390, height:190}}></Box>
        </Overlay> : null} 
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;