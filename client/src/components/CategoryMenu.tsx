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
import { getCategories } from "../api/getCategories";

export function CategoryMenu() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);
  console.log(categories);

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
