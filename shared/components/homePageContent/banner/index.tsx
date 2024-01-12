'use client'
import { memo, useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'

import styles from './style.module.scss'
import MyImage from '../../ui/myImage'
import ENV from '@/shared/envs'
import GetAppLink from '../../getAppLink'

export type BannerType = {
  nPriority: string
  sPath: string
}
export interface BannerProps {
  data: BannerType[] | undefined
}

function Banner({ data }: BannerProps) {
  const bannersData = useMemo(() => {
    const incomingData = data && data?.length > 0 && data
    return incomingData ? incomingData?.sort((a, b) => Number(a.nPriority) - Number(b.nPriority)) : []
  }, [data])

  return (
    <section className="position-relative">
      {
        bannersData &&
        bannersData?.length > 0 && (
          <Swiper
            effect={'fade'}
            modules={[EffectFade, Autoplay]}
            className='mySwiper'
            autoplay={{
              delay: 3600,
              disableOnInteraction: false,
            }}
          >
            {bannersData.map((banner) => (
              <SwiperSlide key={banner.sPath}>
                <div className={styles.banner}>
                  <MyImage src={ENV.S3_MEDIA_URL + banner.sPath} alt='banner' width={1440} height={900} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )
      }
      <GetAppLink />
    </section>
  )
}

export default memo(Banner)
