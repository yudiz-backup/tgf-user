import HomePage from '@/shared/components/homePageContent/HomePage'
import RQHydrate from '@/shared/components/RQHydrate'
import { getHomeData } from '@/shared/data-sources/api-handlers'
import getQueryClient from '@/shared/lib/get-query-client'
import { dehydrate } from '@tanstack/react-query'

export const revalidate = 0
export default async function Home() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['home'],
    queryFn: getHomeData,
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <RQHydrate state={dehydratedState}>
      <HomePage />
    </RQHydrate>
  )
}
