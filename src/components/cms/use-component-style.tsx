import React, { useEffect } from 'react'

const useComponentStyle = (id: number, style: any) => {
  // 暂时只实现功能展示，不追求技术逻辑性
  // 假如用这种方式，那 style 就不能是简单的对象，除了修改的属性值还应该包括具体涉及到的 antd 的组件名或者一些单位等
  const newStyleEl = document.createElement('style')
  const tagMap: any = {}
  Object.keys(style).forEach(attr => {
    const { tag, value } = style[attr]
    const cssValue = `${attr}:${value};`
    if (!tagMap[tag]) {
      tagMap[tag] = [cssValue]
    } else {
      tagMap[tag].push(cssValue)
    }
  })
  const styleHTML = Object.keys(tagMap).map(tag => {
    const tagHTML = tagMap[tag].join()
    return `.style_${id} ${tag}{${tagHTML}}`
  }).join()
  newStyleEl.innerHTML = styleHTML
  useEffect(() => {
    document.head.append(newStyleEl)
    return () => {
      document.head.removeChild(newStyleEl)
    }
  })
}

export default useComponentStyle
