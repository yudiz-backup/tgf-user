'use client'
import styles from './style.module.scss'
import { Container } from 'react-bootstrap'
import { AboutUsInterface } from '@/shared/ts/interfaces/home.interface'

function BrandContent({ content }: { content?: AboutUsInterface['sBrandContent'] }) {
  return content && (
      <section className={`${styles.brandContent}`}>
        <Container>
          <div className='xxl-text'>
            <h3>{'Our Brand'.toUpperCase()}</h3>
            <div dangerouslySetInnerHTML={{ __html: content }} />
            {/* <h4>Who started it?</h4>
            <p>TFG stands for Trade Fantasy Game, an 'All New 6 Player Fantasy' launched by JCDC Sports Pvt. Ltd - mobile gaming company founded in 2022 by Indian international cricketer Deepak Chahar, and veteran media professional-turned-tech entrepreneur Jaya Chahar.</p>
            <h3>What is unique about the game?</h3>
            <p>This game is played only using digital collectibles (i.e. player cards), and it has exciting new elements like 'Wild Card' and 'Bigger Cash Winnings With Player Cards'. We have a lot of surprise elements (trading, rewards, fantasy with twists, casual clashes) coming soon for you all. </p> */}
          </div>
        </Container>
      </section>
  )
}

export default BrandContent
