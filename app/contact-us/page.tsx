import RQHydrate from "@/shared/components/RQHydrate";
import CommonBanner from "@/shared/components/commonBanner";
import ContactDetails from "@/shared/components/contactPageContent/contactDetails";
import CTASection from "@/shared/components/ctaSection";
import { getContactUsData } from "@/shared/data-sources/api-handlers";
import ENV from "@/shared/envs";
import getQueryClient from "@/shared/lib/get-query-client";
import { dehydrate } from "@tanstack/react-query";
import { Metadata } from "next";

export const revalidate = 0

export const metadata: Metadata = {
  title: "Contact us",
  description: "Download the official TFG App",
};
export default async function Contact() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['contactUs'],
    queryFn: getContactUsData,
  })
  const dehydratedState: any = dehydrate(queryClient)
  return (
    <RQHydrate state={dehydratedState}>
      <CommonBanner title="Contact Us" banner={ENV.S3_MEDIA_URL + dehydratedState.queries?.[0]?.state?.data.sBackGroundImage} titleClass="mb-4" />
      <ContactDetails />
      <CTASection />
    </RQHydrate>
  )
}
