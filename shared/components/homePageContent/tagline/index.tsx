'use client'
import React, { type ReactNode } from 'react'

import styles from './style.module.scss'

function Tagline({ data }: { data: string | undefined }): ReactNode {
  return (
    data && (
      <div className={`${styles.tagline} position-relative overflow-hidden`}>
        <h2 className={`${styles.title} text-nowrap position-absolute mb-0 top-50 fw-normal w-100`}>{data}</h2>
      </div>
    )
  )
}

export default Tagline
