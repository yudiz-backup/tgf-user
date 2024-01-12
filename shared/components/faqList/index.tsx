"use client";
import React, { type ReactNode } from "react";
import { Accordion, Col, Row } from "react-bootstrap";
import styles from "./style.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getQuestionCategoryData } from "@/shared/data-sources/api-handlers";

function FaqList({
  categoryId,
  isHomePage = false,
}: {
  categoryId?: string;
  isHomePage?: boolean;
}): ReactNode {
  const { data } = useQuery({
    queryKey: ["questionCategoryId"],
    queryFn: () => getQuestionCategoryData({ id: categoryId }),
  });
  const displayedData = isHomePage ? data?.slice(0, 10) || [] : data || [];

  return (
    <>
      <div className={`${styles.faqList} position-relative`}>
        <Accordion>
          {data?.length ? (
            <Row className="justify-content-between">
              {displayedData?.map((ques, index) => (
                <Col key={ques._id} md={6} lg={6} className={`${styles.col}`}>
                  <Accordion.Item
                    eventKey={index.toString()}
                    className={`${styles.item}`}
                  >
                    <Accordion.Header className={`${styles.head}`}>
                      <span className="me-md-1 me-md-3">{ques.sQuestion}</span>
                    </Accordion.Header>
                    <Accordion.Body className={`${styles.body}`}>
                      {ques.sAnswer}
                    </Accordion.Body>
                  </Accordion.Item>
                </Col>
              ))}
            </Row>
          ) : (
            "No data found"
          )}
        </Accordion>
      </div>
    </>
  );
}

export default FaqList;
