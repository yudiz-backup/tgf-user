'use client'
import React, { useState, type ReactNode, useEffect, useMemo } from 'react'

import styles from './style.module.scss'
import MyImage from '../../ui/myImage'
import { Col, Container, Row } from 'react-bootstrap'
import { useQuery } from '@tanstack/react-query'
import { getFeatureSectionData } from '@/shared/data-sources/api-handlers'
import ENV from '@/shared/envs'

function FantasyApp(): ReactNode {
  const { data } = useQuery({
    queryKey: ['appFeatures'],
    queryFn: getFeatureSectionData,
  })

  const [activeFeatureTitle, setActiveFeatureTitle] = useState(data?.aFantasyFeature?.[0]?.sTitle || '')
  function getActiveFeatureImage() {
    return data?.aFantasyFeature?.find((feature) => feature?.sTitle === activeFeatureTitle)?.sImage || ''
  }

  /**
   * generate UI supported array of array from API response
   * data?.aFantasyFeature = [1,2,3,4]
   * constructedData = [[1,2],[3,4]]
   */
  const constructedData = useMemo(() => {
    const returnData = []
    if (data?.aFantasyFeature?.length) {
      for (let i = 0; i < data?.aFantasyFeature?.length; i += 2) {
        returnData.push([data?.aFantasyFeature[i], data?.aFantasyFeature[i + 1]])
      }
    }
    return returnData
  }, [data])

  useEffect(() => {
    if (!activeFeatureTitle && data?.aFantasyFeature?.[0]?.sTitle) {
      setActiveFeatureTitle(data.aFantasyFeature[0].sTitle)
    }
  }, [data])

  useEffect(() => {
    if (data && data.aFantasyFeature && data.aFantasyFeature.length > 0) {
      const intervalId = setInterval(() => {
        const currentIndex =
          data?.aFantasyFeature.findIndex((feature) => feature?.sTitle === activeFeatureTitle) || 0
        const nextIndex = (currentIndex + 1) % data?.aFantasyFeature.length
        setActiveFeatureTitle(data?.aFantasyFeature[nextIndex]?.sTitle || '')
      }, 5000) 
      return () => clearInterval(intervalId) 
    }
  }, [activeFeatureTitle, data])

  return (
    <>
      <div className={`${styles.fantasyApp} common-section pb-3 pb-md-4 pb-xl-5 position-relative`}>
        <Container>
          <Row className='justify-content-center'>
            <Col md={10}>
              <h2 className='mb-3 mb-md-4 mb-xl-5 text-center'>Why is TFG the Best Cricket Fantasy App?</h2>
            </Col>
          </Row>
          <div className='position-relative'>
            <Col md={4} className={`${styles['feature-image']} mx-auto px-0 mb-4 mb-md-0`}>
              <div className={`${styles.mockup} mx-auto`}>
                <MyImage src={ENV.S3_MEDIA_URL + getActiveFeatureImage()} alt='mockup' width={355} height={525} />
              </div>
            </Col>
            <Row className={`align-items-end gx-md-3 gx-lg-4 overflow-auto flex-row flex-nowrap flex-md-wrap ${styles['features-row']}`}>
              {constructedData.map((features, fIndex) => (
                <React.Fragment key={`featureCol` + fIndex}>
                  <Col md={{ span: 4, offset: fIndex > 0 ? 4 : 0 }} xs={10} className={styles['features-col']}>
                    <Row>
                      {features?.map(
                        (feature, fItemIndex) =>
                          feature && (
                            <Col
                              key={feature.sTitle}
                              md={12}
                              xs={6}
                              className={`${fItemIndex > 0 ? '' : 'mb-2 mb-md-3 mb-xl-4'} ${fIndex > 0 ? 'd-flex justify-content-end' : ''}`}
                            >
                              <div
                                className={`${styles.item} ${activeFeatureTitle === feature.sTitle ? styles.active : ''}`}
                                role='button'
                                onClick={() => setActiveFeatureTitle(feature.sTitle)}
                              >
                                <div className={`${styles.icon} mb-2`}>
                                  <MyImage src={ENV.S3_MEDIA_URL + feature.sPath} alt='trophy' width={64} height={64} />
                                </div>
                                <h4 className='fw-medium text-capitalize'>{feature.sTitle}</h4>
                                <p className='mb-0'>{feature.sDescription}</p>
                              </div>
                            </Col>
                          )
                      )}
                    </Row>
                  </Col>
                </React.Fragment>
              ))}
            </Row>
          </div>
        </Container>
      </div>
    </>
  )
}

export default FantasyApp
