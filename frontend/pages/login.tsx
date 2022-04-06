import type { NextPage } from 'next'
import { NonLoginLayout } from '../componenets'
import { PasswordInput, Input, Button, Group } from '@mantine/core'
import { At } from 'tabler-icons-react';
import { useRouter } from 'next/router';
import { Login } from 'tabler-icons-react';
import { useCookies } from "react-cookie"
import { useEffect } from 'react'

const LoginPage: NextPage = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useCookies(["isLogin"])


  useEffect(() => {
      //auth is initialized and there is no user
      if (isLogin.isLogin!="false") {
        router.push("../inner/dashboard")
      }
  }, [isLogin])

  return (
    <NonLoginLayout>
      <div className="mainHeadermainHeader">
      <div className="logoTextSession"><Login
                size={48}
                color={'white'}
              /><p className="mainHeader"> Login</p></div>
      <Input
      icon={<At />}
      placeholder="Your email"
    />
      <PasswordInput
      placeholder="Password"
      label={<p className="inputLabel">Password</p>}
    />
      <br/>
      <Group position="right" mt="xl">
       <Button color="violet" className="homePageButton" onClick={()=>router.push('/')}>Back</Button>
       {" "}
    <Button color="pink" className="homePageButton" onClick={()=>{ setIsLogin("isLogin", true);}} >Submit</Button>
    </Group>
    </div>
  
    </NonLoginLayout>
  )
}

export default LoginPage
