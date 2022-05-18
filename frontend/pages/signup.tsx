import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { NonLoginLayout } from '../componenets'
import { useRouter } from 'next/router'
import { nullable, z } from 'zod'
import { useForm, zodResolver } from '@mantine/form'
import {
  NumberInput,
  TextInput,
  Button,
  Box,
  Group,
  PasswordInput,
} from '@mantine/core'
import { UserCheck } from 'tabler-icons-react'
import { useCookies } from 'react-cookie'
import { useEffect } from 'react'
import { signUp } from '../componenets'

const schema = z
  .object({
    name: z.string().min(2, { message: 'Name should have at least 2 letters' }),
    email: z.string().email({ message: 'Invalid email' }),
    age: z.number(),
    password: z.string(),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'], // path of error
  })

interface formInput {
  name: string
  email: string
  age: string
  password: string
  confirm: string
}

const SignupPage: NextPage = () => {
  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      name: '',
      email: '',
      age: 18,
      password: '',
      confirm: '',
    },
  })

  const [isLogin, setIsLogin] = useCookies(['isLogin'])
  const [email, setEmail] = useCookies(['email'])
  const router = useRouter()

  useEffect(() => {
    //auth is initialized and there is no user
    if (isLogin.isLogin != 'false') {
      router.push('../inner/dashboard')
    }
  }, [isLogin])

  const handleSubmit = async (data: formInput) => {
    console.log(data)
    const response = await signUp({
      Age: data.age,
      Email: data.email,
      Name: data.name,
      Password: data.password,
    })
    console.log(response)
    if (response.error) {
      alert('This is not working')
    } else {
      // alert("Welcome")
      setIsLogin('isLogin', true)
      setEmail('email', data.email)
      router.push('../inner/dashboard')
    }
  }
  return (
    <NonLoginLayout>
      <Box sx={{ maxWidth: 340 }} mx="auto">
        <div className="logoTextSession">
          <UserCheck size={48} color={'white'} />
          <p className="mainHeader"> Sign Up</p>
        </div>
        <form onSubmit={form.onSubmit((values: any) => handleSubmit(values))}>
          <TextInput
            label={<p className="inputLabel">Email</p>}
            placeholder="example@mail.com"
            {...form.getInputProps('email')}
          />
          <TextInput
            label={<p className="inputLabel">Name</p>}
            placeholder="John Doe"
            mt="sm"
            {...form.getInputProps('name')}
          />
          <NumberInput
            label={<p className="inputLabel">Age</p>}
            placeholder="Your age"
            mt="sm"
            {...form.getInputProps('age')}
          />
          <PasswordInput
            placeholder="Password"
            label={<p className="inputLabel">Password</p>}
            description="Password must include at least one letter, number and special character"
            {...form.getInputProps('password')}
          />
          <PasswordInput
            placeholder="Password"
            label={<p className="inputLabel">Confirm Password</p>}
            description="Password must include at least one letter, number and special character"
            {...form.getInputProps('confirm')}
          />

          <Group position="right" mt="xl">
            <Button
              color="violet"
              className="homePageButton"
              onClick={() => router.push('/')}
            >
              Back
            </Button>
            <Button color="pink" type="submit">
              Submit
            </Button>
          </Group>
        </form>
      </Box>
    </NonLoginLayout>
  )
}

export default SignupPage
