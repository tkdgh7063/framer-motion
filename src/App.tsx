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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 560px;
  gap: 10px;
  margin-bottom: 30px;
`;

const Box = styled(motion.div)`
  height: 200px;
  background-color: #e783d9;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
`;

const Background = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
`;

const OverlayBox = styled(motion.div)`
  width: 250px;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const Button = styled(motion.button)`
  height: 25px;
  width: 60px;
  border-radius: 5px;
  background-color: white;
`;

const Circle = styled(motion.div)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
`;

const boxVariants = {
  start: ({
    hovered,
    direction,
  }: {
    hovered: boolean;
    direction: "topLeft" | "bottomRight";
  }) => {
    if (!hovered) {
      return {
        scale: 1,
        x: 0,
        y: 0,
      };
    }

    const shift = 30;
    return {
      scale: 1.2,
      x: direction === "topLeft" ? -shift : shift,
      y: direction === "topLeft" ? -shift : shift,
    };
  },
};

function App() {
  const [selectedId, setSelectedId] = useState<null | string>(null);
  const [circleId, setCircleId] = useState(2);

  const [hovered1, setHovered1] = useState(false);
  const [hovered2, setHovered2] = useState(false);

  const handleBoxClick = (id: string) => setSelectedId(id);
  const closeOverlay = () => setSelectedId(null);
  const buttonClick = () => setCircleId((prev) => (prev === 2 ? 3 : 2));

  return (
    <Wrapper>
      <Grid>
        {Array.from({ length: 4 }).map((_, i) => {
          const id = (i + 1).toString();
          if (id === "1") {
            return (
              <Box
                key={id}
                layoutId={id}
                variants={boxVariants}
                initial="start"
                animate="start"
                onClick={() => handleBoxClick(id)}
                onMouseEnter={() => setHovered1(true)}
                onMouseLeave={() => setHovered1(false)}
                custom={{ hovered: hovered1, direction: "topLeft" }}
              />
            );
          } else if (id === "4") {
            return (
              <Box
                key={id}
                layoutId={id}
                variants={boxVariants}
                initial="start"
                animate="start"
                onClick={() => handleBoxClick(id)}
                onMouseEnter={() => setHovered2(true)}
                onMouseLeave={() => setHovered2(false)}
                custom={{ hovered: hovered2, direction: "bottomRight" }}
              />
            );
          } else {
            return (
              <Box key={id}>
                {+id === circleId ? (
                  <Circle layoutId="circle" transition={{ duration: 0.5 }} />
                ) : null}
              </Box>
            );
          }
        })}
      </Grid>
      <AnimatePresence>
        {selectedId ? (
          <Overlay>
            <Background
              onClick={closeOverlay}
              initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
              animate={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
              exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}></Background>
            <OverlayBox layoutId={selectedId}>
              <Box
                style={{
                  width: "100%",
                  height: "100%",
                  fontSize: "28px",
                  backgroundColor: "rgba(255, 255, 255, 1)",
                }}
              />
            </OverlayBox>
          </Overlay>
        ) : null}
      </AnimatePresence>
      <Button
        animate={{
          scale: circleId === 3 ? 1.4 : 1,
          color: circleId === 3 ? "rgba(255, 165, 0, 1)" : "rgba(0, 0, 255, 1)",
        }}
        transition={{ duration: 0.5 }}
        onClick={buttonClick}>
        Switch
      </Button>
    </Wrapper>
  );
}

export default App;
