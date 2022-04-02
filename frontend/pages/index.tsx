import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { NonLoginLayout } from '../componenets'
import { Button } from '@mantine/core';
import { useRouter } from 'next/router';



const Home: NextPage = () => {
  const router = useRouter();

  return (
    <NonLoginLayout>
      <Button className="homePageButton" onClick={()=>router.push('/login')}>Login</Button>
      <Button className="homePageButton" onClick={()=>router.push('/signup')}>Signup</Button>
    </NonLoginLayout>
  )
}

export default Home
