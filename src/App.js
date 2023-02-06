import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { JokesPage } from "./pages/JokesPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { CategoryJokesPage } from "./pages/CategoryJokesPage";
import { AppLayout } from "./components/AppLayout";
import { cnJokesTheme } from "./theme";

export function App() {
  return (
    <ChakraProvider theme={cnJokesTheme}>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<JokesPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route
              path="/category-jokes/:category"
              element={<CategoryJokesPage />}
            />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </ChakraProvider>
  );
}
