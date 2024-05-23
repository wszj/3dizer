import {
  Box,
  Flex,
  Avatar,
  Divider,
  Image,
  Text
} from "@chakra-ui/react";
import {
  Outlet,
  useLocation,
  Link
} from "react-router-dom";
import "./account.css";
import useAppData from "../../hooks/useAppData";
import accountBg from "../../assets/images/account/account_bg2.png";
import settingIcon from "../../assets/images/account/setting.png";
import signOutIcon from "../../assets/images/account/sign_out.png";
import pointIcon from "../../assets/images/account/my_point.png";
import pointBg from "../../assets/images/account/point_bg.png";

export default () => {
  const { userInfo, openLogin, isUserLogin, signOut } = useAppData();
  const { pathname } = useLocation()
  const isAccount = pathname === "/account";

  return (
    <Box className="account">
      <Box
        position="absolute"
        left="50%"
        top={isAccount ? "-140px" : "0"}
        transform="translateX(-50%)"
        minWidth="1280px"
        pointerEvents="none"
        width="100vw"
        height="1183px"
        backgroundImage={`url(${isAccount ? accountBg : pointBg})`}
        backgroundRepeat="no-repeat"
        backgroundSize="1920px 1183px"
        backgroundPosition="center top"
      />
      {!isAccount &&<Text className="account-title" backgroundClip="text">3Dizer Credits</Text>}
      <Flex
        w={1280}
        m="0 auto"
        position="relative"
        zIndex={1}
      >
        <div className="account-left">
          <Flex
            onClick={() => !isUserLogin&&openLogin()}
            alignItems="center"
            marginBottom="28px"
            paddingLeft="12px"
          >
            <Avatar src={userInfo?.avatar} marginRight="16px" />
            <p>{isUserLogin ? userInfo?.userEmail??userInfo.email??userInfo?.name : "Sign in"}</p>
          </Flex>
          <Divider marginBottom="50px" orientation="horizontal" borderColor="gray.500"/>
          <Box
            width="340px"
            background="#1838B1"
            borderRadius="23px"
            marginLeft="2px"
            padding="13px 18px 13px 18px"
          >
            <Link to={"/account"} className="account-nav">
              <Image w="25px" mr="19px" src={settingIcon} />
              <Text>Account Settings</Text>
            </Link>
            <Divider orientation="horizontal" borderColor="gray.500"/>
            <Link to={"/account/point"} className="account-nav">
              <Image w="25px" mr="19px" src={pointIcon} />
              <Text>My Points</Text>
            </Link>
            {isUserLogin&&<>
              <Divider orientation="horizontal" borderColor="gray.500"/>
              <Box
                className="account-nav"
                color="red.500"
                onClick={signOut}
              >
                <Image w="25px" mr="19px" src={signOutIcon} />
                <Text>Sign Out</Text>
              </Box>
            </>}
          </Box>
        </div>
        <Box flex={1}>
          <Outlet />
        </Box>
      </Flex>
    </Box>
  )
}