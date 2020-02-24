import React from 'react'
import classnames from 'classnames'
import style from '@/pages/cms/index.css'

interface IProps {
  width: number,
  height: number
}

const Ruler: React.FC<IProps> = ({
  width,
  height
}) => {
  const rulerHorizontalStyle: React.CSSProperties = {
    width: `${width + 40}px`
  }
  const rulerVerticalStyle: React.CSSProperties = {
    height: `${height + 40}px`
  }
  const renderMeasure = (measure: number, isVertical: Boolean = false) => {
    const measureArr = []
    const count = Math.floor(measure / 100)
    const specialStyle = isVertical ? style.rulerMeasureVertical : style.rulerMeasureHorizontal
    let start = 1
    while(start <= count) {
      let measureStyle: React.CSSProperties = {}
      if (isVertical) {
        Object.assign(measureStyle, {
          top: `${start * 100 + 40 - 7}px`
        })
      } else {
        Object.assign(measureStyle, {
          left: `${start * 100 + 40 - 20}px`
        })
      }

      measureArr.push(
        <span style={measureStyle} className={classnames(style.rulerMeasure, specialStyle)}>
          {start * 100}
        </span>
      )
      start++
    }
    return measureArr
  }
  return (
    <div className={style.rulerWraper}>
      px
      <div className={style.rulerHorizontal} style={rulerHorizontalStyle}>
        {renderMeasure(width)}
      </div>
      <div className={style.rulerVertical} style={rulerVerticalStyle}>
        {renderMeasure(height, true)}
      </div>
    </div>
  )
}

export default Ruler
