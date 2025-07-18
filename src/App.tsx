import styled from "styled-components";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 50vw;
  gap: 10px;
  div:first-child,
  div:last-child {
    grid-column: span 2;
  }
`;

const Box = styled(motion.div)`
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
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
  width: 500px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

function App() {
  const [selectedId, setSelectedId] = useState<null | string>(null);

  const handleBoxClick = (id: string) => setSelectedId(id);
  const closeOverlay = () => setSelectedId(null);

  return (
    <Wrapper>
      <Grid>
        {Array.from({ length: 4 }).map((_, i) => {
          const id = (i + 1).toString();
          return (
            <Box key={id} layoutId={id} onClick={() => handleBoxClick(id)} />
          );
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
              <Box style={{ width: "100%", height: "100%", fontSize: "28px" }}>
                {selectedId}
              </Box>
            </OverlayBox>
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;
