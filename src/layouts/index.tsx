import React from 'react'
import { Link } from 'umi'
import styles from './index.css'

const BasicLayout: React.FC = props => {
  return (
    <div className={styles.normal}>
      <Link to="/">
        <h1 className={styles.title}>Yay! Welcome to umi!</h1>
      </Link>
      {props.children}
    </div>
  )
}

export default BasicLayout
