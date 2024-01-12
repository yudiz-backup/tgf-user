import { Container } from "react-bootstrap";

import styles from './style.module.scss'
import FaqList from "@/shared/components/faqList";
import MyBreadcrumb from "../../MyBreadcrumb";

type FaqDetailsType = {
  categoryId: string,
  categoryName: string,
}

export default async function FaqDetails({categoryId,categoryName}:FaqDetailsType) {
  return (
    <section className={styles.faqDetails}>
      <Container>
        <MyBreadcrumb categoryName={categoryName}/>
        <h3 className="text-center mb-3 mb-md-5 pb-md-3 pt-3 pt-md-0">{categoryName}</h3>
        <FaqList categoryId={categoryId}/>
      </Container>
    </section>
  )
}
