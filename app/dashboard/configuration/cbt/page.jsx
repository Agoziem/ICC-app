import PageTitle from '@/components/PageTitle/PageTitle'
import SettingsForm from '@/components/configuration/cbt/SettingsForm'
import React from 'react'

const CbtConfigPage = () => {
  return (
    <div style={{minHeight:"100vh"}}>
        <PageTitle pathname="CBT Settings" />
        <SettingsForm />
    </div>
  )
}

export default CbtConfigPage