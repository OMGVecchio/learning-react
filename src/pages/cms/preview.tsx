import React from 'react'
import { RouterTypes } from 'umi'
import { renderCanavs } from '../../components/cms/render-canvas'
import style from './index.css'

// TODO 为啥 RouterTypes 上没 query 字段？
interface NewRouterTypes extends RouterTypes {
  location: {
    state: ICms.ComponentItem[],
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
    location
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
        {renderCanavs(componentList)}
      </div>
      <button onClick={goBack} >上一页</button>
    </>

  )
}

export default CmsPreview
