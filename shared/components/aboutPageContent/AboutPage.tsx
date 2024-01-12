'use client'
import VideoBanner from '../videoBanner'
import BrandContent from './brandContent'
import MeetOurTeam from './meetOurTeam'
import WhoWeAre from './whoWeAre'
import VisionMission from './visionMission'
import FoundersPartners from '../homePageContent/foundersPartners'
import PlayerFormat from './playerFormat'
import AppRating from './appRating'
import { getAboutData } from '@/shared/data-sources/api-handlers'
import { useQuery } from '@tanstack/react-query'
import CTASection from '../ctaSection'
import MetaTags from '../Meta'
import { useScrollPercentage } from '@/shared/Hooks/useScrollPercentage'

export default function AboutPage() {
  const { data } = useQuery({
    queryKey: ["about"],
    queryFn: getAboutData,
  });
  useScrollPercentage()
  return (
    <>
      <VideoBanner title="About Us" videoLink={data?.sBackGroundVideo} />
      <BrandContent content={data?.sBrandContent} />
      <MeetOurTeam
        data={{
          team: data?.aTeamMembers,
          description: data?.sOurTeamDescription,
        }}
      />
      <WhoWeAre
        description={data?.sWhoWeAreContent}
        image={data?.sWhoWeAreBackImage}
      />
      <VisionMission
        description={data?.sOurVisionContent}
        images={{
          background: data?.sOurVisionBackImage,
          side: data?.sOurVisionSideImage,
        }}
      />
      <FoundersPartners foundersList={data?.aFounders} />
      <PlayerFormat
        content={data?.aDynamicPlayerContent}
        images={data?.aDynamicPlayerContentImages}
      />
      <AppRating />
      <CTASection />
    </>
  );
}
