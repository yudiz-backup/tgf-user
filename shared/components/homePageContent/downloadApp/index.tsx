'use client';
import React, { useRef, type ReactNode, useState, useEffect } from "react"
import { Container } from "react-bootstrap";
import Link from "next/link";

import styles from './style.module.scss'
import MyImage from "../../ui/myImage";
import ENV from "@/shared/envs";
import { getCtaSectionData } from "@/shared/data-sources/api-handlers";
import { useQuery } from "@tanstack/react-query";
import { handleDownloadClick, handleIosLinkClick } from "../../helper";


type DownloadAppType ={
  mockupImage:string,
  sideImage:string
}
function DownloadApp({mockupImage,sideImage} : DownloadAppType): ReactNode {
  const [isVisible, setIsVisible] = useState(false);  
  const downloadAppRef = useRef<Element | any>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Adjust the threshold based on your needs
    };

    const handleIntersection: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (downloadAppRef.current) {
      observer.observe(downloadAppRef.current);
    }

    return () => {
      if (downloadAppRef.current) {
        observer.unobserve(downloadAppRef.current);
      }
      observer.disconnect();
    };
  }, [isVisible]);

  const { data: ctaSectionPageData } = useQuery({
    queryKey: ["ctaSection"],
    queryFn: getCtaSectionData,
  });

  return ( 
    <>
      <section  ref={(el) => (downloadAppRef.current = el)} className={`${styles.downloadApp} ${isVisible ? styles.active : ""} text-center overflow-hidden`}>
        <Container>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-end">
            <div className={`${styles.mockup}`}>
              <MyImage src={ENV.S3_MEDIA_URL + mockupImage} alt="banner" width={1440} height={900} />
              <Link  href={ctaSectionPageData?.sIosLink || "/"}  onClick={handleIosLinkClick} className={`${styles.icon} ${styles.appStore} position-absolute start-50 translate-middle-x`}>
                <MyImage src={"/images/home/app-store-icon.svg"} alt="banner" width={1440} height={900} />
              </Link>
              <Link href={ENV.S3_MEDIA_URL + ctaSectionPageData?.sAndroidPath} onClick={handleDownloadClick} className={`${styles.icon} ${styles.googleplay} position-absolute start-50 translate-middle-x`}>
                <MyImage src={"/images/home/google-play-icon.svg"} alt="banner" width={1440} height={900} />
              </Link>
            </div>
            <div className={`${styles.jayaDeepak}`}>
              <MyImage src={ENV.S3_MEDIA_URL + sideImage} alt="banner" width={1440} height={900} />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

export default DownloadApp
