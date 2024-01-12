'use client'
import { Col, Container, Row } from 'react-bootstrap'

import styles from './style.module.scss'
import MyImage from '../../ui/myImage'
import ENV from '@/shared/envs'

function WhoWeAre({ description, image }: { description?: string; image?: string }) {
  return (
    description && (
      <section className={`${styles.whoWeAre} common-section overflow-hidden`}>
        <Container>
          <Row className='align-items-center'>
            <Col md={7} xl={8}>
              <h2>Who we are</h2>
              <div className='xxl-text text-capitalize' dangerouslySetInnerHTML={{ __html: description }} />
            </Col>
            {image && (
              <Col md={5} xl={4}>
                <div className={`${styles.logo} mx-auto ms-md-auto mt-4 mt-md-0`}>
                  <MyImage src={ENV.S3_MEDIA_URL + image} alt='logo' width={243} height={416} />
                </div>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    )
  )
}

export default WhoWeAre
