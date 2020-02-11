import React from 'react'
import { RouterTypes } from 'umi'
import { connect } from 'dva'
import { ConnectProps, CommonProps } from '@/models/cms.d'
import { ComponentItem } from '@/models/cms.d'

import renderCanavs from '../../components/cms/render-canvas'
import style from './index.css'

// TODO 为啥 RouterTypes 上没 query 字段？
interface NewRouterTypes extends RouterTypes, CommonProps {
  // location queryString 方式传值预览测试 depressed
  location: {
    state: ComponentItem[],
    pathname: string,
    search: string,
    hash: string,
    // 本来想通过 query 字段传递的，结果 state 更方便
    query: {
      previewData: string
    }
  }
}

export const CmsPreview = (props: NewRouterTypes) => {
  const {
    history,
    location,
    cms
  } = props
  const {
    query,
    state = []
  } = location
  const { previewData } = query
  const componentList = previewData ? JSON.parse(previewData) : state
  const goBack = () => history.goBack()
  return (
    <>
      <div className={style.container}>
        {renderCanavs(cms.componentList || componentList)}
      </div>
      <button onClick={goBack} >上一页</button>
    </>

  )
}

export default connect(({ cms }: ConnectProps) => ({ cms }))(CmsPreview)
