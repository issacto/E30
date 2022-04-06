import type { NextPage } from 'next'

import Link from "next/link";
import { Music } from 'tabler-icons-react';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';

export const LayoutHeader : NextPage = () => {
    const [isLogin, setIsLogin] = useCookies(["isLogin"])


    return (
      <div className='layoutHeader'>
        <div><Link href={"../"}>
            <div className="logoTextSession"><Music
                size={48}
                color={'black'}
              /><p className="bigHeaderP"> MusicRec</p></div>
              </Link></div>
        <div className="navHeader">
              {isLogin.isLogin=="false"?<>
                <Link href={"../about"}>
                <p className="navLinkP">About</p>
              </Link>
              <Link href={"../login"}>
                <p className="navLinkP">Login</p>
              </Link>
              <Link href={"../signup"}>
                <p className="navLinkP">Signup</p>
              </Link></>:
              <>
              <Link href={"../inner/dashboard"}>
              <p className="navLinkP">Daily</p>
            </Link>
            <Link href={"../inner/collection"}>
              <p className="navLinkP">Collection</p>
            </Link>
              <p className="navLinkP" onClick={ ()=>{ console.log("hi");  setIsLogin("isLogin", false); console.log(isLogin)}}>Logout</p>
        </>}
        </div>
      </div>
    )
  }