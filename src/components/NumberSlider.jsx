import {
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Slider,
} from "@chakra-ui/react";
import { useState } from "react";

const NumberSlider = ({ inputValue, onChangeEnd }) => {
  const [value, setValue] = useState(inputValue);

  const handleChangeEnd = (val) => {
    setValue(val);
    onChangeEnd(val);
  };

  return (
    <Slider
      min={0}
      max={50}
      w="50%"
      zIndex="0"
      value={value}
      onChange={(val) => setValue(val)}
      onChangeEnd={(val) => handleChangeEnd(val)}
    >
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb
        fontSize="sm"
        boxSize="32px"
        children={value}
        color="black"
      />
    </Slider>
  );
};

export default NumberSlider;
