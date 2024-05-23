import {
    Box,
    VStack,
} from "@chakra-ui/react";

import AutoplayCarousel from "../../component/AutoplayCarousel";
import Slide1 from "../../assets/images/home/magic3d-1.png";
import Slide2 from "../../assets/images/home/magic3d-2.png";
import Slide3 from "../../assets/images/home/magic3d-3.png";
import Slide4 from "../../assets/images/home/magic3d-4.png";
import Slide5 from "../../assets/images/home/magic3d-5.png";
import Slide6 from "../../assets/images/home/magic3d-6.png";
import Slide7 from "../../assets/images/home/magic3d-7.png";
import Slide8 from "../../assets/images/home/magic3d-8.png";
import Slide9 from "../../assets/images/home/magic3d-9.png";
import Slide10 from "../../assets/images/home/magic3d-10.png";
import Slide11 from "../../assets/images/home/magic3d-11.png";
import Slide12 from "../../assets/images/home/magic3d-12.png";


const slideArray = [
    Slide1,
    Slide2,
    Slide3,
    Slide4,
    Slide5,
    Slide6,
    Slide7,
    Slide8,
    Slide9,
    Slide10,
    Slide11,
    Slide12,
]

const data = new Array(12).fill(0).map((item, index) => {
    return { num: index };
});
console.log("data", data);
export interface ItemProps {
    num: number;
}
const itemStyle = {
    border: "1px solid #ccc",
    background: "#fff",
    height: "116px",
    width: "120px",
    color: "red",
    marginRight: "15px"
};
export default function Magic3d() {
    const Item = (item: ItemProps) => {
        // return <div style={itemStyle}>{item.num}</div>;
        const src = slideArray[item.num]
        return <div style={{ marginTop: "22px" }}><img src={src}></img></div>;
    };
    return (
        <Box className="magic3d-bg">    
            <AutoplayCarousel
                Item={Item}
                containerWidth={1280}
                showNum={8}
                speed={16}
                data={data}
                />
        </Box>
    );
}