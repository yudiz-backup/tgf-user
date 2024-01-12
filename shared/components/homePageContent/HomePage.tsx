"use client";

import React from "react";
import Banner from "./banner";
import OurResults from "./ourResults";
import Tagline from "./tagline";
import WhyChooseUs from "./whyChooseUs";
import CTASection from "../ctaSection";
import HowToPlaySection from "./howToPlaySection";
import FantasyApp from "./fantasyApp";
import DownloadApp from "./downloadApp";
import Testimonials from "./testimonials";
import FoundersPartners from "./foundersPartners";
import MediaGlimpse from "./mediaGlimpse";
import HightlighedArticles from "./hightlighedArticles";
import FaqSection from "./faqSection";
import { useQuery } from "@tanstack/react-query";
import { getAboutData, getHomeData } from "@/shared/data-sources/api-handlers";
// import MetaTags from "../Meta";
import { useScrollPercentage } from "@/shared/Hooks/useScrollPercentage";

export default function HomePage() {
  const { data: homePageData } = useQuery({
    queryKey: ["home"],
    queryFn: getHomeData,
  });
  const { data: aboutUsPageData } = useQuery({
    queryKey: ["about"],
    queryFn: getAboutData,
  });
 useScrollPercentage()
 
  return (
    <>
      {/* <MetaTags data={homePageData?.oSeo || {}} /> */}
      <Banner data={homePageData?.aBackGroundImages} />
      {homePageData?.bOurResultsSwitch && (
        <OurResults data={homePageData?.aOurResults} />
      )}
      <Tagline data={homePageData?.sTagLine} />
      <WhyChooseUs
        list={homePageData?.aWhyChooseUs}
        sliderData={homePageData?.aHeroImages}
      />
      <HowToPlaySection />
      <FantasyApp />
      <DownloadApp mockupImage={homePageData?.sDownloadMokeUpImage || ""} sideImage={homePageData?.sDownloadSideImage || ""}/>
      <Testimonials />
      <FoundersPartners foundersList={aboutUsPageData?.aFounders} />
      <MediaGlimpse />
      <HightlighedArticles />
      <FaqSection />
      <CTASection />
    </>
  );
}
