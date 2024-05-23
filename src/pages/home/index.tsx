import {
    VStack,
} from "@chakra-ui/react";

import Banner from './banner'
import Magic3d from './magic3d'
import Brush from './brush'

import Network from './network'
import About from './about'
import Partner from './partner'

import "./home.css";


export default function Index() {
    return (
        <>
            <Banner />
            <Magic3d />
            <Brush />
            <Network />
            <About />
          
        </>
    );
}