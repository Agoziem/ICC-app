import PageTitle from '@/components/PageTitle/PageTitle'
import ArticleConf from '@/components/configuration/articles/ArticleConf'
import React from 'react'

const ArticlesConfigPage = () => {
  return (
    <div style={{minHeight:"100vh"}}>
        <PageTitle pathname="articles" />
       <ArticleConf />
    </div>
  )
}

export default ArticlesConfigPage