import RQHydrate from "@/shared/components/RQHydrate";
import AboutPage from "@/shared/components/aboutPageContent/AboutPage";
import { SITE_NAME } from "@/shared/constants/meta-constant";
import { getAboutData } from "@/shared/data-sources/api-handlers";
import ENV from "@/shared/envs";
import getQueryClient from "@/shared/lib/get-query-client";
import { dehydrate } from "@tanstack/react-query";
import { Metadata } from "next";

export const revalidate = 0;

// export const metadata: Metadata = {
//   title: "About us",
//   description: "Download the official TFG App",
// };

export async function generateMetadata(): Promise<Metadata> {
// { params, searchParams }: Props,
// parent: ResolvingMetadata
  // read route params
  // const id = params.id

  // fetch data
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["about"],
    queryFn: getAboutData,
  });
  const dehydratedState: any = dehydrate(queryClient);

  console.log("dehydratedState", dehydratedState);

  return {
    title: "About us",
    description: "Download the official TFG App",
    keywords:dehydratedState.queries[0]?.state?.data?.oSeo?.aKeywords || [],
    robots: 'Follow, Index',
    metadataBase:dehydratedState.queries[0]?.state?.data?.oSeo?.sCUrl || ENV.BASE_URL,
    openGraph: {
      title:dehydratedState.queries[0]?.state?.data?.oSeo?.data?.sTitle || dehydratedState.queries[0]?.state?.data?.oSeo?.data?.oFB?.sTitle || SITE_NAME,
      url:  new URL(dehydratedState.queries[0]?.state?.data?.oSeo?.data?.sCurl || ENV.BASE_URL),
      siteName: SITE_NAME,
      description:  dehydratedState.queries[0]?.state?.data?.oSeo?.data?.oFB?.sDescription || dehydratedState.queries[0]?.state?.data?.oSeo?.data?.sDescription,
      locale:"en_US"
    }, 
    

  };
  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  // return {
  //   title: product.title,
  //   openGraph: {
  //     images: ['/some-specific-page-image.jpg', ...previousImages],
  //   },
  // }
}
export default async function About() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["about"],
    queryFn: getAboutData,
  });
  const dehydratedState: any = dehydrate(queryClient);
  // const data = await getHomeData();
  // console.log("🚀 ~ file: page.tsx:31 ~ Home ~ data:", data);
  // console.log("dehydratedState", dehydratedState.queries[0]?.state?.data?.oSeo);

  return (
    <>
      {/* <MetaTags data={COMMON__META_CONTENT} /> */}
      <RQHydrate state={dehydratedState}>
        <AboutPage />
      </RQHydrate>
    </>
  );

  /* return (
    <>
      <VideoBanner title="About" />
      <BrandContent />
      <MeetOurTeam />
      <WhoWeAre />
      <VisionMission />
      <FoundersPartners />
      <PlayerFormat />
      <AppRating />
    </>
  ) */
}
