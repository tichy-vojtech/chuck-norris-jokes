import { Box, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React from "react";
import { FaSearch } from "react-icons/fa";

export function SearchInput({ placeholderText, onChange }) {
  return (
    <Box py="4">
      <InputGroup>
        <Input
          variant="pill"
          placeholder={placeholderText}
          onChange={(event) => onChange(event.target.value)}
        />
        <InputRightElement children={<FaSearch cursor="pointer" />} />
      </InputGroup>
    </Box>
  );
}
