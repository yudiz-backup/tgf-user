'use client'
import { Col, Container, Row } from 'react-bootstrap'

import styles from './style.module.scss'
import MyImage from '../../ui/myImage'
import { AboutUsInterface } from '@/shared/ts/interfaces/home.interface'
import ENV from '@/shared/envs'

function MeetOurTeam({ data }: { data: { team?: AboutUsInterface['aTeamMembers']; description?: string } }) {
  return (
    <>
      <section className={`${styles.meetOurTeam} overflow-hidden`}>
        <Container>
          <Row>
            <Col md={8} xl={7} className='mb-4 mb-md-5'>
              <h2>Meet our team</h2>
              <p className='xl-text text-capitalize'>
                {data.description}
              </p>
            </Col>
          </Row>
          <div className={`${styles.teamList} d-flex overflow-auto text-center`}>
            {data?.team?.map((team) => {
              return (
                <div key={team.sPath} className={`${styles.team} flex-shrink-0`}>
                  <div className={`${styles.teamPic} rounded-circle overflow-hidden`}>
                    <MyImage src={ENV.S3_MEDIA_URL + team.sPath} alt='team' width={200} height={200} />
                  </div>
                  <h6 className='mb-0'>{team.sName}</h6>
                  {team.sDesignation && <p>{team.sDesignation}</p>}
                </div>
              )
            })}
          </div>
        </Container>
      </section>
    </>
  )
}

export default MeetOurTeam
