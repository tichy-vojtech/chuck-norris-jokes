import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const scrollButtonVisibilityEdge = 200;

  function handleClick() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  window.addEventListener("scroll", () => {
    setVisible(false);
    if (window.scrollY > scrollButtonVisibilityEdge) setVisible(true);
  });

  if (visible) {
    return (
      <Button
        onClick={handleClick}
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
