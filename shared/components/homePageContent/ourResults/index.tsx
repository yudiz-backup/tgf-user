'use client'
import { Col, Container, Row } from 'react-bootstrap'

import styles from './style.module.scss'
import MyImage from '../../ui/myImage'


export type OurResultsType = {
  sTitle: string
  nCount: number
}
export interface OurResultsProps {
  data: OurResultsType[] | undefined
}

function OurResults({ data }: OurResultsProps) {
  const imgList = ['satisfaction-icon.svg', 'trophy-icon.svg', 'five-stars-icon.svg', 'five-stars-icon.svg']
  return (
    data &&
    data?.length > 0 && (
      <section className={`${styles.ourResults} text-center`}>
        <Container>
          <h2>Our results in numbers</h2>
          <Row className={`${styles.list} flex-nowrap big-text gx-sm-2 gx-md-3 gx-lg-4`}>
            {data.map((result,index) => (
              <Col key={result.sTitle} sm={6} md={3}>
                <div className={`${styles.wrapper} position-relative mx-lg-1`}>
                  <div className={`${styles.card} d-flex flex-column justify-content-center`}>
                    <div className={`${styles.icon} mx-auto`}>
                      <MyImage src={`/images/icons/${imgList[index] }`} alt='satisfaction' width={1440} height={900} />
                    </div>
                    <h4 className='text-uppercase'>{result.nCount}</h4>
                    <p>{result.sTitle}</p>
                  </div>
                  <div className={`${styles.upShape} position-absolute top-0 start-0`}>
                    <MyImage src={'/images/icons/up-golden-shape.svg'} alt='shape' width={54} height={48} />
                  </div>
                  <div className={`${styles.bottomShape} position-absolute bottom-0 end-0`}>
                    <MyImage src={'/images/icons/bottom-golden-shape.svg'} alt='shape' width={54} height={48} />
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    )
  )
}

export default OurResults
