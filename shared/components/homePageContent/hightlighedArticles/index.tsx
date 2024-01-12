'use client';
import React, { useState, type ReactNode, useEffect } from "react"

import styles from './style.module.scss'
import { Button, Col, Container, Row } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { getArticle, getImageUrlNews } from "@/shared/data-sources/api-handlers";
import { useRouter } from "next/navigation";
import Link from "next/link";

function HightlighedArticles(): ReactNode {
  const router = useRouter()
  const { data } = useQuery({
    queryKey: ['articleData'],
    queryFn: getArticle
  })
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      if (data && data?.length) {
        const imagePromises = data.slice(0,3).map(async (item) => {
          return item ? getImageUrlNews(item.featured_media) : '/images/dummy/article-3.jpg';
        });

        const resolvedImages = await Promise.all(imagePromises);
        setImages(resolvedImages);
      }
    };

    fetchImages();
  }, [data]);
  
  return (data && 
    <>
      <section className={`${styles.hightlighedArticles} position-relative text-capitalize`}>
        <Container>
          <Row className={`${styles.list} h-100 overflow-auto`}>
            {data?.[0] && 
            <Col md={12}>
              <Link href={data?.[0]?.link}>
              <div className={`${styles.article} position-relative overflow-hidden d-flex justify-content-center align-items-center`} style={{ backgroundImage: `url(${images?.[0]})` }}>
                <div className="position-relative">
                  <h3>{data?.[0]?.title?.rendered}</h3>
                  <p className="mb-0" dangerouslySetInnerHTML={{__html:data?.[0]?.excerpt?.rendered}}></p>
                </div>
              </div>
              </Link>
            </Col>}
            {data?.[1] &&
            <Col md={6}>
               <Link href={data?.[1]?.link}>
              <div className={`${styles.article} position-relative overflow-hidden d-flex justify-content-center align-items-end`} style={{ backgroundImage:  `url(${images?.[1]})` }}>
                <div className="position-relative">
                  <h3>{data?.[1]?.title?.rendered}</h3>
                  <p className="mb-0" dangerouslySetInnerHTML={{__html:data?.[1]?.excerpt?.rendered}}></p>
                </div>
              </div>
              </Link>
            </Col>}
            {data?.[2] &&
            <Col md={6}>
               <Link href={data?.[2]?.link}>
              <div className={`${styles.article} position-relative overflow-hidden d-flex justify-content-center align-items-end`} style={{ backgroundImage: `url(${images?.[2]})` }}>
                <div className="position-relative">
                <h3>{data?.[2]?.title?.rendered}</h3>
                  <p className="mb-0" dangerouslySetInnerHTML={{__html:data?.[2]?.excerpt?.rendered}}></p>
                </div>
              </div>
              </Link>
            </Col>}
          </Row>
        </Container>
        <Button className={`${styles.showMore} btnShape position-absolute start-50 translate-middle-x mb-4 mb-md-5 text-uppercase`} onClick={() => router.push('/blogs/news-and-media')}>
          Show more +
        </Button>
      </section >
    </>
  )
}

export default HightlighedArticles
