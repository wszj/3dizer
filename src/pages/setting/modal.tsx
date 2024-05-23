import { 
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalBody,
  Text,
  FormControl,
  FormLabel,
  extendTheme,
  ChakraProvider
} from "@chakra-ui/react";
import Input from "./input";
import solanaIcon from "../../assets/images/account/solana.png"
import useAppData from "../../hooks/useAppData";

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

export default ({
  open,
  setOpen,
  children
}:{
  open: boolean
  setOpen: (open: boolean) => void
  children: React.ReactNode
}) => {

  const { userInfo } = useAppData();

  return (
    <ChakraProvider theme={theme}>
      <Modal
        isOpen={open}
        onClose={() => {}}
        size='3xl'
        isCentered
      >
        <ModalOverlay />
        <ModalContent borderRadius="12px">
          <ModalHeader
            padding="80px 49px 0px"
            fontSize="30px"
            color="white"
          >
            <Text
              background="linear-gradient(-60deg, rgba(196,215,249,0.68) 0%, rgba(182,220,255,0.68) 49.7314453125%, rgba(97,155,235,0.68) 100%);"
              backgroundClip="text"
            >Change Your Solana Wallet</Text>
          </ModalHeader>
          <ModalBody padding="10px 49px" >
            <Text fontSize={14}>Select a new Solana wallet address for your transactions</Text>
            <FormControl marginTop="40px">
              <FormLabel fontSize="20px">Current Wallet</FormLabel>
              <Input
                icon={solanaIcon}
                isReadOnly
                value={userInfo?.walletAddress ?? ''}
              />
            </FormControl>
            <FormControl marginTop="40px">
              <FormLabel fontSize="20px">Connect New Solana Wallet</FormLabel>
              {children}
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  )
}