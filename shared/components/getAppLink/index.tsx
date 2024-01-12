'use client';
import React, { useState, type ReactNode, useRef, useEffect } from "react"
import { Button, Form } from "react-bootstrap";

import styles from './style.module.scss'

import MyImage from "../ui/myImage";
import { useMutation } from "@tanstack/react-query";
import { getAppLink } from "@/shared/data-sources/api-handlers";
import { logEvent } from "firebase/analytics";
import { analytics } from "../firebaseConfig/config";

function GetAppLink(): ReactNode {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [hasError, setHasError] = useState(false); // New state for input error

  const handleInputChange = (event:any) => {
    const numericValue = event.target.value.replace(/\D/g, '');
    setInputValue(numericValue);
  };

  const { mutate } = useMutation({
    mutationFn: getAppLink,
    onSuccess: () => {
      setInputValue('');
      setSentSuccess(true);
      setHasError(false); // Reset the input error state
    },
  });

  const applinkHandler = () => {
    if (inputValue.length !== 10 && inputRef.current) {
      inputRef.current.focus();
      setHasError(true); // Set the input error state
    } else {
      setHasError(false); // Reset the input error state
      mutate({ sNumber: inputValue });
      logEvent(analytics, 'get_app_link_clicked');
    }
  };

  useEffect(() => {
    if (sentSuccess) {
      setTimeout(() => {
        setSentSuccess(false);
      }, 2000);
    }
  }, [sentSuccess]);

  return (
    <div className={`${styles.getAppLink} position-fixed bottom-0 start-50 translate-middle-x text-center d-none d-md-block`}>
      <MyImage className="position-relative start-0 bottom-0" src={"/images/icons/form-shape.svg"} alt="icon" width={773} height={78} />
      <div className="d-flex align-items-center position-absolute w-100 h-100 top-0 start-0">
        <p className="xl-text fw-bold mb-0">Download the official TFG App</p>
        <div className={`${styles.formBlock} d-flex flex-grow-1 align-items-center justify-content-center`}>
          <div className={`position-relative ${hasError && inputValue.length!==10 ? "input-error" : ""}`}>
            <Form.Control   ref={inputRef} className="bg-transparent input-error" type="text" placeholder="Enter Mobile Number" value={inputValue}
              onChange={(e) => handleInputChange(e)}/>
            <span className="position-absolute top-50 translate-middle-y start-0 ms-3 text-light">+91</span>
          </div>
          <Button className="ms-3 ms-lg-4 border-0 fw-semibold" onClick={applinkHandler}>{!sentSuccess ? "Get App Link" : "Message Sent"}</Button>
        </div>
      </div>
    </div>
  )
}

export default GetAppLink
