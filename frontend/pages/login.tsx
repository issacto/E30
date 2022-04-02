import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { NonLoginLayout } from '../componenets'
import { PasswordInput, Input, Button } from '@mantine/core'
import { At } from 'tabler-icons-react';
import { useRouter } from 'next/router';


const LoginPage: NextPage = () => {
  const router = useRouter();

  return (
    <NonLoginLayout>
      Login
      <Input
      icon={<At />}
      placeholder="Your email"
    />
      <PasswordInput
      placeholder="Password"
      label="Password"
      description="Password must include at least one letter, number and special character"
      required
    />
       <Button className="homePageButton" onClick={()=>router.push('/')}>Back</Button>
    <Button className="homePageButton" >Submit</Button>
    </NonLoginLayout>
  )
}

export default LoginPage
