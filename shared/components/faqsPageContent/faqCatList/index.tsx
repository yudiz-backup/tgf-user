'use client';
import React, { useState, type ReactNode, useEffect } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import styles from './style.module.scss'
import MyImage from "../../ui/myImage";
import { useQuery } from "@tanstack/react-query";
import { getFaqCategoryData, getQuestionCategoryData } from "@/shared/data-sources/api-handlers";
import ENV from "@/shared/envs";
import Link from "next/link";
import { FaqCategoryInterFace } from "@/shared/ts/interfaces/home.interface";

function FaqCatList(): ReactNode {
  const [search, setSearch] = useState("")
  const [category, setCat] = useState<any>([])
  const { data } = useQuery({
    queryKey: ['faqCategory'],
    queryFn:  getFaqCategoryData,
  })

  const { data : questionRes } = useQuery({
    queryKey: ['questionCategoryId',search],
    queryFn: ()=> getQuestionCategoryData({search : search}),
    enabled: !!search,
  })
useEffect(() => {
  if (data) {
    setCat(data);
  }
}, [data]);

useEffect(()=>{
  if(questionRes && search){
    setCat(questionRes)
  }
  else if (!search){
    setCat(data)
  }

},[questionRes])

  return (
    <>
      <div className={`${styles.faqCatList} common-section position-relative`}>
        <Container>
          <h2 className="text-center">Hello, how can we help?</h2>
          <div className={`${styles.search} position-relative mb-4 mb-md-5`}>
            <span className={`${styles.searchIcon} d-block position-absolute top-50 start-0 translate-middle-y ms-3`}>
              <MyImage src={ "/images/icons/search-input-icon.svg"} alt="icon" width={24} height={24} />
            </span>
            <Form.Control value={search} onChange={(e)=>setSearch(e.target.value)} className={`${styles.input} border-0 mb-0`} type="text" placeholder="Type your question" />
            <Button onClick={()=>setSearch("")} disabled={!search} className={`${styles.clear} d-block text-uppercase position-absolute top-50 end-0 translate-middle-y me-3`}>CLEAR</Button>
          </div>
          {category?.length > 0  ?
          <Row className={`${styles.list} pt-md-2 pt-lg-5 gx-2 gx-md-4`}>
            {
              category?.map((cat:FaqCategoryInterFace) => {
                return (
                  <Col key={cat._id} xs={6} lg={4}>
                    <Link href={`/faqs/${cat._id}`}>
                    <div className={`${styles.wrap}`}>
                      <div className={`${styles.item}`}>
                        <span className={`${styles.icon} d-block`}>
                          <MyImage src={ENV.S3_MEDIA_URL + (cat.sPath || cat?.categoryDetails?.[0]?.sPath)} alt="icon" width={80} height={80} />
                        </span>
                        <h4>{cat?.sTitle || cat?.categoryDetails?.[0]?.sTitle}</h4>
                        <p className="mb-0">{cat?.sDescription || cat?.categoryDetails?.[0]?.sDescription}</p>
                      </div>
                    </div>
                    </Link> 
                  </Col>
                )
              })
            }
          </Row>  :  "No data available"}
        </Container >
      </div>
    </>
  )
}

export default FaqCatList
