"use client";
import React from "react";
import styles from "./style.module.scss";
import MyImage from "../../ui/myImage";
import { getTestimonialDataAboutUs } from "@/shared/data-sources/api-handlers";
import { useQuery } from "@tanstack/react-query";
import ENV from "@/shared/envs";

function AppRating() {
  const { data: testimonialData } = useQuery({
    queryKey: ["testimonialAboutUs"],
    queryFn: getTestimonialDataAboutUs,
  });

  return (
    testimonialData && testimonialData?.length > 0 && (
      <>
        <div
          className={`${styles.appRating} common-section position-relative overflow-hidden`}
        >
          <h2 className="text-center mb-3 mb-md-4">
            App Rating and User Reviews
          </h2>
          <div>
            <div className={`${styles.list} d-flex flex-nowrap`}>
              <div className={`${styles.items} d-flex flex-nowrap`}>
                {testimonialData?.slice(0, 5).map((review) => {
                  return (
                    <div
                      key={review._id}
                      className={`${styles.item} p-2 m-2 flex-shrink-0`}
                    >
                      <p> {"⭐".repeat(review.nRating)}</p>
                      <p>{review?.sReview}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div
                            className={`${styles.userPic} rounded-circle overflow-hidden me-2 me-md-3`}
                          >
                            <MyImage
                              src={ENV.S3_MEDIA_URL + review?.sProfileImagePath}
                              alt="user"
                              width={40}
                              height={40}
                            />
                          </div>
                          <p className="mb-0 fw-bold">{review?.sUserName}</p>
                        </div>
                        <p className="small-text mb-0">
                          {review?.sDesignation}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={`${styles.list} d-flex flex-nowrap`}>
              <div className={`${styles.items} d-flex flex-nowrap`}>
                {testimonialData?.slice(5, 10).map((review) => {
                  return (
                    <div
                      key={review._id}
                      className={`${styles.item} p-2 m-2 flex-shrink-0`}
                    >
                      <p> {"⭐".repeat(review.nRating)}</p>
                      <p>{review?.sReview}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div
                            className={`${styles.userPic} rounded-circle overflow-hidden me-2 me-md-3`}
                          >
                            <MyImage
                              src={ENV.S3_MEDIA_URL + review?.sProfileImagePath}
                              alt="user"
                              width={40}
                              height={40}
                            />
                          </div>
                          <p className="mb-0 fw-bold">{review?.sUserName}</p>
                        </div>
                        <p className="small-text mb-0">
                          {review?.sDesignation}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={`${styles.list} d-flex flex-nowrap`}>
              <div className={`${styles.items} d-flex flex-nowrap`}>
                {testimonialData
                  ?.slice(10, testimonialData?.length)
                  .map((review) => {
                    return (
                      <div
                        key={review._id}
                        className={`${styles.item} p-2 m-2 flex-shrink-0`}
                      >
                        <p> {"⭐".repeat(review.nRating)}</p>
                        <p>{review?.sReview}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <div
                              className={`${styles.userPic} rounded-circle overflow-hidden me-2 me-md-3`}
                            >
                              <MyImage
                                src={
                                  ENV.S3_MEDIA_URL + review?.sProfileImagePath
                                }
                                alt="user"
                                width={40}
                                height={40}
                              />
                            </div>
                            <p className="mb-0 fw-bold">{review?.sUserName}</p>
                          </div>
                          <p className="small-text mb-0">
                            {review?.sDesignation}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default AppRating;
