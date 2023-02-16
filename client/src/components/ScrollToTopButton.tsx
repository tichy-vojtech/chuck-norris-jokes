import { Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";

const VISIBILITY_EDGE = 200;

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    function scrollOverListener() {
      setVisible(false);
      if (window.scrollY > VISIBILITY_EDGE) {
        setVisible(true)
      };
    };

    window.addEventListener("scroll", scrollOverListener);
    return () => window.removeEventListener("scroll", scrollOverListener);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <Button
      onClick={scrollToTop}
      position="fixed"
      bottom="16"
      right="8"
      variant="outline"
    >
      <AiOutlineArrowUp size={20} />
    </Button>
  );
}
