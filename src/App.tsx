import styled from "styled-components";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 400px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  position: absolute;
  top: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  entry: (isBack: boolean) => ({
    x: isBack ? -500 : 500,
    opacity: 0,
    scale: 0,
  }),
  center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.5 } },
  exit: (isBack: boolean) => ({
    x: isBack ? 500 : -500,
    opacity: 0,
    rotateX: 90,
    transition: { duration: 0.5 },
  }),
};

function App() {
  const [visible, setVisible] = useState(0);
  const [back, setBack] = useState(false);
  const prev = () => {
    setVisible((prev) => (prev === 0 ? 0 : prev - 1));
    setBack(true);
  };
  const next = () => {
    setVisible((prev) => (prev === 9 ? 9 : prev + 1));
    setBack(false);
  };
  return (
    <Wrapper>
      <AnimatePresence mode="wait">
        <Box
          custom={back}
          key={visible}
          variants={boxVariants}
          initial="entry"
          animate="center"
          exit="exit">
          {visible}
        </Box>
      </AnimatePresence>
      <>
        {visible > 0 && <button onClick={prev}>Previous</button>}
        {visible < 9 && <button onClick={next}>Next</button>}
      </>
    </Wrapper>
  );
}

export default App;
