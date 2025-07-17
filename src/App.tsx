import styled from "styled-components";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  useScroll,
} from "motion/react";

const Wrapper = styled(motion.div)`
  height: 200vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  height: 200px;
  width: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  const x = useMotionValue(0);
  // const scale = useTransform(x, [-800, 0, 800], [2, 1, 0.05]);

  const rotateZ = useTransform(x, [-840, 840], [-360, 360]);
  // useMotionValueEvent(rotateZ, "change", (latest) => {
  //   console.log(latest);
  // });

  const gradient = useTransform(
    x,
    [-840, 840],
    [
      "linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))",
      // "linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238))",
      "linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))",
    ]
  );

  const { scrollY, scrollYProgress } = useScroll();
  // useMotionValueEvent(scrollY, "change", (latest) => console.log(latest));
  const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);

  return (
    <Wrapper style={{ background: gradient }}>
      <Box style={{ x, rotateZ, scale }} drag="x" dragSnapToOrigin />
    </Wrapper>
  );
}

export default App;
