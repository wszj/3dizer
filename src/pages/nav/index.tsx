import {
    Box,
    useToast,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    Image,
    Text,
    Flex,
    Center
} from "@chakra-ui/react";
import { Outlet, Link, useLocation } from "react-router-dom";

import Logo from "../../assets/images/header/logo.png";
import personal from "../../assets/images/header/personal.png";
import settings from "../../assets/images/header/settings.png";
import points from "../../assets/images/header/points.png";
import React, {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateLogin ,updateToken} from '../../stores/userSlice'
import useAppData from "../../hooks/useAppData";
import "./nav.css";

// 子组件
interface ChildProps {
loginType:Boolean;
onClick: (type:any) => void;
}

const Index: React.FC<ChildProps> = ({loginType,onClick})=>{

    const toast = useToast()

    const location = useLocation();
    const navigate = useNavigate();
    const { signOut } = useAppData();
    const [isOpen,setIsopen] = useState(false)
    const { value } = useSelector((state:any) => state.counter);
    const { name, email,isUserLogin,token,userEmail } = useSelector((state:any) => state.user);
    const dispatch = useDispatch();
    console.log(value,name,isUserLogin,token,userEmail,'email=====>')

    const loginHandle = ()=>{
      console.log('onClick')
      onClick(true);
    }
  
    const [isLogin, setIsLogin] = useState(isUserLogin)
    const singOutHandle = () => {
        setIsLogin(false)
        signOut()
        navigate('/')
    }
    
    const personalHandle = () => {
        navigate('/account')
        setIsopen(false)
    }
    const toMyPoints = () => {
      navigate('/account/point')
      setIsopen(false)

    }
    const onClose = ()=>{
        setIsopen(false)
    }
    const onOpen = ()=>{
        setIsopen(true)
    }
    return (
        <Box className="header">
            <div className="logo">
                <Link to="/"><img src={Logo}></img></Link>
            </div>
            <nav className="menu">
                <ul className="nav">
                    <li><Link className={location.pathname === '/' ? 'active' : ''} to="/">Home</Link></li>
                    <li><Link className={location.pathname === '/magicbrush' ? 'active' : ''} to="magicbrush">MagicBrush</Link></li>
                    <li><Link className={location.pathname === '/magic3d' ? 'active' : ''} to="magic3d">Magic3D</Link></li>
                    <li><Link className={location.pathname === '/defi' ? 'active' : ''} to="defi">Defi</Link></li>
                </ul>
                { !isUserLogin ? <div className="login" onClick={loginHandle}>
                  登录 / 注册
                </div>:
                <div className="login-box">
                <Popover  
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                >
                    <PopoverTrigger>
                       <div className="login-img"></div>
                    </PopoverTrigger>
                    <PopoverContent  width='340px'>
                        <PopoverArrow />
                        <PopoverCloseButton />
                      
                        <PopoverBody p="26px">
                            <Flex color="#000" className="login-title" alignItems="center">
                                <Image
                                    src={personal}
                                    alt='personal'
                                    boxSize="40px"
                                    cursor='pointer'
                                />
                                <Text ml="16px;" color="#6A6A6A">{ userEmail }</Text>
                            </Flex>
                            <Flex color="#000"  alignItems="center" mt="16px" pl="30px" cursor="pointer" borderBottom="1px" borderColor="gray" pb="16px" onClick={personalHandle}>
                                <Image
                                    src={settings}
                                    alt='settings'
                                   
                                    cursor='pointer'
                                />
                              <Text ml="16px;"> Account Settings</Text>
                            </Flex>
                            <Flex color="#000"  alignItems="center" pl="30px"  mt="16px" cursor="pointer" borderBottom="1px" borderColor="gray"  pb="16px"  onClick={toMyPoints}>
                            <Image
                                    src={points}
                                    alt='points'
                                    cursor='pointer'
                                />
                                <Text ml="16px;">My Points</Text>
                            </Flex>
                            <Center color="#AAAAAA"  alignItems="center" cursor="pointer" mt="16px" onClick={singOutHandle}>
                            Sign out
                            </Center>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
                </div>
                }
            </nav>
           
        </Box>
    );
}
export default Index;