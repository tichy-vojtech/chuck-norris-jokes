import { Box, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React from "react";
import { FaSearch } from "react-icons/fa";

export function SearchInput({ placeholder, onChange }) {
  return (
    <Box py="4">
      <InputGroup>
        <Input
          variant="pill"
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
        <InputRightElement children={<FaSearch cursor="pointer" />} />
      </InputGroup>
    </Box>
  );
};
