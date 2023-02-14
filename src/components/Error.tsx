import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";
import React from "react";

export type ErrorProps = {
  message : string;
}
export function Error({ message }: ErrorProps) {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>{message}</AlertTitle>
    </Alert>
  );
}
