import styled from "styled-components";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.2);
  background-color:white;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;


const boxVariants = {
  hover: {scale:1.5, rotateZ:90},
  click : {scale:1, borderRadius:"100px"},
  drag : {backgroundColor:"rgba(52, 152, 219,1.0)"}
}

function App() {
  return (
    <Wrapper>
      <Box drag variants={boxVariants} whileHover="hover" whileTap="click" whileDrag="drag" />
    </Wrapper>
  );
}

export default App;