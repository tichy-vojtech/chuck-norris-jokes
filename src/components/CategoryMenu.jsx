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
import { getCategories } from "../api/getCategories";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";

export function CategoryMenu() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((category) => setCategories(category));
  }, []);

  return (
    <Menu>
      <MenuButton as={Button} variant="ghost" minW={0}>
        <RxHamburgerMenu />
      </MenuButton>
      <MenuList alignItems={"center"}>
        <Heading size="md">Categories</Heading>
        <MenuDivider />
        {categories.map((category) => {
          return (
            <Link to={`/category-jokes/${category}`} key={category}>
              <MenuItem>{category}</MenuItem>
            </Link>
          );
        })}
      </MenuList>
    </Menu>
  );
}
