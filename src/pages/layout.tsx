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
import { useState,useEffect } from "react";

import { Outlet } from "react-router-dom";

import Nav from './nav/index'
import Footer from './footer'
import Login from '../component/Login'
import { MainMenu } from "../utils/types";
import "./layout.css";
import { AppContext } from "../hooks/useAppData"
import { useSelector, useDispatch } from 'react-redux';
import { updateLogin ,updateToken} from '../stores/userSlice'

export default function Layout() {
  const [currMainMenu, setCurrMainMenu] = useState(MainMenu.Home);
  const [visible,setVisible] = useState(false)
  const dispatch = useDispatch();
  const [isLogin,setLogin] = useState(JSON.parse(sessionStorage.getItem('login')||'false'))
  const handleClick = (customParameter: any) => {
    setVisible(customParameter)
  
  }

  // const { value } = useSelector((state:any) => state.counter);
  // const { name, email,isUserLogin } = useSelector((state:any) => state.user);
  // const dispatch = useDispatch();
  // console.log(value,name,isUserLogin,'email=====>')
 
  console.log(isLogin,'isLogin===>3223')
  const handleCloseClick = (visibleType: any,isLoginState:any) => {
    // let login = JSON.parse(sessionStorage.getItem('login')||'false')
    console.log(isLoginState,'login===>isLoginState')
    setLogin(isLoginState)
    setVisible(visibleType)
  
  }
  // 打开登录弹窗
  const openLogin = () => {
    setVisible(true)
  }
  // 退出登录
  const signOut = () => {
    dispatch(updateLogin(false))
    dispatch(updateToken(''))
    sessionStorage.setItem('login','false')
    sessionStorage.setItem('token','')
  }

  return (
    <ChakraProvider theme={theme}>
      <div className="app">
      <AppContext.Provider value={{ openLogin, signOut }}>
        <Box className="content" textAlign="center" fontSize="xl">
          <Nav onClick={handleClick} loginType={isLogin}/>
          <Outlet />
          <Footer />
          <Login visible={visible} onClick={handleCloseClick}/>
        </Box>
      </AppContext.Provider>
      </div>
    </ChakraProvider>
  );
}