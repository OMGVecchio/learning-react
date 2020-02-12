import React, {
  lazy,
  Suspense
} from 'react'
import { ComponentItem } from '@/models/cms.d'

// 所以组件的类型
export enum ComponentTypes {
  cms1 = 'cms_1',
  cms2 = 'cms_2'
}

const Wrapper = (lazyComponent: any, key: number) => (
  <Suspense fallback={''} key={key}>
    {lazyComponent}
  </Suspense>
)

// 假如用我这种可视化渲染模式，可以采用异步加载组件
const C1 = lazy(() => import('./cms1'))
const C2 = lazy(() => import('./cms2'))

const createComponent = (component: ComponentItem) => {
  const { index } = component
  switch (component.type) {
    case ComponentTypes.cms1:
      return Wrapper(<C1 componentItem={component} index={index} />, index)
    case ComponentTypes.cms2:
      return Wrapper(<C2 componentItem={component} index={index} />, index)
    default:
      return (<div>给个默认错误信息</div>)
  }
}

export default createComponent
