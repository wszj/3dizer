import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react"
import { useState } from "react";
import { MainMenu } from "../utils/types";

import Home from "./home/index"
import Mall from "./magicbrush/index"



export default function Header() {
  const [currMainMenu, setCurrMainMenu] = useState(MainMenu.Home);



  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        noPage
      </Box>
    </ChakraProvider>
  );
}