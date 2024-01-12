'use client'
import React, { useState, type ReactNode, useMemo } from 'react'

import styles from './style.module.scss'
import MyImage from '../../ui/myImage'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { AboutUsInterface } from '@/shared/ts/interfaces/home.interface'
import ENV from '@/shared/envs'
import { UnknownObject } from '@/shared/ts/types/generic.type'

function FoundersPartners({ foundersList }: { foundersList?: AboutUsInterface['aFounders'] }): ReactNode {
  const initialState = useMemo(
    () =>
      foundersList && foundersList?.length > 0
        ? foundersList.reduce((acc: UnknownObject, founder) => {
            acc[founder.sName] = false
            return acc
          }, {})
        : {},
    [foundersList]
  )

  const [expand, setExpand] = useState(initialState)
  
  return (
    foundersList && foundersList.length > 0 && (
      <div className={`${styles.foundersPartners} common-section`}>
        <Container>
          <div className='mb-4 mb-md-5 pb-3 pb-md-4'>
            <h2 className='text-center text-capitalize'>Founders & Partners</h2>
            <p className='xl-text text-center text-capitalize'>Meet the Passionate Founders behind TFG (Trade Fantasy Game)</p>
          </div>
          <Row className={`${styles.list} align-items-center gx-md-3 gx-xl-4`}>
            {foundersList?.map((founder) => (
              <Col key={founder.sName} md={6}>
                <div className={`${styles.wrapper} mx-lg-1 position-relative mb-4 mb-md-0`}>
                  <div
                    className={`${styles.card} ${expand[founder.sName] ? styles.active : ''} mx-auto`}
                    style={{ backgroundImage: `url(${ENV.S3_MEDIA_URL + founder.sPath})` }}
                  >
                    <div className={`${styles.foundersContent} position-relative overflow-hidden`}>
                      <div className={`${styles.foundersInnerContent} position-absolute z-1 bottom-0 fade ${!expand[founder.sName] ? 'show' : ''}`}>
                        <h3 className='mb-sm-1 mb-xl-2 text-capitalize'>{founder.sName}</h3>
                        <h6>Founder</h6>
                        <p className='mb-0 text-capitalize'>
                          {founder.sDescription.slice(0, 100)}{' '}
                          <Button variant='link' type='button' onClick={() => setExpand((prev => ({...prev, [founder.sName]: true})))}>
                            Read More
                          </Button>
                        </p>
                      </div>
                      <div
                        className={`${styles.foundersInnerContent} ${
                          expand[founder.sName] ? 'show' : 'invisible'
                        } position-absolute d-flex flex-column mh-100 pt-4 z-1 fade`}
                      >
                        <h3 className='mb-sm-1 mb-xl-2 text-capitalize'>{founder.sName}</h3>
                        <h6>{founder.sDesignation}</h6>
                        <p className='mb-0 flex-grow-1 overflow-auto'>
                          <span dangerouslySetInnerHTML={{ __html: founder.sDescription }} />{' '}
                          <Button variant='link' type='button' onClick={() => setExpand((prev => ({...prev, [founder.sName]: false})))}>
                            Show less
                          </Button>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.upShape} position-absolute top-0 start-0`}>
                    <MyImage src={ '/images/icons/up-golden-shape.svg'} alt='shape' width={54} height={48} />
                  </div>
                  <div className={`${styles.bottomShape} position-absolute bottom-0 end-0`}>
                    <MyImage src={ '/images/icons/bottom-golden-shape.svg'} alt='shape' width={54} height={48} />
                  </div>
                </div>
              </Col>
            ))}            
          </Row>
        </Container>
      </div>
    )
  )
}

export default FoundersPartners
