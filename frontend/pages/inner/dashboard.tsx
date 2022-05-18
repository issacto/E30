import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { NonLoginLayout } from '../../componenets'
import { Table } from '@mantine/core'
import { useRouter } from 'next/router'
import { HandLittleFinger, PlaylistAdd } from 'tabler-icons-react'
import { useCookies } from 'react-cookie'
import { useEffect, useState } from 'react'
import {
  getDailyTop,
  DailyTopResponse,
  insertASong,
  SongInsertionInput,
} from '../../componenets'

const DashboardPage: NextPage = () => {
  const router = useRouter()
  const [isLogin, setIsLogin] = useCookies(['isLogin'])
  const [data, setData] = useState<DailyTopResponse | null>()
  const [email, setEmail] = useCookies(['email'])

  useEffect(() => {
    //auth is initialized and there is no user
    if (isLogin.isLogin == 'false') {
      router.push('../')
    }
    async function getData() {
      try {
        const dataResponse: DailyTopResponse = await getDailyTop()
        console.log('123')
        console.log(dataResponse)
        setData(dataResponse)
      } catch (err) {
        console.error(err)
      }
    }
    getData()
  }, [isLogin])

  const handleSubmit = async (data: SongInsertionInput) => {
    console.log(data)
    const response = await insertASong(data)
    window.location.reload()
    if (response.error) {
      alert('Error')
    }
    // else {
    //   setIsLogin('isLogin', true)
    //   router.push('../inner/dashboard')
    // }
  }

  return (
    <NonLoginLayout>
      <div className="logoTextSession">
        <HandLittleFinger size={48} color={'white'} />
        <p className="mainHeader"> Daily Top</p>
      </div>
      {
        <Table>
          <thead>
            <tr>
              <th></th>
              <th>
                <p className="tableHeader">Song Name</p>
              </th>
              <th>
                <p className="tableHeader">Singer</p>
              </th>
              <th>
                <p className="tableHeader">Popularity</p>
              </th>
              <th>
                <p className="tableHeader">Add</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {console.log(data)}{' '}
            {data && data.data
              ? data.data.map((song, i) => (
                  <tr key={song.Name}>
                    <td className="tableField">{i + 1}</td>
                    <td className="tableField">{song.Name}</td>
                    <td className="tableField">{song.Artist}</td>
                    <td className="tableField">{song.Listeners}</td>
                    <td className="tableField">
                      <PlaylistAdd
                        size={24}
                        strokeWidth={2}
                        color={'white'}
                        onClick={() => {
                          handleSubmit({
                            Email: email.email,
                            Song: {
                              Name: song.Name,
                              Artist: song.Artist,
                              Listeners: song.Listeners,
                            },
                          })
                        }}
                      />
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
      }
    </NonLoginLayout>
  )
}

export default DashboardPage
