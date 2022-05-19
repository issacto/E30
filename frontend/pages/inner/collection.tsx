import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { NonLoginLayout } from '../../componenets'
import { Table } from '@mantine/core'
import { useRouter } from 'next/router'
import { HandLittleFinger, DatabaseOff } from 'tabler-icons-react'
import { useCookies } from 'react-cookie'
import { useEffect, useState } from 'react'
import { getCollection, CollectionResponse, deleteASong, SongDeletionInput } from '../../componenets'

const DashboardPage: NextPage = () => {
  const router = useRouter()
  const [isLogin, setIsLogin] = useCookies(['isLogin'])
  const [email, setEmail] = useCookies(['email'])
  const [data, setData] = useState<CollectionResponse | null>()

  useEffect(() => {
    //auth is initialized and there is no user
    if (isLogin.isLogin == 'false') {
      router.push('../')
    }
    async function getData() {
      const reponseData: CollectionResponse = await getCollection({
        Email: email.email,
      })
      setData(reponseData)
      console.log(reponseData)
    }
    getData()
  }, [isLogin])


  const handleSubmit = async (data: SongDeletionInput) => {
    console.log(data)
    const response = await deleteASong(data)
    if (response.error) {
      alert('Error')
    }
    window.location.reload()
  }


  return (
    <NonLoginLayout>
      <div className="logoTextSession">
        <HandLittleFinger size={48} color={'white'} />
        <p className="mainHeader"> Your Collection</p>
      </div>
      {data && data.data ? (
        <Table>
          <thead>
            <tr>
              <th></th>
              <th>
                <p className="tableHeader">Song Name</p>
              </th>
              <th>
                <p className="tableHeader">Author</p>
              </th>
              <th>
                <p className="tableHeader">Date</p>
              </th>
              <th>
                <p className="tableHeader">Delete</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((song, i) => (
              <tr key={i}>
                <td className="tableField">{i + 1}</td>
                <td className="tableField">{song.Name}</td>
                <td className="tableField">{song.Artist}</td>
                <td className="tableField">{song.Date}</td>
                <td className="tableField">
                  <DatabaseOff
                    size={24}
                    strokeWidth={2}
                    color={'white'}
                    onClick={()=>{
                      handleSubmit({Email:email.email, Name: song.Name, Date: song.Date})
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div>No data available</div>
      )}
    </NonLoginLayout>
  )
}

export default DashboardPage
