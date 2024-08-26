import PageTitle from '@/components/PageTitle/PageTitle'
import WhatsappContainer from '@/components/Whatsapp/WhatsappContainer'
import React from 'react'

const WhatsappAPIPage = () => {
    return (
        <div style={{minHeight:"100vh"}}>
            <PageTitle pathname="WhatsappAPI" />
            <div>
                <WhatsappContainer />
            </div>
        </div>
      )
}

export default WhatsappAPIPage