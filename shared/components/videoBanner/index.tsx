'use client';
import { Container, Ratio } from "react-bootstrap";

import styles from './style.module.scss'
import GetAppLink from "../getAppLink";

type BannerType = {
  title: string | undefined,
  videoLink?: string
}

export default function VideoBanner({ title, videoLink }: BannerType) {
  return (
    <div className={`${styles.videoBanner} position-relative`}>
      <Ratio className={styles.video} aspectRatio="16x9">
        <iframe src={videoLink || "https://www.youtube.com/embed/m6X4P1o0l-E?autoplay=1&loop=1&rel=0&showinfo=0&mute=1"} allow="autoplay; encrypted-media"></iframe>
      </Ratio>
      <div className={`${styles.content} position-absolute d-flex justify-content-center align-items-center h-100 w-100 start-0 top-0`}>
        <Container>
          <h1 className="text-uppercase text-center mb-0">{title}</h1>
        </Container>
      </div>
      <GetAppLink />
    </div>
  )
}
