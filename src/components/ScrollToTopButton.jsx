import { Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const visibilityEdge = 200;

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    const scrollOverListener = () => {
      setVisible(false);
      if (window.scrollY > visibilityEdge) setVisible(true);
    };
    window.addEventListener("scroll", scrollOverListener);
    return () => window.removeEventListener("scroll", scrollOverListener);
  }, []);
  if (visible) {
    return (
      <Button
        onClick={scrollToTop}
        position="fixed"
        colorScheme="blue"
        bottom="16"
        right="8"
      >
        <AiOutlineArrowUp size={20} />
      </Button>
    );
  }
}
