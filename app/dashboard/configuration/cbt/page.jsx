import PageTitle from '@/components/PageTitle/PageTitle'
import SettingsForm from '@/components/configuration/cbt/SettingsForm'
import React from 'react'

const CbtConfigPage = () => {
  return (
    <div>
        <PageTitle pathname="cbtquestions" />
        <SettingsForm />
    </div>
  )
}

export default CbtConfigPage