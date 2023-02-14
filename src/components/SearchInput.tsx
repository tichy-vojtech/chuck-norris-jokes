import { Box, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React from "react";
import { FaSearch } from "react-icons/fa";
export type SearchInputProps = {
  placeholder: string;
  onChange: (value: string) => void;
};
export function SearchInput({ placeholder, onChange }: SearchInputProps) {
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
}
