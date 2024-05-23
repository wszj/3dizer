import {
  Box,
  Stack,
  FormLabel,
  FormControl,
  FormErrorMessage
} from "@chakra-ui/react";
import { useState } from "react";
import { useToast } from '@chakra-ui/react'
import Button from './button'
import Input from "./input";
import useAppData from "../../hooks/useAppData";
import solanaIcon from "../../assets/images/account/solana.png"
import { MdAdd } from 'react-icons/md'
import Modal from "./modal";
import { validSolanaAddress } from "../../utils/tool";

/**钱包地址验证组件 */
const WalletAddressValid = ({
  disabled,
  setDisabled,
  onOk,
  onCancel
}:{
  disabled: boolean,
  setDisabled: (disabled: boolean) => void,
  onOk: (address:string) => void
  onCancel?: () => void
}) => {

  const { userInfo, isUserLogin } = useAppData();
  // 钱包地址格式验证
  const [ isValid, setIsValid ] = useState(true)
  // 钱包地址
  const [address, setAddress] = useState<string>("")
  // 钱包地址输入框变化
  const addressInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // solana钱包地址格式验证
    setIsValid(validSolanaAddress(value))
    setAddress(value)
  }
  return (
    <FormControl isInvalid={!isValid && !!address}>
      <Input
        value={address}
        isReadOnly={disabled}
        placeholder="Please Enter Wallet Address"
        icon={solanaIcon}
        onChange={addressInputChange}
      />
      <FormErrorMessage position="absolute">Wallet ID Not Recognized - Please Try Again</FormErrorMessage>
      <Box marginTop="20px" textAlign="right">
        {
          disabled ?
            <Button
              icon={<MdAdd />}
              onClick={() => setDisabled(false)}
              isDisabled={!isUserLogin}
            >Add Wallet</Button>
            :
            <Stack direction="row" spacing={4} justifyContent="flex-end">
              <Button onClick={() => {
                if(onCancel){
                  onCancel()
                  return
                }
                setDisabled(true)
                setAddress(userInfo?.walletAddress ?? '')
              }}>Cancel</Button>
              <Button
                onClick={() => onOk(address)}
                isDisabled={!address || !isValid}
              >Connect</Button>
            </Stack>
        }
      </Box>
    </FormControl>
  )
}

export default () => {

  const { userInfo } = useAppData();
  const toast = useToast()
  // 钱包连接状态
  const [connected, setConnected] = useState(false);
  // 输入框是否可编辑
  const [disabled, setDisabled] = useState(true)
  // 是否显示更换钱包弹窗
  const [open, setOpen] = useState(false)

  // 连接钱包
  const connect = () => {
    // 连接钱包逻辑

    toast({
      title: "Wallet is connected",
      status: "success",
      position: "top",
      duration: 5000,
      isClosable: true,
    })
  }
  // 断开钱包连接
  const disconnect = () => {
    // 断开钱包逻辑

    toast({
      title: "Wallet is disconnected",
      status: "error",
      position: "top",
      duration: 5000,
      isClosable: true,
    })
  }
  // 修改钱包地址
  const updateWallet = async (address:string) => {
    // const res = await updateWalletAddress({ address }).catch(() => ({code: 1}))
    // if(res.code === 0){
      toast({
        title: userInfo?.walletAddress ? "Wallet change successfully" : "Wallet added successful",
        status: "success",
        position: "top",
        duration: 5000,
        isClosable: true,
      })
      setDisabled(true)
      if(open) setOpen(false)
      // 更新用户信息

    // }
  }

  return (
    <FormControl>
      <FormLabel fontSize="20px">Solana Wallet</FormLabel>
      {
        userInfo?.walletAddress ?
        <>
          <Input
            value={userInfo?.walletAddress}
            placeholder="Please Enter Wallet Address"
            icon={solanaIcon}
            isReadOnly
          />
          <Stack
            marginTop="20px"
            direction="row"
            spacing={4}
            justifyContent="flex-end"
          >
            <Button onClick={connected ? disconnect : connect}>{connected ? "Disconnect Wallet" : "Connect"}</Button>
            <Button onClick={() => setOpen(true)}>Change Wallet</Button>
          </Stack>
        </>
        :
        <WalletAddressValid
          onOk={updateWallet}
          disabled={disabled}
          setDisabled={setDisabled}
        />
      }
      <Modal
        open={open}
        setOpen={setOpen}
      >
        <WalletAddressValid
          onOk={updateWallet}
          disabled={false}
          setDisabled={setDisabled}
          onCancel={() => setOpen(false)}
        />
      </Modal>
    </FormControl>
  )
}