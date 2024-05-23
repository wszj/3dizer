import {
  Box,
  Flex,
  Text,
  Image
} from "@chakra-ui/react";
import "./point.css";
import infoIcon from "../../assets/images/account/info.png";
import kingIcon from "../../assets/images/account/king.png";
import Earn from "./earn";
import PointDetails from "./pointDetails";
import { getUserPointInfo } from "../../api/account"
import { UserPointResult } from "../../interface/account"
import { useState, useLayoutEffect, useEffect, useRef } from 'react'
import useAppData from "../../hooks/useAppData";
import CountUp from 'react-countup';
const Title = ({
  text
}:{
  text: string
}) => {
  return (
    <Box
      textAlign="center"
      marginBottom="30px"
      paddingTop="30px"
    >
      <Box
        background="linear-gradient(-60deg, rgba(255,255,255,1) 0%, rgba(182,220,255,1) 50%, rgba(97,155,235,1) 100%)"
        backgroundClip="text"
        fontSize="20px"
        display="inline-block"
        fontWeight="500"
      >
       
        {text}
      </Box>
    </Box>
  )
}

export default () => {

  const [data, setData] = useState<UserPointResult|null>(null)
  const { isUserLogin } = useAppData()
  const tableRef = useRef<{refresh: Function, clearData: Function}>()

  useLayoutEffect(() => {
    isUserLogin && getData()
  }, [])
  useEffect(() => {
    if(isUserLogin){
      refresh()
    }else{
      setData(null)
      tableRef.current?.clearData()
    }
  }, [isUserLogin])

  const getData = async () => {
    const res = await getUserPointInfo()
    if(res.code === 0){
      setData(res.data)
    }
  }
  // 刷新页面数据
  const refresh = () => {
    getData()
    tableRef.current?.refresh()
  }

  return (
    <Box className="point">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        marginBottom="50px"
      >
        <Flex
          alignItems="center"
          height="88px"
          padding="0 35px"
          backgroundColor="#3961FB"
          borderRadius="20px"
          width='380px'
        >
          <Flex
            width="55px"
            height="55px"
            backgroundColor="white"
            borderRadius="50%"
            justifyContent="center"
            alignItems="center"
            marginRight="26px"
          >
            <Image width="34px" src={kingIcon} />
          </Flex>
          <Text fontSize="18px" mr="27px" whiteSpace="nowrap">My points:</Text>
          <Text fontSize="54px" fontWeight="500">
            <CountUp start={0} end={data?.totalPoints??0}></CountUp>
          </Text>
        </Flex>
        <Flex>
          <Image marginRight="10px" boxSize="20px" src={infoIcon} />
          <Text fontSize={14}>What Is 3Dizer Credits?</Text>
        </Flex>
      </Flex>
      <Title text="Earn Points" />
      <Earn pointData={data} refresh={refresh} />
      <Title text="Points Details" />
      <PointDetails ref={(node: {refresh:Function, clearData: Function}) => tableRef.current = node} />
    </Box>
  )
}