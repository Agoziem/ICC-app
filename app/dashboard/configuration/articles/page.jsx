import PageTitle from '@/components/PageTitle/PageTitle'
import ArticleConf from '@/components/configuration/articles/ArticleConf'
import React from 'react'

const ArticlesConfigPage = () => {
  return (
    <div>
        <PageTitle pathname="articles" />
       <ArticleConf />
    </div>
  )
}

export default ArticlesConfigPage