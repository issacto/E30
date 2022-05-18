import type { NextPage } from 'next'

import Link from 'next/link'
import { Music } from 'tabler-icons-react'
import { useCookies } from 'react-cookie'
import { useEffect, useState } from 'react'

export const LayoutHeader: NextPage = () => {
  const [isLogin, setIsLogin] = useCookies(['isLogin'])

  return (
    <div className="layoutHeader" id="layoutHeader">
      <div>
        <Link href={'../'}>
          <div className="logoTextSession" id="logoTextSession">
            <Music size={48} color={'black'} />
            <p className="bigHeaderP"> MusicRec</p> 
          </div>
        </Link>
      </div>
      <div className="navHeader" id="landingRightTopContainer">
        {isLogin.isLogin == 'false' ? (
          <>
            <Link href={'../about'}>
              <p className="navLinkP" id="navLinkP ">About</p>
            </Link>
            <Link href={'../login'}>
              <p className="navLinkP" id="navLinkP ">Login</p>
            </Link>
            <Link href={'../signup'}>
              <p className="navLinkP" id="navLinkP ">Signup</p>
            </Link>
          </>
        ) : (
          <>
            <Link href={'../inner/dashboard'}>
              <p className="navLinkP">Daily</p>
            </Link>
            <Link href={'../inner/collection'}>
              <p className="navLinkP">Collection</p>
            </Link>
            <p
              className="navLinkP"
              onClick={() => {
                setIsLogin('isLogin', false)
              }}
            >
              Logout
            </p>
          </>
        )}
      </div>
    </div>
  )
}
