import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { NonLoginLayout } from '../componenets'
import { useRouter } from 'next/router';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { NumberInput, TextInput, Button, Box, Group, PasswordInput } from '@mantine/core';
import { UserCheck } from 'tabler-icons-react'
import { useCookies } from 'react-cookie'
import { useEffect } from 'react'

const schema = z.object({
  name: z.string().min(2, { message: 'Name should have at least 2 letters' }),
  email: z.string().email({ message: 'Invalid email' }),
  age: z.number().min(18, { message: 'You must be at least 18 to create an account' }),
});


const SignupPage: NextPage = () => {
  const router = useRouter();
  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      name: '',
      email: '',
      age: 18,
    },
  });
  const [isLogin, setIsLogin] = useCookies(["isLogin"])


  useEffect(() => {
      //auth is initialized and there is no user
      if (isLogin.isLogin!="false") {
        router.push("../inner/dashboard")
      }
  }, [isLogin])
  
  return (
    <NonLoginLayout>
       <Box sx={{ maxWidth: 340 }} mx="auto">
       <div className="logoTextSession"><UserCheck
                size={48}
                color={'white'}
              /><p className="mainHeader"> Sign Up</p></div>
      <form onSubmit={form.onSubmit((values: any) => console.log(values))}>
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
    />
          <PasswordInput
      placeholder="Password"
      label={<p className="inputLabel">Confirm Password</p>}
      description="Password must include at least one letter, number and special character"
    />

        <Group position="right" mt="xl">
        <Button color="violet" className="homePageButton" onClick={()=>router.push('/')}>Back</Button>
          <Button color="pink"  type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
    </NonLoginLayout>
  )
}

export default SignupPage
