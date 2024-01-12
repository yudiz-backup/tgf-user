
// shared/components/googlePlayContent/index.tsx

'use client';
import React, { useState, type ReactNode, useEffect, useMemo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './style.module.scss';
import MyImage from '../ui/myImage';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import {
  getGooglePlayStoreData,
  getReviewListData,
} from '@/shared/data-sources/api-handlers';
import ENV from '@/shared/envs';
import dayjs from 'dayjs';
import StarRating from 'react-star-ratings';
// import MetaTags from '../Meta';
import { useScrollPercentage } from '@/shared/Hooks/useScrollPercentage';
function GooglePlayContent(): ReactNode {
  const [limit, setLimit] = useState<number | undefined>(5);
  const { data } = useQuery({
    queryKey: ['PLAYSTORE'],
    queryFn: getGooglePlayStoreData,
  });

  const { data: reviewList, refetch } = useQuery({
    queryKey: ['REVIEWLIST', { limit }],
    queryFn: () => getReviewListData(limit || 5),
  });

  const reviewData = reviewList?.data || [];

  const appImagesData = useMemo(() => {
    const incomingData = data && data?.aAppImages?.length > 0 && data?.aAppImages
    return incomingData ? incomingData?.sort((a, b) => Number(a.nPriority) - Number(b.nPriority)) : []
  }, [data])

  const handleSeeAllReview = () => {
    setLimit(reviewList?.count);
  };

  useScrollPercentage()

  useEffect(() => {
    refetch();
  }, [limit]);
  return (
    <>
    {/* <MetaTags data={data?.oSeo || {}} /> */}
    <div className={styles.googlePlay}>
      <header className={`${styles.header}`}>
        <Container>
          <div className='d-flex align-items-center'>
            <Link
              href=''
              className={`${styles.logo} d-flex align-items-center`}
            >
              <span className={`${styles.logoIcon} me-3`}>
                <MyImage
                  src={'/images/icons/google-play-icon.svg'}
                  alt='google-play'
                  width={40}
                  height={40}
                />
              </span>
              Google Play
            </Link>
            <nav className={`${styles.nav} d-none d-md-flex ps-4 ms-2`}>
              <Link href='/'>Games</Link>
              <Link href='/' className={`${styles.active}`}>
                Apps
              </Link>
              <Link href='/'>Movies</Link>
              <Link href='/'>Children</Link>
              <Link href='/'>Books</Link>
            </nav>
            <div className='d-flex align-items-center ms-auto'>
              <span className={`${styles.icon} ms-3`}>
                <MyImage
                  src={'/images/icons/search-icon.svg'}
                  alt='search'
                  width={24}
                  height={24}
                />
              </span>
              <span className={`${styles.icon} ms-3`}>
                <MyImage
                  src={'/images/icons/question-icon.svg'}
                  alt='question'
                  width={24}
                  height={24}
                />
              </span>
              <span className={`${styles.user} ms-3`}>
                <MyImage
                  src={'/images/icons/user-icon.svg'}
                  alt='user'
                  width={32}
                  height={32}
                />
              </span>
            </div>
          </div>
        </Container>
      </header>
      <section className={`${styles.banner} position-relative`}
        style={{ backgroundImage: `url(/images/google-play-banner.jpg)` }}
      >
        <iframe className='position-absolute h-100 w-100 start-0 top-0' src="https://www.youtube.com/embed/m6X4P1o0l-E?autoplay=1&loop=1&rel=0&showinfo=0&mute=1" allow="autoplay; encrypted-media">
        </iframe>
        <Container className='py-2 py-md-xl-4 py-xxl-5 d-flex align-items-end position-relative'>
          <Row className='flex-grow-1'>
            <Col md={7} xl={6} xxl={5}>
              <div className='d-flex'>
                <div className='d-md-none'>
                  <div className={`${styles.logoIcon} position-relative`}>
                    <MyImage
                      src={'/images/icons/logo-icon.svg'}
                      alt='icon'
                      width={78}
                      height={89}
                    />
                  </div>
                </div>
                <div>
                  <h1>
                    Trade Fantasy <br />
                    Game
                  </h1>
                  <p className='mb-1'>Online Poker Games</p>
                </div>
              </div>
              <div className={`${styles.bannerInfo} d-flex align-items-center`}>
                <div
                  className={`${styles.logoIcon} position-relative d-none d-md-block`}
                >
                  <MyImage
                    src={ENV.BASE_URL + '/images/icons/logo-icon.svg'}
                    alt='icon'
                    width={78}
                    height={89}
                  />
                </div>
                {data?.sAvgReview && data?.nTotalReview && (
                  <div
                    className={`${styles.item} text-center px-1 px-lg-3 px-xxl-4`}
                  >
                    <h5 className='mb-1'>{data?.sAvgReview}</h5>
                    <p className='mb-0'>{data?.nTotalReview} reviews</p>
                  </div>
                )}
                {data?.sDownloads && (
                  <div
                    className={`${styles.item} text-center px-1 px-lg-3 px-xxl-4`}
                  >
                    <h5 className='mb-1'>{data?.sDownloads}</h5>
                    <p className='mb-0'>Downloads</p>
                  </div>
                )}
                {data?.sRated && (
                  <div
                    className={`${styles.item} text-center px-1 px-lg-3 px-xxl-4 text-center`}
                  >
                    <h5 className={`${styles.rated} mb-1 d-inline-block px-1`}>
                      {data?.sRated}
                    </h5>
                    <p className='mb-0'>Rated for {data?.sRated}</p>
                  </div>
                )}
              </div>
              <div
                className={`${styles.install} d-flex flex-column flex-md-row align-items-center mt-md-3`}
              >
                <button
                  className={`${styles.btn} ${styles.theme} me-2 me-md-3 border-0 text-center py-2`}
                >
                  Install
                </button>
                <Link
                  href='/'
                  className={`${styles.share} d-inline-flex align-items-center justify-content-center text-center text-md-start mt-3 mt-md-0`}
                >
                  <MyImage
                    src={'/images/icons/share-icon.svg'}
                    alt='icon'
                    width={20}
                    height={20}
                    className={`${styles.icon} me-1`}
                  />
                  <span className='ms-md-1'>Share</span>
                </Link>
              </div>
              <p className='d-flex align-items-center py-3 mb-0'>
                <span className={`${styles.devicesIcon} me-2`}>
                  <MyImage
                    src={'/images/icons/devices-icon.svg'}
                    alt='icon'
                    width={24}
                    height={24}
                    className='me-2'
                  />
                </span>
                <span className='ms-md-1'>
                  This app is available for your device
                </span>
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      {appImagesData?.length > 0 && (
        <section className={`${styles.screenshots} position-relative`}>
          <Container>
            <div className={`${styles.ssList} d-flex overflow-auto`}>
              {data?.aAppImages?.map((imageData) => (
                <div key={imageData.nPriority} className={`${styles.screenshot} flex-shrink-0`}>
                  <MyImage
                    src={ENV.S3_MEDIA_URL + imageData?.sPath}
                    alt={imageData?.sPath + '-' + imageData?.nPriority}
                    width={265}
                    height={470}
                  />
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}
      <section className={`${styles.about} position-relative`}>
        <Container>
          {data?.sAbout && (
            <>
              <h5>About this game</h5>
              <p>{data?.sAbout}</p>
            </>
          )}
          {data?.sUpdateOn && (
            <>
              <h6 className='mt-3 mt-md-4 mb-1'>Updated on</h6>
              <p>{data?.sUpdateOn}</p>
            </>
          )}
          <div className='d-flex mt-3 mt-md-4'>
            <button className={`${styles.btn} rounded-pill me-2 me-md-3`}>
              #1 top free sports
            </button>
            <button className={`${styles.btn} rounded-pill`}>Sports</button>
          </div>
        </Container>
      </section>
      <section
        className={`${styles.ratings} position-relative py-3 py-md-4 py-xxl-5`}
      >
        <Container>
          <Row>
            <Col md={10} lg={8} xxxl={7}>
              <div className='d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-2 mb-md-4'>
                <h5 className='d-flex fw-medium mb-0'>
                  Ratings and reviews
                  <span className={`flex-shrink-0 ms-auto ms-md-2`}>
                    <MyImage
                      src={'/images/icons/arrow-right.svg'}
                      alt='star'
                      width={17}
                      height={17}
                    />
                  </span>
                </h5>
                <p className='fw-normal mb-0'>
                  Rating and reviews are verified
                </p>
              </div>
              <div className='d-flex align-items-center mb-4 mb-md-5'>
                <button
                  className={`${styles.btn} ${styles.small} ${styles.active} d-inline-flex align-items-center rounded-pill me-2 me-md-3`}
                >
                  <span className={`flex-shrink-0 me-1`}>
                    <MyImage
                      src={'/images/icons/phone-icon.svg'}
                      alt='star'
                      width={16}
                      height={16}
                    />
                  </span>
                  Phone
                </button>
                <button
                  className={`${styles.btn} ${styles.small} d-inline-flex align-items-center rounded-pill`}
                >
                  <span className={`flex-shrink-0 me-1`}>
                    <MyImage
                      src={'/images/icons/tablet-icon.svg'}
                      alt='star'
                      width={16}
                      height={16}
                    />
                  </span>
                  Tablet
                </button>
              </div>
              <div className='d-flex'>
                <div className='me-3'>
                  <h1 className='mb-0 fw-normal'>4.8</h1>
                  <div className={`${styles.stars} d-flex me-2 mb-1`}>
                    <div className={`${styles.star} flex-shrink-0`}>
                      <MyImage
                        src={'/images/icons/star.svg'}
                        alt='star'
                        width={17}
                        height={17}
                      />
                    </div>
                    <div className={`${styles.star} flex-shrink-0`}>
                      <MyImage
                        src={'/images/icons/star.svg'}
                        alt='star'
                        width={17}
                        height={17}
                      />
                    </div>
                    <div className={`${styles.star} flex-shrink-0`}>
                      <MyImage
                        src={'/images/icons/star.svg'}
                        alt='star'
                        width={17}
                        height={17}
                      />
                    </div>
                    <div className={`${styles.star} flex-shrink-0`}>
                      <MyImage
                        src={'/images/icons/star.svg'}
                        alt='star'
                        width={17}
                        height={17}
                      />
                    </div>
                    <div className={`${styles.star} flex-shrink-0`}>
                      <MyImage
                        src={'/images/icons/star.svg'}
                        alt='star'
                        width={17}
                        height={17}
                      />
                    </div>
                  </div>
                  <p className='small-text mb-0'>3.87L review</p>
                </div>
                <div className='flex-grow-1'>
                  {[5, 4, 3, 2, 1].map((index) => {
                    return (
                      <div
                        key={index}
                        className='d-flex xsmall-text align-items-center mb-1'
                      >
                        <span className='me-3'>{index}</span>
                        <div
                          className={`${styles.progress} position-relative rounded-pill flex-grow-1`}
                        >
                          <div
                            className={`${styles.value} position-absolute h-100 rounded-pill`}
                            style={{ width: '30%' }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {reviewData?.length > 0 && (
        <section className={`${styles.reviews} position-relative py-3 py-md-4`}>
          <Container>
            <Row>
              <Col md={10} lg={8} xxxl={7}>
                {reviewData.map((reviewItem) => {
                  return (
                    <div key={reviewItem?._id} className='py-3 py-md-4'>
                      <div className='d-flex align-items-center justify-content-between mb-2 mb-md-3'>
                        <div className='d-flex align-items-center'>
                          {reviewItem?.sProfileImagePath && (
                            <div className={`${styles.reviewer} me-3`}>
                              <MyImage
                                src={
                                  ENV?.S3_MEDIA_URL +
                                  reviewItem?.sProfileImagePath
                                }
                                alt={reviewItem?.sUserName}
                                width={40}
                                height={40}
                              />
                            </div>
                          )}
                          <p className='mb-0 fw-bold'>
                            {reviewItem?.sUserName}
                          </p>
                        </div>
                        <div>
                          <MyImage
                            src={'/images/icons/dots-y.svg'}
                            alt='dots'
                            width={20}
                            height={20}
                          />
                        </div>
                      </div>
                      <div className='d-flex align-items-center mb-2 mb-md-3'>
                        {reviewItem?.nRating ? (
                          <div className={`${styles.stars} d-flex me-2`}>
                            <StarRating
                              rating={reviewItem?.nRating}
                              numberOfStars={5}
                              starRatedColor='#3B8462'
                              starEmptyColor='#d9d9d9'
                              starSpacing='2px'
                            />
                          </div>
                        ) : null}
                        {reviewItem?.dCreatedAt && (
                          <p className='mb-0'>
                            {dayjs(reviewItem?.dCreatedAt).format(
                              'DD- MMM-YYYY'
                            )}
                          </p>
                        )}
                      </div>
                      {reviewItem?.sReview ? (
                        <div className='mb-3 mb-md-4'>
                          <p>{reviewItem?.sReview}</p>
                        </div>
                      ) : null}
                      {reviewItem?.nReviewHelpFullCount ? (
                        <p className='xsmall-text mb-2'>
                          {reviewItem?.nReviewHelpFullCount} people found this
                          review helpful
                        </p>
                      ) : null}
                      <div className='d-flex align-items-center'>
                        <p className='xsmall-text mb-0 me-2 me-lg-4'>
                          Did you find this helpful?
                        </p>
                        <button
                          className={`${styles.btn} ${styles.small} rounded-pill me-2 me-md-3`}
                        >
                          Yes
                        </button>
                        <button
                          className={`${styles.btn} ${styles.small} rounded-pill`}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  );
                })}
                {reviewList?.count !== limit ? (
                  <div className='py-3 py-md-4'>
                    <button
                      className={`${styles.allReview} fw-bold bg-transparent border-0`}
                      onClick={handleSeeAllReview}
                    >
                      See all review
                    </button>
                  </div>
                ) : null}
              </Col>
            </Row>
          </Container>
        </section>
      )}
      <footer className={`${styles.footer} text-center py-3 py-lg-4`}>
        <Container>
          <p className='mb-0 text-light'>© 2023 TFG All rights reserved.</p>
        </Container>
      </footer>
    </div>
    </>
  );
}

export default GooglePlayContent;