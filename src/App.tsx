import styled from "styled-components";
import { motion, useMotionValue, useTransform, useViewportScroll } from "framer-motion";
import { useEffect, useRef } from "react";

const Wrapper = styled(motion.div)`
  height: 500vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background:;
`;

const BiggerBox = styled.div`
  width:600px;
  height:600px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  display:flex;
  justify-content:center;
  align-items:center;
  overflow:hidden;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.2);
  background-color:white;
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  const x = useMotionValue(0);
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 5])
  const rotateZ = useTransform(x, [-800, 800], [-360, 360])
  const gradient = useTransform(x, [-800, 0, 800], [
    "linear-gradient(135deg,rgb(0, 35, 236), rgb(0, 210, 238))",
    "linear-gradient(135deg,rgb(236, 0, 154), rgb(221, 0, 238))",
    "linear-gradient(135deg,rgb(28, 236, 0), rgb(238, 238, 0))"
  ])
  return (
    <Wrapper style={{background:gradient}}>
        <Box 
          style={{ x, rotateZ, scale }}
          drag="x"
          dragSnapToOrigin
          />
    </Wrapper>
  );
}

export default App;