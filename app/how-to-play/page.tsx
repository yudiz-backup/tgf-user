import { getHowToPlayData } from '@/shared/data-sources/api-handlers'
import getQueryClient from '@/shared/lib/get-query-client'
import { dehydrate } from '@tanstack/react-query'
import RQHydrate from '@/shared/components/RQHydrate'
import HowToPlayPage from '@/shared/components/howToPlayContent/HowToPlayPage'
import { Metadata } from 'next'

export const revalidate = 0

export const metadata: Metadata = {
  title: "How to Play",
  description: "Download the official TFG App",
};
export default async function HowToPlay() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['howToPlay'],
    queryFn: getHowToPlayData,
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <RQHydrate state={dehydratedState}>
      <HowToPlayPage />
    </RQHydrate>
  )
}
