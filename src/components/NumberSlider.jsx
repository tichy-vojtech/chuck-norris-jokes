import {
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Slider,
} from "@chakra-ui/react";
import { useState } from "react";

export function NumberSlider({ inputValue, onChangeEnd }) {
  const [currentValue, setCurrentValue] = useState(inputValue);

  const handleChangeEnd = (val) => {
    setCurrentValue(val);
    onChangeEnd(val);
  };

  return (
    <Slider
      min={0}
      max={50}

      w={["100%", "50%"]}
      zIndex="0"
      value={currentValue}
      onChange={(val) => setCurrentValue(val)}
      onChangeEnd={(val) => handleChangeEnd(val)}
    >
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb
        fontSize="sm"
        boxSize="32px"
        children={currentValue}
        color="black"
      />
    </Slider>
  );
}
