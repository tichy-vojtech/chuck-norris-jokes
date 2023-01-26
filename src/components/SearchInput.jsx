import { Box, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchInput = ({ placeholderText, onChange }) => {
  return (
    <Box py="4">
      <InputGroup>
        <Input
          placeholder={placeholderText}
          onChange={(e) => onChange(e.target.value)}
        />
        <InputRightElement children={<FaSearch cursor="pointer" />} />
      </InputGroup>
    </Box>
  );
};

export default SearchInput;
