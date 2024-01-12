'use client'
import styles from './style.module.scss'
import MyImage from '../../ui/myImage'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { useQuery } from '@tanstack/react-query'
import { getMediaGlimData } from '@/shared/data-sources/api-handlers'
import ENV from '@/shared/envs'
import Link from 'next/link'

function MediaGlimpse() {
  const { data } = useQuery({
    queryKey: ['mediaGlim'],
    queryFn: getMediaGlimData,
  })
  return (
    data?.aMediaGlim &&
    data?.aMediaGlim?.length > 0 && (
      <div className={`${styles.mediaGlimpse} position-relative text-center`}>
        <h2 className='mb-3 mb-md-4 mb-xl-5'>Media glimpse</h2>
        <div className=''>
          <Swiper
            slidesPerView={'auto'}
            spaceBetween={16}
            loop={true}
            speed={2200}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Autoplay]}
            className={`${styles.list}`}
            breakpoints={{
              320: {
                spaceBetween: 6,
                freeMode: true,
              },
              768: {
                spaceBetween: 16,
                freeMode: false,
              },
            }}
          >
            {data?.aMediaGlim.map((media) => (
              <SwiperSlide key={media.sPath} className={`${styles.slide}`}>
                <Link href={media?.sUrl} target='_blank'>
                <div className={`${styles.item} rounded-pill d-flex flex-column justify-content-center small-text`}>
                  <div className={`${styles.logo} mx-auto`}>
                    <MyImage src={ENV.S3_MEDIA_URL + media.sPath} alt={media.sTitle} width={109} height={52} />
                  </div>
                </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    )
  )
}

export default MediaGlimpse
