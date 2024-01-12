'use client'
import React, { useMemo, type ReactNode } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards } from 'swiper/modules'

import styles from './style.module.scss'
import MyImage from '../../ui/myImage'
import { AboutUsInterface } from '@/shared/ts/interfaces/home.interface'
import ENV from '@/shared/envs'

interface PlayerFormatProps {
  content?: AboutUsInterface['aDynamicPlayerContent']
  images?: AboutUsInterface['aDynamicPlayerContentImages']
}

function PlayerFormat({ content, images }: PlayerFormatProps): ReactNode {
  const sortedImages = useMemo(() => images?.sort((a, b) => Number(a.nPriority) - Number(b.nPriority)), [images])
  return (
    <>
      <section className={`${styles.playerFormat} overflow-hidden position-relative overflow-hidden`}>
        <Container>
          <Row className='align-items-center flex-column-reverse flex-md-row'>
            <Col sm={6} xl={7}>
              <div className={`${styles.content} mx-auto text-center overflow-auto`}>
                <h4>Dynamic 6-Player Format</h4>
                <p className='xl-text'>
                  we believe in challenging conventions. While the industry standard hovers around the 11-player format, we&apos;ve condensed the action
                  into a high-octane 6-player format.
                </p>
                <div className={`${styles.list}`}>
                  {content?.map((contentItem) => {
                    return (
                      <div key={contentItem.sTitle} className={`${styles.item} position-relative`}>
                        <h6 className='fw-bold mb-0'>{contentItem.sTitle}</h6>
                        <p className='mb-0'>{contentItem.sDescription}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </Col>
            <Col sm={6} xl={5} className='mb-4 mb-md-0'>
              <Swiper effect={'cards'} initialSlide={2} grabCursor={true} modules={[EffectCards]} className='mySwiper'>
                {sortedImages?.map((image) => (
                  <SwiperSlide key={image.sPath}>
                    <div className={`${styles.card} mx-auto`}>
                      <MyImage src={ENV.S3_MEDIA_URL + image.sPath} alt='deepak' width={329} height={496} />
                    </div>
                  </SwiperSlide>
                ))}                
              </Swiper>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default PlayerFormat
