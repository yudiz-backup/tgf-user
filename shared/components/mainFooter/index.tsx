"use client";
import { Button, Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import { FooterInterface } from "@/shared/ts/interfaces/home.interface";
import GLOBAL_CONSTANTS from "@/shared/constants";
import ENV from "@/shared/envs";
import styles from "./style.module.scss";
import MyImage from "../ui/myImage";
interface FooterProps {
  data: FooterInterface;
}

function MainFooter({ data }: FooterProps) {
  return (
    data && (
      <footer
        className={`${styles.mainFooter} position-relative`}
        style={{
          backgroundImage: `url(${ENV.S3_MEDIA_URL + data.sBackGroundImage})`,
        }}
      >
        <Button
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
          className={`${styles.scrollTop} rounded-circle border-0 position-absolute top-0 translate-middle-y d-flex align-items-center justify-content-center`}
        >
          <MyImage
            src={"/images/icons/arrow-up.svg"}
            alt="up"
            width={32}
            height={32}
          />
        </Button>
        <div className={`${styles.innerFooter} `}>
          <Container className="position-relative">
            <Link
              href="/"
              className={`${styles.logoIcon} me-2 me-md-3 position-absolute start-0 top-0`}
            >
              <MyImage
                src={"/images/icons/logo-icon-primary.svg"}
                alt="logo"
                width={32}
                height={32}
              />
            </Link>
            <Row>
              <Col lg={4} md={8}>
                <div className="me-md-4 me-xl-5 mb-4 mb-lg-0">
                  <p className="big-text">{data.sAppName}</p>
                  <p>{data.sAppDisc}</p>
                </div>
              </Col>
              <Col lg={8}>
                <Row>
                  <Col md={4}>
                    <nav
                      className={`${styles.nav} d-flex flex-column align-items-start`}
                    >
                      <Link href="/blogs">Blog</Link>
                      <Link href="/about-us">About us</Link>
                      <Link href="/blogs/responsible-gaming/">
                        Responsible gaming
                      </Link>
                      <Link href="/contact-us">Contact us</Link>
                      <Link href="/blogs/privacy-policy">Privacy Policy</Link>
                      {data.sAIGFCertified && (
                        <Link
                          href={ENV.S3_MEDIA_URL + data.sAIGFCertified}
                          target="_blank"
                        >
                          AIGF Certificate
                        </Link>
                      )}
                    </nav>
                  </Col>
                  <Col md={4}>
                    <nav
                      className={`${styles.nav} d-flex flex-column align-items-start`}
                    >
                      <Link href="/blogs/cancellation-refund">
                        Cancellation & Refund
                      </Link>
                      <Link href="/faqs">FAQ</Link>
                      <Link href="/blogs/terms-condition">
                        Terms & Condition
                      </Link>
                      <Link href="/blogs/news-and-media">News & Media</Link>
                      <Link href="/blogs/legalities">Legalities</Link>
                    </nav>
                  </Col>
                  <Col md={4}>
                    <div className={`${styles.nav}`}>
                      <p className="mb-1">Contact Us or Follow Us:</p>
                      <p className="mb-2 mb-md-3">
                        <a href={`tel:${data.nNumber}`}>{data.nNumber}</a>
                      </p>
                      <a href={`mailto:${data.sEmail}`}>{data.sEmail}</a>
                      <nav className={`${styles.socialList} d-flex mt-3`}>
                        {data?.aSocialMedia?.map((media) => (
                          <a
                            key={media.sLink}
                            href={media.sLink}
                            target="_blank"
                            className={`${styles.icon} me-2 me-md-3`}
                          >
                            <MyImage
                              src={
                                GLOBAL_CONSTANTS.footer.socialAppName[
                                  media.sTitle.toLowerCase()
                                ]
                              }
                              alt="linkedin"
                              width={32}
                              height={31}
                            />
                          </a>
                        ))}
                      </nav>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
        {data.sCopyRight && (
          <div className={`${styles.copyright} text-center`}>
            <Container>
              <p className="mb-0">{data.sCopyRight}</p>
            </Container>
          </div>
        )}
      </footer>
    )
  );
}

export default MainFooter;
