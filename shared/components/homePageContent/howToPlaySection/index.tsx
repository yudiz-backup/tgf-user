'use client'
import React, { useEffect, type ReactNode } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useQuery } from '@tanstack/react-query'
import styles from './style.module.scss'
import MyImage from '../../ui/myImage'
import { getHowToPlayData } from '@/shared/data-sources/api-handlers'
import ENV from '@/shared/envs'
import { HowToPlayDataInterface } from '@/shared/ts/interfaces/home.interface'

interface sectionType {
  isFull?: boolean
  stepData?: HowToPlayDataInterface['aHowToPlaySteps']
}

function HowToPlaySection({ isFull, stepData }: sectionType): ReactNode {
  const { data, refetch: refetchPlayData } = useQuery({
    queryKey: ['howToPlay'],
    queryFn: getHowToPlayData,
    enabled: false,
  })
  useEffect(() => {
    if (!stepData) {
      refetchPlayData()
    }
  }, [])
  const playSteps = stepData || (data && data?.aHowToPlaySteps?.length > 0 && data.aHowToPlaySteps)

  return ( data?.bHomePageSwitch &&
    <>
      <div className={`${styles.howToPlay} ${isFull ? styles.fullSection : 'common-section'} text-capitalize`}>
        {!isFull && (
          <Container className='text-center'>
            <h2>How To Play?</h2>
            <p className='xl-text'>Enjoy Superfast Winnings with Super-easy Gaming</p>
          </Container>
        )}
        <div className={`${styles.list}`}>
          {playSteps &&
            playSteps.map((step, stIndex) => (
              <div key={step.sTitle} className={`${styles.item} h-100`}>
                <Container className='h-100'>
                  <Row className={`${styles.itemInner} align-items-center h-100`}>
                    <Col md={8}>
                      <div className='d-flex align-items-start'>
                        <h2 className={`${styles.number} me-3 me-xl-4`}>{stIndex + 1}</h2>
                        <div>
                          <h2 className='mb-1'>{step.sTitle}</h2>
                          <p className='xl-text'>{step.sDescription}</p>
                        </div>
                      </div>
                    </Col>
                    <Col md={4} className='h-100'>
                      <div className={`${styles.mockup} mx-auto h-100`}>
                        <MyImage src={ENV.S3_MEDIA_URL + step.sPath} alt={'step ' + step.sTitle} width={306} height={549} className='h-100' />
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default HowToPlaySection
