import { useEffect, useState } from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Heading,
} from "@chakra-ui/react";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";

import { getData } from "../api/getData";

export function CategoryMenu() {
  const [categories, setCategories] = useState([]);

  useEffect(function fetchCategories() {
    getData("categories").then((category) => setCategories(category));
  }, []);

  return (
    <Menu>
      <MenuButton as={Button} variant="ghost" minW={0}>
        <RxHamburgerMenu />
      </MenuButton>
      <MenuList alignItems="center">
        <Heading size="md">Categories</Heading>
        <MenuDivider />
        {categories.map((category) => (
          <Link
            href={{
              pathname: "/categories/[category]",
              query: { category },
            }}
            key={category}
          >
            <MenuItem>{category}</MenuItem>
          </Link>
        ))}
      </MenuList>
    </Menu>
  );
}
