import React from 'react'
import styles from './index.css'
import { formatMessage } from 'umi-plugin-locale'
import Link from 'umi/link'

export default function() {

  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>To get started, edit <code>src/pages/index.js</code> and save to reload.</li>
        <li>
          <a href="https://umijs.org/guide/getting-started.html">
            {formatMessage({ id: 'index.start' })}
          </a>
        </li>
        <li>
          <Link to="/render-props">render-props</Link>
        </li>
        <li>
          <Link to="/hook">hook</Link>
        </li>
      </ul>
    </div>
  );
}
