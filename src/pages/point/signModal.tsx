import {
  Box,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  Heading,
  Flex,
  Text,
  extendTheme,
  ChakraProvider,
  Image
} from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react'
import { UserPointResult } from "../../interface/account"
import { formatTime } from "../../utils/tool";
import { signIn } from '../../api/account'
import signBg from "../../assets/images/account/sign_bg.png";
import treasureIcon from "../../assets/images/account/treasure.png";
import gemIcon from "../../assets/images/account/gem.png";

const theme = extendTheme({
  colors: {
    customBackground: "#fff",
    // 添加其他自定义颜色
  },
  components: {
    Modal: {
      baseStyle: {
        dialog: {
          bg: "customBackground",
          color: "#000",
        },
      },
    },
  },
})
export default ({
  open,
  setOpen,
  pointData,
  refresh
}:{
  open: boolean
  setOpen: (open: boolean) => void
  pointData: UserPointResult|null
  refresh: Function
}) => {
  // 连续签到奖励
  const dailySignReward = pointData?.dailySignReward??{}
  const toast = useToast()
  // 连续签到次数
  const sign = async () => {
    const res = await signIn()
    if(res.code === 0){
      refresh()
      toast({
        title: "Sign in successfully",
        status: "success",
        position: "top",
        duration: 5000,
        isClosable: true,
      })
    }
  }

  // 今天在数组中的索引
  const todayIndex = Object.keys(dailySignReward).findIndex(v => v === formatTime(new Date().getTime(), 'yyyyMMdd'))
  // 从当前位置往前找第一个为0的索引，为最近一次未签到的日期
  const lastSignInIndex = Object.values(dailySignReward).slice(0, todayIndex).lastIndexOf(0)
  // 除去今天的连续签到天数
  const lastSignInDayNum = todayIndex - 1 - lastSignInIndex
  // 连续签到天数，判断今天是否签到，已签到则+1
  const signInDayNum = lastSignInDayNum + (Object.values(dailySignReward)[todayIndex] === 1 ? 1 : 0)
  // 判断签到是否连续
  const isContinuous = !Object.values(dailySignReward).slice(0, todayIndex).includes(0)

  return (
    <ChakraProvider theme={theme}>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        size='3xl'
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          paddingBottom="30px"
          backgroundImage={`url(${signBg})`}
          backgroundRepeat="no-repeat"
          backgroundSize="100% 100%"
        >
          <ModalHeader
            paddingTop="40px"
            paddingBottom="10px"
            textAlign="center"
            color="#3961FB"
            fontSize="36px"
          >Daily Sign</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading
              size="sm"
              fontWeight="400"
              textAlign="center"
              marginBottom="34px"
            >Signed in for {signInDayNum} consecutive day</Heading>
            <Flex
              width="100%"
              height="120px"
              position="relative"
              justifyContent="space-between"
              alignItems="center"
              marginBottom="45px"
            >
              {Object.keys(dailySignReward).map((v, i) => {
                // 是否是当日，只有当日能点击签到
                const isToday = v === formatTime(new Date().getTime(), 'yyyyMMdd')
                // 是否已签到
                const isSign = dailySignReward[v] === 1
                // 是否最后一天
                const isLastDay = i === 6;
                // 是否获得连续签到的+50积分奖励
                const isContinuousReward = isLastDay && isContinuous
                return (
                  <Flex
                    key={i}
                    width="94px"
                    height="94px"
                    paddingTop="6px"
                    borderRadius="5px"
                    backgroundColor={isSign ? "#3961FB" : isContinuousReward ? "#FFD267" :  "#dadada"}
                    color={isSign ? "#fff" : isContinuousReward ? "#DC0000" : "#000"}
                    marginRight="9px"
                    justifyContent="space-around"
                    alignItems="center"
                    flexDirection="column"
                    fontSize="12px"
                    cursor={isToday ? "pointer" : "default"}
                    onClick={(isToday && !isSign) ? sign : () => {}}
                  >
                    <Text>{isToday ? 'Today' : `Day ${i+1}`}</Text>
                    <Image
                      boxSize={isContinuousReward ? "43px 42px" : "47px 23px"}
                      src={isContinuousReward ? treasureIcon : gemIcon}
                    />
                    <Text fontWeight="500" fontSize="20px">{isContinuousReward ? "+50" : "+10"}</Text>
                  </Flex>
                )
              })}
            </Flex>
            <Box
              fontSize="14px"
              color="#000"
              textAlign="center"
              fontWeight="500"
            >You will be rewarded with 10 points by signing in every day,<br/> and you will be rewarded with 50 points by signing in for 7 consecutive days.</Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  )
}