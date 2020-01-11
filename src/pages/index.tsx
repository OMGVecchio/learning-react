import React from 'react'
import styles from './index.css'
import Link from 'umi/link'

export default function() {

  return (
    <div className={styles.normal}>
      <ul className={styles.list}>
        <li>
          <Link to="/renderProps">renderProps</Link>
        </li>
        <li>
          <Link to="/hook">hook</Link>
        </li>
        <li>
          <Link to="/context">context</Link>
        </li>
        <li>
          <Link to="/createPortal">createPortal</Link>
        </li>
        <li>
          <Link to="/lazySuspence">lazt/Suspence</Link>
        </li>
        <li>
          <Link to="/lifecycle">lifeCycle</Link>
        </li>
        <li>
          <Link to="/cms">cms</Link>
        </li>
      </ul>
    </div>
  );
}
