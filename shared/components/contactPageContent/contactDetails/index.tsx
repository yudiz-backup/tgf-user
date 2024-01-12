"use client";
import React, { useState, type ReactNode, useEffect } from "react";

import styles from "./style.module.scss";
import MyImage from "../../ui/myImage";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {
  addContactUsdata,
  getContactUsData,
} from "@/shared/data-sources/api-handlers";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { ContactUsFormInterface } from "@/shared/ts/interfaces/generic.interface";
// import MetaTags from "../../Meta";
import { analytics } from "../../firebaseConfig/config";
import { logEvent } from "firebase/analytics";

function ContactDetails(): ReactNode {
  const { register, handleSubmit, formState, reset } =
    useForm<ContactUsFormInterface>();
  const { errors } = formState;
  const [isSubmit, setIsSubmit] = useState(false);

  const { data } = useQuery({
    queryKey: ["contactUs"],
    queryFn: getContactUsData,
  });

  const { mutate } = useMutation({
    mutationFn: addContactUsdata,
    onSuccess: () => {
      reset();
      setIsSubmit(true);
    },
  });

  const onSubmit = (data: any) => {
    // Handle form submission logic
    const payload = {
      sFirstName: data.firstName,
      sLastName: data.lastName,
      sEmail: data.email,
      sMessage: data.message,
    };
    logEvent(analytics, 'form_submit', {
      name: 'contact_us',
      form_name: 'contact_us', // Replace with the actual form_name
      form_submit_text: 'send', // Replace with the actual form_submit_text
    });
    window.fbq('trackCustom', 'form_submit', {
      name: 'contact_us',
      form_name: 'contact_us', // Replace with the actual form_name
      form_submit_text: 'send', // Replace with the actual form_submit_text
    });
    mutate(payload);
  };

  useEffect(() => {
    if (isSubmit) {
      setTimeout(() => {
        setIsSubmit(false);
      }, 2000);
    }
  }, [isSubmit]);

  return (
    data && (
      <>
        {/* <MetaTags data={data?.oSeo || {}} /> */}
        <div
          className={`${styles.contactSection} common-section position-relative`}
        >
          <Container>
            <div className={`${styles.contactBlock}`}>
              <Row className="gx-0 flex-column-reverse flex-md-row">
                <Col md={5}>
                  <div
                    className={`${styles.contactDetails} mt-4 mt-md-0 mx-2 mx-md-0 text-center text-md-start h-100 d-flex flex-column xl-text common-section pb-3 pb-md-4 pb-xl-5 position-relative`}
                  >
                    <h5>Contact Information</h5>
                    <p>Say something to start a live chat!</p>
                    <div className="my-auto pb-md-2">
                      <p>
                        <a
                          className="d-inline-flex flex-column flex-md-row mb-3 mb-xl-4"
                          href={`tel:${data?.sNumber}`}
                        >
                          <span
                            className={`${styles.icon} mx-auto me-md-2 me-lg-4 mb-2 mb-md-0`}
                          >
                            <MyImage
                              src={"/images/icons/phone-call-icon.svg"}
                              alt="icon"
                              width={24}
                              height={24}
                            />
                          </span>
                          {data?.sNumber}
                        </a>
                      </p>
                      <p>
                        <a
                          className="d-inline-flex flex-column flex-md-row mb-3 mb-xl-4"
                          href={`mailto:${data?.sEmail}`}
                        >
                          <span
                            className={`${styles.icon} mx-auto me-md-2 me-lg-4 mb-2 mb-md-0`}
                          >
                            <MyImage
                              src={"/images/icons/email-icon.svg"}
                              alt="icon"
                              width={24}
                              height={24}
                            />
                          </span>
                          {data?.sEmail}
                        </a>
                      </p>
                      <p>
                        <a
                          className="d-inline-flex flex-column flex-md-row mb-3 mb-xl-4"
                          href={`https://www.google.com/maps?q=${data?.sAddress}`}
                          target="_blank"
                        >
                          <span
                            className={`${styles.icon} mx-auto me-md-2 me-lg-4 mb-2 mb-md-0`}
                          >
                            <MyImage
                              src={"/images/icons/location-icon.svg"}
                              alt="icon"
                              width={24}
                              height={24}
                            />
                          </span>
                          {data?.sAddress}
                        </a>
                      </p>
                    </div>
                    <span
                      className={`${styles.shape} position-absolute bottom-0 end-0`}
                    >
                      <MyImage
                        src={"/images/icons/circle-shape.svg"}
                        alt="icon"
                        width={208}
                        height={209}
                      />
                    </span>
                  </div>
                </Col>
                <Col md={7}>
                  <div className={`${styles.formBlock}`}>
                    <div className="mb-2 mb-md-4">
                      <h3 className="fw-bold text-center text-md-start">
                        Get In Touch
                      </h3>
                    </div>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <Row className="gx-3 gx-lg-4">
                        <Col sm={6}>
                          <Form.Group className="mb-3" controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter your first name"
                              {...register("firstName", {
                                required: "First Name is required",
                                pattern: {
                                  value: /^[^\s].*$/,
                                  message: "Invalid name",
                                },
                              })}
                            />
                            {errors.firstName && (
                              <p className="text-danger">
                                {errors.firstName.message}
                              </p>
                            )}
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                          <Form.Group className="mb-3" controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter your last name"
                              {...register("lastName", {
                                required: "Last Name is required",
                                pattern: {
                                  value: /^[^\s].*$/,
                                  message: "Invalid name",
                                },
                              })}
                            />
                            {errors.lastName && (
                              <p className="text-danger">
                                {errors.lastName.message}
                              </p>
                            )}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Your Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter your email"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value:
                                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/,
                              message: "Enter a valid email address",
                            },
                          })}
                        />
                        {errors.email && (
                          <p className="text-danger">{errors.email.message}</p>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="message">
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          {...register("message", {
                            required: "Message is required",
                          })}
                        />
                        {errors.message && (
                          <p className="text-danger">
                            {errors.message.message}
                          </p>
                        )}
                      </Form.Group>
                      <Button
                        className={`${styles.submit} btnShape mt-1 mb-2`}
                        type="submit"
                      >
                        Send
                      </Button>
                      {isSubmit && (
                        <p className="text-success">Form Submitted</p>
                      )}
                    </Form>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </>
    )
  );
}

export default ContactDetails;
