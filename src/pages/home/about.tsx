import {
    Box,
    Text,
    VStack,
} from "@chakra-ui/react";



export default function Header() {
    return (
        <Box className="about">    
            <div className="module-title">
              <Text
                bgGradient='linear(to-r, #619BEB, #FFFFFF)'
                bgClip='text'
                // fontSize='6xl'
                fontWeight='extrabold'
              >
                About 3Dizer
              </Text>
            </div>
            <div className="about-desc">
              The 3Dizer Network leverages blockchain technology to transform GPUs
              <br />
              from mining tools into rendering powerhouses, creating a new ecosystem
              <br />
              that utilizes their full potential through
              <br />
              decentralized networks, incentives, and trust.
            </div>
            <div className="paper-download">
              <a href="">Download</a>
            </div>
        </Box>
    );
  }