import {
  Box,
  FormLabel,
  FormControl,
  Stack
} from "@chakra-ui/react";
import { useEffect, useState } from "react"
import Input from "./input";
import Wallet from "./wallet";
import Button from "./button"
import useAppData from "../../hooks/useAppData";
import "./setting.css";
import { getFollowAccountInfo, setFollowAccountInfo } from "../../api/account";
import { FollowAccountList, FollowAccountType, followAccountIcon } from "../../interface/account";

type FollowAccountName = {
  [key in FollowAccountType]?: string
}

export default () => {

  const { isUserLogin } = useAppData();
  const [ isEdit, setIsEdit ] = useState(false)
  const [ data, setData ] = useState<FollowAccountList>([])
  // 输入框中的用户名，取消时将值重置为原始值data
  const [ names, setNames ] = useState<FollowAccountName>({})

  useEffect(() => {
    if(isUserLogin){
      getData()
    }else{
      setIsEdit(false)
      setData([])
      setNames({})
    }
  }, [isUserLogin])

  const getData = async () => {
    const res = await getFollowAccountInfo()
    if(res.code === 0){
      setData(res.data.followAccountList)
      setNames(res.data.followAccountList.reduce((pre:FollowAccountName, cur) => {
        pre[cur.type] = cur.userName
        return pre
      }, {}))
    }
  }
  // 保存修改信息
  const save = async () => {
    const res = await setFollowAccountInfo({
      followAccountList: Object.entries(names).map(([k, v]) => ({ type: Number(k), userName: v }))
    })
    if(res.code === 0){
      setIsEdit(false)
      getData()
    }
  }
  const onCancel = () => {
    setIsEdit(false)
    setNames(data.reduce((pre:FollowAccountName, cur) => {
      pre[cur.type] = cur.userName
      return pre
    }, {}))
  }
  return (
    <Box className="setting">
      <Wallet />
      <Box marginTop="60px">
        <FormControl>
          <FormLabel fontSize="20px">The Following Information</FormLabel>
          {data.map((v, i) => {
            return <Input
              key={v.type}
              value={names[v.type]}
              placeholder={`Please Enter ${FollowAccountType[v.type]} Username`}
              icon={followAccountIcon[v.type]}
              marginBottom="20px"
              isReadOnly={!isEdit}
              onChange={e => setNames({...names, [v.type]: e.target.value})}
            />
          })}
          <Box marginTop="20px" textAlign="right">{
            isEdit ? 
            <Stack
              marginTop="20px"
              direction="row"
              spacing={4}
              justifyContent="flex-end"
            >
              <Button onClick={onCancel}>Cancel</Button>
              <Button isDisabled={!Object.values(names).some(v => !!v)} onClick={save}>Save</Button>
            </Stack>
            :
            <Button
              isDisabled={!isUserLogin}
              onClick={() => setIsEdit(true)}
            >Edit</Button>
          }</Box>
        </FormControl>
      </Box>
    </Box>
  )
}