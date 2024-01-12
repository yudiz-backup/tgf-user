import { SITE_NAME } from '@/shared/constants/meta-constant'
import { MetaInputInterface } from '@/shared/ts/interfaces/generic.interface'
import React, { type ReactNode } from "react"

type MetaTagsType = {
  data: MetaInputInterface
}
function MetaTags({ data } : MetaTagsType):ReactNode {
  const aKeywords = data?.aKeywords || [];

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   // Optionally, you can clean up the effect (scroll back to top) on component unmount
  //   return () => {
  //     window.scrollTo(0, 0);
  //   };
  // }, []); // Empty
 return (
  <>
  <meta name="Author" content={SITE_NAME} />
  <meta property="og:locale" content="en_US" />
  <meta name="description" content={data?.sDescription} />
  <meta name="robots" content='Follow, Index' />
  <meta property="og:title" content={data?.sTitle || data?.oFB?.sTitle || SITE_NAME} />
  <meta property="og:url" content={data?.sCUrl} />
  <meta property="og:site_name" content={SITE_NAME} />
  <meta property="og:description" content={data?.oFB?.sDescription || data?.sDescription} />
  <link rel="canonical" href={data?.sCUrl} />
  {aKeywords?.length > 0 && <meta name="keywords" content={aKeywords?.join(', ')} />}
  </>
 )
  
}

export default MetaTags
