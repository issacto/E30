import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { NonLoginLayout } from '../componenets'
import { useRouter } from 'next/router';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { NumberInput, TextInput, Button, Box, Group } from '@mantine/core';




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
  return (
    <NonLoginLayout>
       <Box sx={{ maxWidth: 340 }} mx="auto">
      <form onSubmit={form.onSubmit((values: any) => console.log(values))}>
        <TextInput
          required
          label="Email"
          placeholder="example@mail.com"
          {...form.getInputProps('email')}
        />
        <TextInput
          required
          label="Name"
          placeholder="John Doe"
          mt="sm"
          {...form.getInputProps('name')}
        />
        <NumberInput
          required
          label="Age"
          placeholder="Your age"
          mt="sm"
          {...form.getInputProps('age')}
        />

        <Group position="right" mt="xl">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
    </NonLoginLayout>
  )
}

export default SignupPage
