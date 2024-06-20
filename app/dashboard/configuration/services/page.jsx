import PageTitle from '@/components/PageTitle/PageTitle'
import Services from '@/components/configuration/services/Services'
import React from 'react'

const ServicesConfigPage = () => {
  return (
    <div style={{minHeight:"100vh"}}>
        <PageTitle pathname="services" />
        <h4 className="my-3 mt-4">Services & Applications</h4>
        <Services />
    </div>
  )
}

export default ServicesConfigPage