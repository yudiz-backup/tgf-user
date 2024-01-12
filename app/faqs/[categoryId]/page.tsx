import RQHydrate from "@/shared/components/RQHydrate";
import CommonBanner from "@/shared/components/commonBanner";
import CTASection from "@/shared/components/ctaSection";
import FaqDetails from "@/shared/components/faqsPageContent/faqDetails";
import { getQuestionCategoryData } from "@/shared/data-sources/api-handlers";
import getQueryClient from "@/shared/lib/get-query-client";
import { dehydrate } from "@tanstack/react-query";

export const revalidate = 0
export default async function FAQs({ params }: { params: { categoryId: string } }) {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['questionCategoryId'],
    queryFn: () => getQuestionCategoryData({ id: params?.categoryId, search: "" }),
  })
  const dehydratedState: any = dehydrate(queryClient)

  return (
    <RQHydrate state={dehydratedState}>
      <CommonBanner title="Frequently Asked Questions (FAQ’s)" banner="/images/banner/faqs-banner.jpg" titleClass="mt-2 mt-md-3" />
      <FaqDetails categoryName={dehydratedState.queries?.[0]?.state?.data?.[0]?.category?.sTitle} categoryId={params?.categoryId} />
      <CTASection />
    </RQHydrate>
  )
}
