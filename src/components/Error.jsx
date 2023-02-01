import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";
import React from "react";

export function Error({ message }) {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>{message}</AlertTitle>
    </Alert>
  );
}
