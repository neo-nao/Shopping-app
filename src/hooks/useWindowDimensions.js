import { useEffect, useState } from "react";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;

  return { width, height };
}

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  console.log("render");

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    document.addEventListener("resize", handleResize);

    return () => document.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

export { getWindowDimensions };
export default useWindowDimensions;
