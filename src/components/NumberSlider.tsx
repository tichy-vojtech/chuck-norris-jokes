import {
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Slider,
  Tooltip,
} from "@chakra-ui/react";
import { useState } from "react";

const DEFAULT_MAX_SLIDER_VALUE = 50;

export type NumberSliderProps = {
  initialValue: number;
  maxSliderValue?: number;
  onChangeEnd: (value: number) => void;
};
export function NumberSlider({
  initialValue,
  onChangeEnd,
  maxSliderValue = DEFAULT_MAX_SLIDER_VALUE,
}: NumberSliderProps) {
  const [currentValue, setCurrentValue] = useState(initialValue);

  return (
    <Slider
      min={1}
      max={maxSliderValue}
      w={["100%", "85%", "75%", "50%"]}
      zIndex="0"
      value={currentValue}
      onChange={setCurrentValue}
      onChangeEnd={onChangeEnd}
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
