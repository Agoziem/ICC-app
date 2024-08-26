import Email from '@/components/Emails/Email'
import PageTitle from '@/components/PageTitle/PageTitle'
import React from 'react'

const EmailPage = () => {
    return (
        <div style={{minHeight:"100vh"}}>
            <PageTitle pathname="Emails Settings" />
            <Email />
        </div>
      )
}

export default EmailPage