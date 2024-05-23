import { Button} from "@chakra-ui/react";

export default ({
  children,
  icon,
  onClick,
  isDisabled
}:{
  children: React.ReactNode
  icon?: React.ReactElement
  onClick?: () => void
  isDisabled?: boolean
}) => {
  return (
    <Button
      leftIcon={icon}
      variant="outline"
      fontSize="14px"
      fontWeight="normal"
      width="140px"
      onClick={onClick}
      colorScheme="white"
      isDisabled={isDisabled}
    >{children}</Button>
  )
}