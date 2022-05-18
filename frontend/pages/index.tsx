import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { NonLoginLayout } from '../componenets'
import { Button } from '@mantine/core'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const router = useRouter()

  return (
    <NonLoginLayout>
      <div
        id="landingContainer"
        style={{ position: 'relative', width: '100%', paddingBottom: '40%' }}
      >
        <Image
          alt="Image Alt"
          src="/landingImage.jpg"
          layout="fill"
          id="landingImage"
          objectFit="contain" // Scale your image down to fit into the container
        />
        <p
          style={{
            position: 'absolute',
            top: '45%',
            right: '23%',
            color: 'white',
            fontSize: '3vh',
          }}
          id="title"
        >
          Discover daily popular songs in the world!
        </p>
        <div
          style={{
            position: 'absolute',
            top: '60%',
            right: '27%',
            display: 'flex',
            flexDirection: 'row',
          }}
          id="landingButtonsContainer"
        >
          <Button
            style={{ color: 'white' }}
            color="violet"
            className="homePageButton"
            onClick={() => router.push('/signup')}
          >
            Signup
          </Button>
          <Button
            style={{ color: 'white', marginLeft: '2%' }}
            color="pink"
            className="homePageButton"
            onClick={() => router.push('/login')}
          >
            Login
          </Button>
        </div>
      </div>
    </NonLoginLayout>
  )
}

export default Home
