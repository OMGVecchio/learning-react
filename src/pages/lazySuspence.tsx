import React, { lazy, Suspense } from 'react'

// 模拟延迟
const LazyComponent = lazy(() => new Promise(resolve => {
  setTimeout(() => {
    resolve()
  }, 1000)
}).then(() => import('../components/lazy')))

// lazy 编码强制与 suspence 一起使用
export default function () {
  return (
    <Suspense fallback={<div>loading~~~</div>}>
      <LazyComponent />
    </Suspense>
  )
}
