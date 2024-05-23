import {
    Box,
    Text,
    VStack,
} from "@chakra-ui/react";

import "./magic3d.css";


export default function Magic3D() {
    return (
        <Box className="magic3d">   
            <div className="inner">
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

                <div className="detail">
                    <div className="detail-left">
                        <div className="detail-left-title">How to use?</div>
                        <div className="detail-left-content">
                            <ul>
                                <li>
                                    <div>Step 1:</div>
                                    <div>
                                        Download Magic3D(Mac or Windows version)
                                    </div>
                                </li>
                                <li>
                                    <div>Step 2:</div>
                                    <div>
                                        Install and run the executable file to convert the 2D file to 3D file
                                    </div>
                                </li>
                                <li>
                                    <div>Step 3:</div>
                                    <div>
                                        Use "Magic3DPlayer" to open the video that is sucessfull 
                                        converted from "Magic3D". Click "Start Glasses" on the 
                                        "Magic3DPlayer" interface. You can enjoy the viewing experience
                                        of any 3D source(* Support to play 3D videos in ".mp4", ".avi",
                                        ".MKV",".mov",".wmv" format)
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="detail-right">
                        <div className="detail-right-info">
                            <Text
                                bgGradient='linear(to-r, #619BEB, #FFFFFF)'
                                bgClip='text'
                                // fontSize='6xl'
                                // fontWeight='extrabold'
                            >
                                Macbook-M1(8G)
                            </Text>
                            <Text
                                bgGradient='linear(to-r, #619BEB, #FFFFFF)'
                                bgClip='text'
                                // fontSize='6xl'
                                // fontWeight='extrabold'
                            >
                                3Dizer DePIN Network(18%-35%)
                            </Text>
                        </div>

                        <div className="detail-right-duration">Duration</div>
                        <div className="detail-right-duration-cont">
                            <table width="100%" border={0} cellSpacing={0} cellPadding={2}>
                                <tbody>
                                    <tr>
                                        <td rowSpan={4}>Resolution</td>
                                        <td>5 mins</td>
                                        <td>25 mins</td>
                                    </tr>
                                    <tr>
                                        <td>720P</td>
                                        <td>720P</td>
                                    </tr>
                                    <tr>
                                        <td>1080P</td>
                                        <td>1080P</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>1920P</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="detail-right-require">Time required for Personal PC</div>
                        <div className="detail-right-require-cont">
                            <table width="100%" border={0} cellSpacing={0} cellPadding={2}>
                                <tbody>
                                    <tr>
                                        <td rowSpan={4}>Resolution</td>
                                        <td>15mins/50mins</td>
                                        <td>720P</td>
                                    </tr>
                                    <tr>
                                        <td>15mins/3Hours</td>
                                        <td>1280P</td>
                                    </tr>
                                    <tr>
                                        <td>3.5Hours</td>
                                        <td>1920P</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="detail-right-desc">
                            Magic3D uses AI technology to shorten the conversion time and improve the
                            <br />
                            conversion quality. and is expected to increase computing power by 18% to
                            <br />
                            35% in the future.
                        </div>
                    </div>
                </div>

                <div className='magic3d-download'>
                    <a href="">Download</a>
                </div>
            </div> 
        </Box>
    );
  }