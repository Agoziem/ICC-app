import PageTitle from '@/components/PageTitle/PageTitle'
import Test from '@/components/configuration/cbt/Test'
import React from 'react'

const AddingQuestionPage = ({params}) => {
  
  const testID = params.id
  return (
    <div>
        <PageTitle pathname="subject-questions" />
        <div>
          <Test testID={testID}  />
        </div>
    </div>
  )
}

export default AddingQuestionPage