'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Container } from 'react-bootstrap'
import { useQuery } from '@tanstack/react-query'
import { Autoplay, Pagination } from 'swiper/modules'

import styles from './style.module.scss'
import './style.scss'
import MyImage from '../../ui/myImage'
import { getTestimonialData } from '@/shared/data-sources/api-handlers'
import ENV from '@/shared/envs'

function Testimonials() {
  const { data } = useQuery({
    queryKey: ['testimonial'],
    queryFn: getTestimonialData,
  })
  return (
    data &&
    data?.length > 0 && (
      <div className={`${styles.testimonials} common-section pb-3 pb-md-4 pb-xl-5 position-relative`}>
        <Container>
          <h2 className='text-center text-capitalize'>What our users say</h2>
          <p className='xl-text text-center mb-3 mb-md-4 mb-xl-5 text-capitalize'>TFG (Trade Fantasy Game) Reviews & Testimonials</p>
          <div className={styles.slider}>
            <Swiper
              slidesPerView={'auto'}
              centeredSlides={true}
              spaceBetween={16}
              loop={true}
              // grabCursor={true}
              slideToClickedSlide={true}
              // pagination={{
              //   clickable: true,
              // }}
              autoplay={{
                delay: 3600,
                disableOnInteraction: false,
              }}
              modules={[Autoplay, Pagination]}
              // slideActiveClass={`${styles.active}`}
              breakpoints={{
                320: {
                  spaceBetween: 12,
                  freeMode: true,
                },
                768: {
                  spaceBetween: 16,
                  freeMode: false,
                },
              }}
              className={`${styles.list} testimonials-slider`}
            >
              {data.map((review) => {
                return (
                  <SwiperSlide key={review._id} className={`${styles.slide}`}>
                    <div className={`${styles.item} item d-flex align-items-end small-text overflow-hidden position-relative`}>
                      <div className={`${styles.userPic} mx-auto position-absolute top-0 left-0 h-100 w-100`}>
                        <MyImage src={ENV.S3_MEDIA_URL + review.sProfileImagePath} alt='trophy' width={380} height={510} />
                      </div>
                      <div className={`${styles.content} content small-text flex-shrink-0`}>
                        <p className='fw-bold mb-0'>{review.sUserName}</p>
                        <div className='d-flex justify-content-between align-items-center mb-2'>
                          {review.sDesignation && <p className='mb-0'>{review.sDesignation}</p>}
                          <div className='d-flex'>
                            <div className={`${styles.star} ms-1 flex-shrink-0`}>
                              <MyImage src={'/images/icons/star-theme-icon.svg'} alt='star' width={24} height={24} />
                            </div>
                            <div className={`${styles.star} ms-1 flex-shrink-0`}>
                              <MyImage src={'/images/icons/star-theme-icon.svg'} alt='star' width={24} height={24} />
                            </div>
                            <div className={`${styles.star} ms-1 flex-shrink-0`}>
                              <MyImage src={'/images/icons/star-theme-icon.svg'} alt='star' width={24} height={24} />
                            </div>
                            <div className={`${styles.star} ms-1 flex-shrink-0`}>
                              <MyImage src={'/images/icons/star-theme-icon.svg'} alt='star' width={24} height={24} />
                            </div>
                            <div className={`${styles.star} ms-1 flex-shrink-0`}>
                              <MyImage src={'/images/icons/star-theme-icon.svg'} alt='star' width={24} height={24} />
                            </div>
                          </div>
                        </div>
                        <p className='mb-0'>{review.sReview}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
        </Container>
      </div>
    )
  )
}

export default Testimonials
