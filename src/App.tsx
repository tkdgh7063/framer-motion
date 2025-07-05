import styled from "styled-components";
import { motion } from "motion/react";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  height: 200px;
  width: 200px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  text-align: center;
`;

function App() {
  return (
    <Wrapper>
      <Box
        initial={{ scale: "0" }}
        transition={{ type: "spring", delay: 0.5 }}
        animate={{ scale: 1, rotateZ: 360 }}>
        Box
      </Box>
    </Wrapper>
  );
}

export default App;
