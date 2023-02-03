import {
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Slider,
  Tooltip,
} from "@chakra-ui/react";
import { useState } from "react";

export function NumberSlider({ inputValue, onChangeEnd, maxSliderValue }) {
  const [currentValue, setCurrentValue] = useState(inputValue);

  const handleChangeEnd = (val) => {
    setCurrentValue(val);
    onChangeEnd(val);
  };

  return (
    <Slider
      min={1}
      max={maxSliderValue ?? 50}
      w={["100%", "85%", "75%", "50%"]}
      zIndex="0"
      value={currentValue}
      onChange={(val) => setCurrentValue(val)}
      onChangeEnd={(val) => handleChangeEnd(val)}
    >
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <Tooltip label="Number of jokes" placement="top">
        <SliderThumb
          fontSize="sm"
          boxSize="32px"
          children={currentValue}
          color="black"
        />
      </Tooltip>
    </Slider>
  );
}
