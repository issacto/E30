import type { NextPage } from 'next'
import { NonLoginLayout, signIn } from '../componenets'
import { PasswordInput, Input, Button, Group } from '@mantine/core'
import { At } from 'tabler-icons-react'
import { useRouter } from 'next/router'
import { Login } from 'tabler-icons-react'
import { useCookies } from 'react-cookie'
import { useEffect } from 'react'
import { SignInInput } from '../componenets'
import { useForm } from '@mantine/form'

const LoginPage: NextPage = () => {
  const router = useRouter()
  const [isLogin, setIsLogin] = useCookies(['isLogin'])
  const [email, setEmail] = useCookies(['email'])
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })

  interface formInput {
    email: string
    password: string
  }

  useEffect(() => {
    //auth is initialized and there is no user
    if (isLogin.isLogin != 'false') {
      router.push('../inner/dashboard')
    }
  }, [isLogin])

  const handleSubmit = async (data: formInput) => {
    console.log(data)
    const response = await signIn({
      Email: data.email,
      Password: data.password,
    })
    console.log(response)
    if (response.error) {
      alert('This is not working')
    } else {
      setIsLogin('isLogin', true)
      setEmail('email', data.email)
      router.push('../inner/dashboard')
    }
  }

  return (
    <NonLoginLayout>
      <div className="mainHeadermainHeader">
        <div className="logoTextSession">
          <Login size={48} color={'white'} />
          <p className="mainHeader"> Login</p>
        </div>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Input
            icon={<At />}
            placeholder="Your email"
            {...form.getInputProps('email')}
          />

          <PasswordInput
            placeholder="Password"
            label={<p className="inputLabel">Password</p>}
            {...form.getInputProps('password')}
          />
          <br />
          <Group position="right" mt="xl">
            <Button
              color="violet"
              className="homePageButton"
              onClick={() => router.push('/')}
            >
              Back
            </Button>{' '}
            <Button color="pink" className="homePageButton" type="submit">
              Submit
            </Button>
          </Group>
        </form>
      </div>
    </NonLoginLayout>
  )
}

export default LoginPage
