import {
    Box,
    Text,
    VStack,
} from "@chakra-ui/react";

import { Outlet, Link, useLocation } from "react-router-dom";

export default function Header() {
    return (
        <Box className="banner">    
            <div className='slogan'>
              <div>
                <Text
                  bgGradient='linear(to-r, #619BEB, #FFFFFF)'
                  bgClip='text'
                  // fontSize='6xl'
                  fontWeight='extrabold'
                >
                  3Dizer Your Imagination:
                </Text>
              </div>
              <div>
                <Text
                  bgGradient='linear(to-r, #619BEB, #FFFFFF)'
                  bgClip='text'
                  // fontSize='6xl'
                  fontWeight='extrabold'
                >
                  Where GPUs Craft the Future of Art
                </Text>
              </div>
            </div>

            <div className='introduce'>
              <div className='module-title'>
                <Text
                  bgGradient='linear(to-r, #619BEB, #FFFFFF)'
                  bgClip='text'
                  // fontSize='6xl'
                  fontWeight='extrabold'
                >
                  What is Magic3D?
                </Text>
              </div>
              <div className='magic3d-subtitle'>AI-powered 2D to 3D Video Converter</div>
              <div className='magic3d-content'>
                <div>AR/VR binocular display to create exclusive private 3D home theater.</div>
                <div>Great visual feast, free immersive 3D space.</div>
              </div>
            </div>

            <div className='magic3d-more'>
              <Link to="magic3d">more</Link>
            </div>

            <div className='magic3d-detail'>
              <div className='magic3d-detail-inner'>
                <div className="magic3d-detail-left">
                  <div className="magic3d-detail-left-title">
                    <Text
                      bgGradient='linear(to-r, #619BEB, #FFFFFF)'
                      bgClip='text'
                    >
                      3Dizer DePIN Network (18%-35%)
                    </Text>
                  </div>
                  <div className="magic3d-detail-left-cont">
                    Magic3D uses AI technology to shorten the conversion time and improve the conversion quality,
                    and is expected to increase computing power by 18% to 35% in the future.
                  </div>
                  <div className="magic3d-detail-left-download">
                    <a href="">Download</a>
                  </div>
                </div>
                <div className="magic3d-detail-right">
                  <div>
                    <table width="100%" border={0} cellSpacing={0} cellPadding={0}>
                      <tbody>
                      <tr>
                        <td className="magic3d-detail-right-title1" width={"42%"}>
                          <Text
                            bgGradient='linear(to-r, #619BEB, #FFFFFF)'
                            bgClip='text'
                          >
                            Macbook-M1(8G)
                          </Text>
                        </td>
                        <td className="magic3d-detail-right-title2" colSpan={3}>Resolution</td>
                      </tr>
                      <tr>
                        <td width={"42%"}></td>
                        <td colSpan={2}></td>
                        <td className="magic3d-detail-right-solution magic3d-tbl-cont1">1920P</td>
                      </tr>
                      <tr>
                        <td className="magic3d-detail-right-macbook magic3d-tbl-cont2" width={"42%"}>Duration 5 mins</td>
                        <td className="magic3d-detail-right-solution magic3d-tbl-cont2">720P</td>
                        <td className="magic3d-detail-right-solution magic3d-tbl-cont2">1080P</td>
                        <td className="magic3d-detail-right-solution magic3d-tbl-cont2">3.5 Hours</td>
                      </tr>
                      <tr>
                        <td className="magic3d-detail-right-macbook magic3d-tbl-cont3" width={"42%"}>25 mins</td>
                        <td className="magic3d-detail-right-solution magic3d-tbl-cont3">720P</td>
                        <td className="magic3d-detail-right-solution magic3d-tbl-cont3">1080P</td>
                        <td className="magic3d-detail-right-solution magic3d-tbl-cont3"></td>
                      </tr>
                      <tr>
                        <td className="magic3d-detail-right-macbook magic3d-tbl-cont4" width={"42%"}>Time requird for Personal PC</td>
                        <td className="magic3d-detail-right-solution magic3d-tbl-cont4">15mins/50mins</td>
                        <td className="magic3d-detail-right-solution magic3d-tbl-cont4">20mins/30Hours</td>
                        <td className="magic3d-detail-right-solution magic3d-tbl-cont4"></td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
        </Box>
    );
  }