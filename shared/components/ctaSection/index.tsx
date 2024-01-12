"use client";
import React, { type ReactNode } from "react";
import { Container } from "react-bootstrap";
import Link from "next/link";

import styles from "./style.module.scss";

import MyImage from "../ui/myImage";
import ENV from "@/shared/envs";
import { getCtaSectionData } from "@/shared/data-sources/api-handlers";
import { useQuery } from "@tanstack/react-query";
import { handleDownloadClick, handleIosLinkClick } from "../helper";

function CTASection(): ReactNode {

  const { data: ctaSectionPageData } = useQuery({
    queryKey: ["ctaSection"],
    queryFn: getCtaSectionData,
  });


  return (
    ctaSectionPageData && (
      <div className={`${styles.ctaSection} py-3 py-md-4 text-center`}>
        <Container>
          <h4 className="fw-bold text-capitalize">
            Download the official TFG App
          </h4>
          <div className="d-flex justify-content-center">
            <Link
              href={ctaSectionPageData?.sIosLink}
              target="_blank"
              className={`${styles.appIcon} position-relative justify-content-center`}
              onClick={handleIosLinkClick}
            >
              <MyImage
                src={ENV.BASE_URL + "/images/icons/app-store-icon.png"}
                alt="icon"
                width={187}
                height={62}
              />
            </Link>
            <div
              className={`${styles.appQR} d-none d-md-block position-relative mx-1 mx-md-3`}
            >
              <MyImage
                src={ENV.BASE_URL + "/images/qr-code.png"}
                alt="icon"
                width={70}
                height={70}
              />
            </div>
            <Link
              href={ENV.S3_MEDIA_URL + ctaSectionPageData?.sAndroidPath}
              download="your-app-name.apk"
              passHref
            >
              <div className={`${styles.appIcon} position-relative`} onClick={handleDownloadClick}>
                <MyImage
                  src={ENV.BASE_URL + "/images/icons/play-store-icon.png"}
                  alt="icon"
                  width={226}
                  height={62}
                />
              </div>
            </Link>
          </div>
        </Container>
      </div>
    )
  );
}

export default CTASection;
