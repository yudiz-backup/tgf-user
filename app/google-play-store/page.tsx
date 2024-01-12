
import RQHydrate from '@/shared/components/RQHydrate';
import GooglePlayContent from '@/shared/components/googlePlayContent'
import { getGooglePlayStoreData } from '@/shared/data-sources/api-handlers';
import getQueryClient from '@/shared/lib/get-query-client';
import { dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

export const revalidate = 0
export const metadata: Metadata = {
  title: "Google Play Store",
  description: "Download the official TFG App",
};
export default async function GooglePlayStore() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['PLAYSTORE'],
    queryFn: getGooglePlayStoreData,
  })
  const dehydratedState = dehydrate(queryClient)
  return (
    <RQHydrate state={dehydratedState}>
      <GooglePlayContent />
    </RQHydrate>
  );
}