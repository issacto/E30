import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { NonLoginLayout } from '../../componenets'
import { Table } from '@mantine/core';
import { useRouter } from 'next/router';
import { HandLittleFinger,DatabaseOff } from 'tabler-icons-react';
import { useCookies } from 'react-cookie'
import { useEffect } from 'react'

const DashboardPage: NextPage = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useCookies(["isLogin"])


  useEffect(() => {
      //auth is initialized and there is no user
      if (isLogin.isLogin=="false") {
        router.push("../")
      }
  }, [isLogin])

  const elements = [
    { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
    { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
    { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
    { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
  ];

  const rows = elements.map((element,i) => (
    <tr key={element.name}>
      <td className="tableField">{i+1}</td>
      <td className="tableField">{element.position}</td>
      <td className="tableField">{element.name}</td>
      <td className="tableField">{element.symbol}</td>
      <td className="tableField"><DatabaseOff
    size={24}
    strokeWidth={2}
    color={'white'}
  /></td>
    </tr>
  ));


  return (
    <NonLoginLayout>
       <div className="logoTextSession"><HandLittleFinger
                size={48}
                color={'white'}
              /><p className="mainHeader"> {" "}Your Collection</p></div>
    {
       <Table>
       <thead>
         <tr>
           <th></th>
           <th ><p className="tableHeader">Song Name</p></th>
           <th ><p className="tableHeader">Author</p></th>
           <th ><p className="tableHeader">Date</p></th>
           <th ><p className="tableHeader">Delete</p></th>

         </tr>
       </thead>
       <tbody>{rows}</tbody>
     </Table>

    }
    </NonLoginLayout>
  )
}

export default DashboardPage
