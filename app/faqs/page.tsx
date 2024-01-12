import RQHydrate from "@/shared/components/RQHydrate";
import CommonBanner from "@/shared/components/commonBanner";
import CTASection from "@/shared/components/ctaSection";
import FaqCatList from "@/shared/components/faqsPageContent/faqCatList";
import { getFaqCategoryData } from "@/shared/data-sources/api-handlers";
import getQueryClient from "@/shared/lib/get-query-client";
import { dehydrate } from "@tanstack/react-query";
import { Metadata } from "next";

export const revalidate = 0
export const metadata: Metadata = {
  title: "Faqs",
  description: "Download the official TFG App",
};
export default async function FAQs() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['faqCategory'],
    queryFn: getFaqCategoryData,
  })
  const dehydratedState = dehydrate(queryClient)
  return (
    <RQHydrate state={dehydratedState}>
      <CommonBanner title="Frequently Asked Questions (FAQ’s)" banner="/images/banner/faqs-banner.jpg" titleClass="mt-2 mt-md-3" />
      <FaqCatList />
      <CTASection />
    </RQHydrate>
  )
}
