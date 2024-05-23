import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Flex,
  Image,
  Text,
  extendTheme,
  ChakraProvider
} from "@chakra-ui/react";
import { MdContentCopy } from 'react-icons/md'
import { useToast } from '@chakra-ui/react'
import logoIcon from "../../assets/images/header/logo.png";
import { UserPointResult } from "../../interface/account";
import inviteBg from "../../assets/images/account/invite_bg.png";
import { useLocation } from "react-router-dom";

const theme = extendTheme({
  colors: {
    customBackground: "#000",
    // 添加其他自定义颜色
  },
  components: {
    Modal: {
      baseStyle: {
        dialog: {
          bg: "customBackground",
          color: "#fff",
        },
      },
    },
  },
})

const Copy = ({
  title,
  code
}: {
  title?: string
  code?: string
}) => {

  const toast = useToast()
  // 复制
  const copy = () => {
    if (!code) return
    navigator.clipboard.writeText(code)
    toast({
      title: "Copy successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
  }
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      bgColor="#565656"
      borderRadius="10px"
      height="46px"
      fontSize="12px"
      padding="0 20px"
      marginBottom="30px"
    >
      <Text
        color="#fefefe"
        whiteSpace="nowrap"
      >{title}</Text>
      <Flex
        alignItems="center"
        fontSize="12px"
        cursor="pointer"
        fontWeight="500"
        onClick={copy}
      >
        <Text
          marginRight="10px"
          maxWidth="280px"
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          color="#000"
          fontWeight="500"
        >{code}</Text>
        <MdContentCopy />
      </Flex>
    </Flex>
  )
}

export default ({
  open,
  setOpen,
  pointData
}: {
  open: boolean
  setOpen: (open: boolean) => void
  pointData: UserPointResult | null
}) => {
  return (
    <ChakraProvider theme={theme}>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        size='lg'
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          backgroundImage={`url(${inviteBg})`}
          backgroundRepeat="no-repeat"
          backgroundSize="100% 100%"
        >
          <ModalCloseButton />
          <ModalBody padding="20px 43px">
            <Image
              src={logoIcon}
              width="110px"
              marginBottom="40px"
            />
            <Box
              fontSize="14px"
              color="white"
              marginBottom="30px"
            >Invite Friends And Earn More Reward Points</Box>
            <Copy title="Referrals Code" code={pointData?.invitationCode} />
            <Copy title="Referrals Link" code={window.location.origin + `?invitationCode=${pointData?.invitationCode}`} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  )
}