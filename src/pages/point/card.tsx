import {
  Box,
  Flex,
  Text,
  Heading,
  Button
} from "@chakra-ui/react";
import useAppData from "../../hooks/useAppData";

export default ({
  title,
  desc,
  buttonText,
  finish,
  onClick,
  customButton,
  comingSoon
}:{
  title: string
  desc: string
  buttonText?: string
  // 任务完成状态，为true时不能点击且显示为灰色
  finish?: boolean
  onClick?: () => void
  /**完全自定义Button部分的行为，buttonText和onClick不生效 */
  customButton?: React.ReactNode
  /**显示敬请期待按钮 */
  comingSoon?: boolean
}) => {

  const { openLogin, isUserLogin } = useAppData();

  // 已登录且任务已完成禁用按钮
  const disabled = !!(isUserLogin && finish)
  let style = comingSoon ? {
    bgColor: "transparent",
    color: "#b5b5b5",
    borderColor: "#494d5e",
    variant: 'outline',
    _hover: {cursor: "default", bgColor: "transparent" }
  } : (disabled ? {
    bgColor: "gray.300",
    color: "gray.500",
    _hover: {cursor: "default"}
  } : {
    bgColor: "#3961FB",
    color: "white",
    _hover: {bgColor: "#3153d6" }
  })
  return (
    <Flex
      display="inline-flex"
      width="250px"
      height="190px"
      border="1px solid #494d5e"
      borderRadius="20px"
      padding="20px"
      flexDirection="column"
      justifyContent="space-between"
    >
      <div>
        <Heading size="sm" marginBottom="10px">{title}</Heading>
        <Text fontSize="12px" color="#b5b5b5">{desc}</Text>
      </div>
      <Box>{customButton??<Button
        height="28px"
        borderRadius="7px"
        fontSize="14px"
        {...style}
        onClick={isUserLogin ? onClick : openLogin}
      >{comingSoon ? "Coming Soon" : isUserLogin ? buttonText : "Sign In"}</Button>}</Box>
    </Flex>
  )
}
