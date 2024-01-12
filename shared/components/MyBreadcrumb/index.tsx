'use client';
import React, { type ReactNode } from "react"
import { Breadcrumb } from "react-bootstrap";

import styles from './style.module.scss'

type BreadcrumbType = {
  className?: string | undefined,
  title?: string,
  categoryName?:string
}

function MyBreadcrumb({ className ,categoryName}: BreadcrumbType): ReactNode {
  return (
    <Breadcrumb className={`${styles.breadcrumb} ${className} mb-2 xl-text`}>
      <Breadcrumb.Item className={`${styles.breadcrumbItem}`} href="/faqs">FAQ</Breadcrumb.Item>
      <Breadcrumb.Item className={`${styles.breadcrumbItem}`} active>{categoryName || "Scores & Points FAQ"}</Breadcrumb.Item>
    </Breadcrumb>
  )
}

export default MyBreadcrumb
