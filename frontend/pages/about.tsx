import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { NonLoginLayout } from '../componenets'
import { PasswordInput, Input, Button, Group } from '@mantine/core'
import { Home } from 'tabler-icons-react'
import { useRouter } from 'next/router'

const AboutPage: NextPage = () => {
  const router = useRouter()

  return (
    <NonLoginLayout>
      <div className="loginBoard">
        <div className="logoTextSession">
          <Home size={48} color={'white'} />
          <p className="mainHeader"> About</p>
        </div>

        <div>
          <p>What is this website?</p>
          <p>This is the second</p>
          <p>How does it function?</p>
        </div>
      </div>
    </NonLoginLayout>
  )
}

export default AboutPage
