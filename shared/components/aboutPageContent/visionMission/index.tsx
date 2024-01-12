'use client'
import { Col, Container, Row } from 'react-bootstrap'

import styles from './style.module.scss'
import MyImage from '../../ui/myImage'
import ENV from '@/shared/envs'

interface VisionMissionProps {
  description?: string
  images?: { side?: string; background?: string }
}

function VisionMission({ description, images }: VisionMissionProps) {
  return (
    description && (
      <section
        className={`${styles.visionMission} common-section overflow-hidden position-relative overflow-hidden`}
        style={{ backgroundImage: `url(${ENV.S3_MEDIA_URL+images?.background})` }}
      >
        <Container className={`${styles.content} position-relative`}>
          <Row className='align-items-center'>
            <Col md={8} xl={7}>
              <div className='xxl-text pb-md-2 pb-lg-4 pb-xl-5'>
                <h2>Our Vision And Mission</h2>
                {/* <p><b>“we're not just following the norm, we're rewriting the playbook of sports gaming”</b></p> */}
                <div className='text-capitalize' dangerouslySetInnerHTML={{ __html: description }} />
              </div>
            </Col>
          </Row>
        </Container>
        <div className={`${styles.jayaDeepak} position-absolute bottom-0`}>
          <MyImage src={ENV.S3_MEDIA_URL + images?.side} alt='jaya-deepak' width={578} height={571} />
        </div>
      </section>
    )
  )
}

export default VisionMission
