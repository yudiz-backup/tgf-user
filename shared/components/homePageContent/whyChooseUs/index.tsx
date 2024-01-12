'use client'
import { Col, Container, Row } from 'react-bootstrap'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCards } from 'swiper/modules'

import styles from './style.module.scss'
import MyImage from '../../ui/myImage'
import ENV from '@/shared/envs'

export interface WhyChooseUsProps {
  list?: string[]
  sliderData?: {
    nPriority: string | number
    sPath: string
  }[]
}

function WhyChooseUs({ list, sliderData }: WhyChooseUsProps) {
  return (
    list &&
    list?.length > 0 && (
      <div className={`${styles.whyChooseUs} common-section`}>
        <Container>
          <Row className='align-items-center'>
            <Col md={7}>
              <h2 className='text-center text-md-start'>Why Choose Us</h2>
              <ul className={`${styles.list} xl-text mt-3 mt-md-4 pt-xl-1 text-capitalize`}>
                {list.map((listItem) => (
                  <li key={listItem} className='position-relative'>
                    {listItem}
                  </li>
                ))}
              </ul>
            </Col>
            <Col md={5}>
              <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards, Autoplay]}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                className='mySwiper'
              >
                {sliderData &&
                  sliderData.map((slide, sIndex) => (
                    <SwiperSlide key={slide.sPath}>
                      <div className={`${styles.card} mx-auto`}>
                        <MyImage src={ENV.S3_MEDIA_URL + slide.sPath} alt={`slide` + sIndex + 1} width={329} height={496} />
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </Col>
          </Row>
        </Container>
      </div>
    )
  )
}

export default WhyChooseUs
