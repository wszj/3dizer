import {
  Grid,
  Image,
  Stack
} from "@chakra-ui/react";
import Card from "./card";
import { Link } from "react-router-dom";
import telegramIcon from "../../assets/images/account/telegram.png"
import twitterIcon from "../../assets/images/account/twitter.png"
import discordIcon from "../../assets/images/account/discord.png"
import SignModal from "./signModal";
import Invite from './invite'
import { useState } from "react";
import { UserPointResult } from "../../interface/account"

export default ({
  pointData,
  refresh
}:{
  pointData: UserPointResult|null,
  refresh: Function
}) => {

  const [openSign, setOpenSign] = useState(false);
  const [openInvite, setOpenInvite] = useState(false);

  const cards = [{
    title: "Sign Up Reward",
    desc: "Complete the 3Dizer account registration and get 500 points as reward",
    buttonText: "Acquired",
    finish: true
  }, {
    title: "Daily Sign",
    desc: "Sign in continuously to get more points",
    buttonText: "Sign In",
    onClick: () => setOpenSign(true)
  }, {
    title: "Invite Friends",
    desc: "Invite Friends And Earn More Reward Points",
    buttonText: "Invite",
    onClick: () => setOpenInvite(true)
  }, {
    title: "Download Magic3D",
    desc: "Download Magic3D for the first time and you will get 10 points as reward",
    comingSoon: true
  }, {
    title: "Creative reward",
    desc: "Use Magic3D to create and get reward points",
    comingSoon: true
  }, {
    title: "Join Community",
    desc: "Join the 3Dizer community to earn points",
    customButton: <Stack direction="row" spacing={4}>
      <Link to="https://twitter.com/3DizerNetwork" target="_blank"><Image boxSize="34px" src={twitterIcon} /></Link>
      <Link to="https://discord.com/invite/Dn8EZqyq2S" target="_blank"><Image boxSize="34px" src={discordIcon} /></Link>
      <Link to="https://t.me/+OYPFYyswM5NjMmI1" target="_blank"><Image boxSize="34px" src={telegramIcon} /></Link>
    </Stack>
  }]

  return (
    <>
      <Grid
        gridTemplateColumns="1fr 1fr 1fr"
        gap="10px"
      >{cards.map(v => {
        return <Card {...v} key={v.title} />
      })}</Grid>
      <SignModal
        pointData={pointData}
        open={openSign}
        setOpen={setOpenSign}
        refresh={refresh}
      />
      <Invite pointData={pointData} open={openInvite} setOpen={setOpenInvite} />
    </>
  )
}