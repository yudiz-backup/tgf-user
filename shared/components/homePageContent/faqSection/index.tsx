'use client';
import React, { type ReactNode } from "react"
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Container } from "react-bootstrap";

import styles from './style.module.scss'
import FaqList from "../../faqList";
import { getQuestionCategoryData } from "@/shared/data-sources/api-handlers";

function FaqSection(): ReactNode {
  const { data } = useQuery({
    queryKey: ['faqQuestion'],
    queryFn: () => getQuestionCategoryData({})
  })

  return (data?.length &&
    <>
      <div className={`${styles.faqSection} common-section position-relative`}>
        <Container>
          <h2 className="text-center text-md-start">TFG FAQ’S</h2>
          <h5 className="fw-normal text-center text-md-start">Clear your doubts related to the Fantasy Sports and TFG platform</h5>
          <FaqList isHomePage={true} />
          <div className="text-center mt-3 mt-md-4 mt-xxl-5">
            <Link href="/faqs" className="btnShape text-uppercase mt-md-4 mt-xxl-5">Show more +</Link>
          </div>
        </Container>
      </div>
    </>
  )
}

export default FaqSection
