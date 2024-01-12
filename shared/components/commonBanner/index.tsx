'use client';
import React from "react"
import { Container } from "react-bootstrap";

import styles from './style.module.scss'

type BannerType = {
  title: string | undefined
  banner?: string | undefined
  titleClass?: string | undefined
}

export default function CommonBanner({ title, banner, titleClass }: BannerType) {
  return (
    <div className={`${styles.commonBanner} position-relative`} style={{ backgroundImage: `url(${banner})` }}>
      <div className={`${styles.content} position-absolute d-flex justify-content-center align-items-center h-100 w-100 start-0 top-0`}>
        <Container>
          <h1 className={`text-uppercase text-center mb-0 ${titleClass}`}>{title}</h1>
        </Container>
      </div>
    </div>
  )
}