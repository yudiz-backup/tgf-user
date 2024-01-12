'use client'
import VideoBanner from '../videoBanner'
import CTASection from '../ctaSection'
import VideoSection from './videoSection'
import HowToPlaySection from '../homePageContent/howToPlaySection'
import { useQuery } from '@tanstack/react-query'
import { getHowToPlayData } from '@/shared/data-sources/api-handlers'
import MetaTags from '../Meta'
import { useScrollPercentage } from '@/shared/Hooks/useScrollPercentage'

export default function HowToPlayPage() {
  const { data } = useQuery({
    queryKey: ['howToPlay'],
    queryFn: getHowToPlayData,
  })

  useScrollPercentage()
  return (
    <>
    <MetaTags data={data?.oSeo || {}} />
      <VideoBanner title='How To play ?' />
      <VideoSection videoList={data?.aVideoTutorial} />
      <HowToPlaySection isFull={true} stepData={data?.aHowToPlaySteps} />
      <CTASection />
    </>
  )
}
