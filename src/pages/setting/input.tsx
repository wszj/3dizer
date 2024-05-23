import {
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  Image
} from "@chakra-ui/react";

export default ({
  value,
  onChange,
  icon,
  ...arg
}:InputProps&{icon:string}) => {
  return (
    <InputGroup size="lg">
      <InputLeftElement
        pointerEvents='none'
        children={<Image boxSize="20px" src={icon} />}
      />
      <Input
        value={value}
        onChange={onChange}
        fontSize="16px"
        colorScheme="white"
        variant="solid"
        height="50px"
        color="#000"
        {...arg}
      />
    </InputGroup>
  )
}