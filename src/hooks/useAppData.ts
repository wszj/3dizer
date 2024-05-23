import { createContext, useContext } from "react"
import { useSelector } from 'react-redux'
import { UserInfo } from "../interface"

export interface AppData{
  openLogin: () => void
  signOut: () => void
}

export const AppContext = createContext<AppData>({
  openLogin: () => {},
  signOut: () => {},
})

export default () => {
  const { openLogin, signOut } = useContext(AppContext)
  const userInfo:UserInfo = useSelector((state:any) => state.user)
  const isUserLogin = userInfo.isUserLogin
  return { userInfo, isUserLogin, openLogin, signOut }
}