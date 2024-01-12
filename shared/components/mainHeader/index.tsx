'use client';
import React, { useState, type ReactNode } from "react"
import { Button, Container, Offcanvas } from "react-bootstrap";

import styles from './style.module.scss'
import MyImage from "../ui/myImage";
import Link from "next/link";
import ENV from "@/shared/envs";

function MainHeader(): ReactNode {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <header className={`${styles.mainHeader} position-fixed top-0 start-0 w-100 top-0`}>
      <Container className="d-flex position-relative justify-content-between">
        <Link href="/" className={`${styles.logo} mt-1`}>
          <MyImage src={"/images/logo.svg"} alt="logo" width={129} height={45} />
        </Link>
        <div className="d-flex align-items-center">
          <nav className={`${styles.nav} d-none d-md-flex align-items-center`}>
            <Link href="/how-to-play">How to play</Link>
            <Link href="/about-us">About us</Link>
            {/* <div className={styles.navWrap}>
              <Link href="/" className={`${styles.outlineNav} btnShape d-block`}>Play Now</Link>
            </div>
            <Link href="/" className={`${styles.btnNav} btnShape`}>Download Now</Link> */}
          </nav>
          <Button variant="link" className={`${styles.toggleIcon}`} onClick={handleShow}>
            <MyImage src={"/images/icons/menu-icon.svg"} alt="menu" width={24} height={24} />
          </Button>
        </div>
      </Container>
      <Offcanvas className={styles.sidemenu} show={show} onHide={handleClose} placement="end">
        <Button variant="link" className={`${styles.crossIcon} d-md-none position-absolute top-0 end-0 m-3`} onClick={handleClose}>
          <MyImage src={"/images/icons/cross-icon.svg"} alt="menu" width={24} height={24} />
        </Button>
        <Offcanvas.Body className={`${styles.menuBody} d-flex flex-column`}>
          <nav className={`${styles.menu} d-flex flex-column xl-text`}>
            <Link onClick={handleClose} href="/">Home</Link>
            <Link onClick={handleClose} href="/about-us">About Us</Link>
            <Link onClick={handleClose} href="/how-to-play">How to Play?</Link>
            <Link onClick={handleClose} href="/blogs/news-and-media">News & Media</Link>
            <Link onClick={handleClose} href="/blogs">Blog</Link>
            <Link onClick={handleClose} href="/faqs">FAQ</Link>
            <Link onClick={handleClose} href="/blogs/legalities">Legalities</Link>
            <Link onClick={handleClose} href="/contact-us">Contact us</Link>
            <Link onClick={handleClose} href="/blogs/privacy-policy">Policies</Link>
            <Link onClick={handleClose} href="/blogs/cancellation-refund">Cancellation & Refund</Link>
            <Link onClick={handleClose} href="/blogs/responsible-gaming">Responsible gaming</Link>
            <Link onClick={handleClose} href="/blogs/terms-condition">Terms & Condition</Link>
          </nav>
          <div className="my-auto">
            <div className={`${styles.appQR} d-none d-md-block position-relative mx-auto mt-4 mt-xl-5 mb-2`}>
              <MyImage src={ENV.BASE_URL + "/images/qr-code.png"} alt="icon" width={70} height={70} />
            </div>
            <p className="text-center">Download the official TFG App</p>
            <div className="d-flex justify-content-center">
              <div className={`${styles.appIcon} position-relative mx-1`}>
                <MyImage src={ENV.BASE_URL + "/images/icons/app-store-icon.png"} alt="icon" width={187} height={62} />
              </div>
              <div className={`${styles.appIcon} position-relative mx-1`}>
                <MyImage src={ENV.BASE_URL + "/images/icons/play-store-icon.png"} alt="icon" width={226} height={62} />
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  )
}

export default MainHeader
