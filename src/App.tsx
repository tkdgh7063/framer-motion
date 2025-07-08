import styled from "styled-components";
import { motion, Variants } from "motion/react";
import { useRef } from "react";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// parent container used as drag constraint area
const Container = styled(motion.div)`
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Box = styled(motion.div)`
  height: 200px;
  width: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

// variants used for whileHover, whileTap, whileDrag states
const boxVariants: Variants = {
  hover: { scale: 1.5, rotateZ: 90 }, // hover animation
  tap: { scale: 1, borderRadius: "50%" }, // tap (press) animation
  drag: {
    backgroundColor: "rgb(46, 204, 113)", // style change while dragging
    transition: { duration: 10 }, // long drag animation
  },
};

function App() {
  const containerRef = useRef<HTMLDivElement>(null); // ref for drag constraint
  return (
    <Wrapper>
      <Container ref={containerRef}>
        <Box
          drag // enables drag
          dragSnapToOrigin // returns to origin when released
          // dragConstraints={{ top: -200, bottom: 200, left: -200, right: 200 }}
          dragConstraints={containerRef} // restricts drag within container
          dragElastic={0} // defines the "stretchiness" of the drag — 0 = no elasticity, 1 = very elastic
          variants={boxVariants} // connects to variant states
          whileHover="hover" // triggers hover variant
          whileTap="tap" // triggers tap variant
          whileDrag="drag" // triggers drag variant
        />
      </Container>
    </Wrapper>
  );
}

export default App;
