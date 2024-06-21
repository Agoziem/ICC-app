"use client";
import PageTitle from '@/components/PageTitle/PageTitle'
import Link from 'next/link'
import React, { useContext } from 'react'
import { IoChatbubbleEllipsesOutline, IoLogoWhatsapp } from 'react-icons/io5'
import { OrganizationContext } from "@/data/Organizationalcontextdata";

const ChatRoom = () => {
  const { OrganizationData } = useContext(OrganizationContext);

  return (
    <div style={{minHeight:"100vh"}}>
      <PageTitle pathname="Chat Room" />
      <div className='d-flex justify-content-center'>
        <div className='mt-5 text-center'>
          <h4>Chat Room</h4>
          <IoChatbubbleEllipsesOutline className='mt-2' style={{
            fontSize: '6rem',
            color: 'var(--bgDarkerColor)'
          }} />
          <p className='mt-3 mb-3'>The feature is still under construction,  but you can chat with us for now on whatsapp</p>
          <Link href={OrganizationData?.whatsapplink || "#"} target="_blank" className='btn btn-primary rounded text-light'>
          <IoLogoWhatsapp className={'h4 mb-1 me-2'} />
           chat on whatsapp
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ChatRoom