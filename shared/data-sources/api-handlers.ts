import GLOBAL_CONSTANTS from '../constants'
import { request } from '../services/api.service'
import { DefaultAPIResInterface } from '../ts/interfaces/generic.interface'
import { GooglePlayStoreInterFace } from '../ts/interfaces/googlePlayStore.interface'
import {
  AboutUsInterface,
  AddContactUsDataParamsInterFace,
  ContactUsInterFace,
  CtaSectionInterFace,
  FaqCategoryInterFace,
  FeatureSectionInterface,
  FooterInterface,
  GetAppLinkInterface,
  HomePageDataInterface,
  HowToPlayDataInterface,
  MediaGlimInterface,
  QuestionCategoryInterFace,
  TestimonialInterface,
} from '../ts/interfaces/home.interface'
import { NewsItem, NewsItemInterFace } from '../ts/interfaces/news.interface'
import { ReviewListInterface } from '../ts/interfaces/review.interface'

export async function getHomeData(): Promise<HomePageDataInterface> {
  const res: DefaultAPIResInterface<HomePageDataInterface> = await request({
    url: `${GLOBAL_CONSTANTS.apiPath.admin}/home/v1?ePage=${GLOBAL_CONSTANTS.apiPageKeys.home}`,
  })
  return res.data
}
export async function getHowToPlayData(): Promise<HowToPlayDataInterface> {
  const res: DefaultAPIResInterface<HowToPlayDataInterface> = await request({
    url: `${GLOBAL_CONSTANTS.apiPath.admin}/home/v1?ePage=${GLOBAL_CONSTANTS.apiPageKeys.howToPlay}`,
  })
  return res.data
}
export async function getFeatureSectionData(): Promise<FeatureSectionInterface> {
  const res: DefaultAPIResInterface<FeatureSectionInterface> = await request({
    url: `${GLOBAL_CONSTANTS.apiPath.admin}/home/v1?ePage=${GLOBAL_CONSTANTS.apiPageKeys.feature}`,
  })
  return res.data
}
export async function getTestimonialData(): Promise<TestimonialInterface[]> {
  const res: DefaultAPIResInterface<TestimonialInterface[]> = await request({
    url: `${GLOBAL_CONSTANTS.apiPath.admin}/testimonial/v1?type=T`,
  })
  return res.data
}
export async function getMediaGlimData(): Promise<MediaGlimInterface> {
  const res: DefaultAPIResInterface<MediaGlimInterface> = await request({
    url: `${GLOBAL_CONSTANTS.apiPath.admin}/home/v1?ePage=${GLOBAL_CONSTANTS.apiPageKeys.mediaGlim}`,
  })
  return res.data
}
export async function getFooterData(): Promise<FooterInterface> {
  const res: DefaultAPIResInterface<FooterInterface> = await request({
    url: `${GLOBAL_CONSTANTS.apiPath.admin}/home/v1?ePage=${GLOBAL_CONSTANTS.apiPageKeys.footer}`,
  })
  return res?.data
}
export async function getAboutData(): Promise<AboutUsInterface> {
  const res: DefaultAPIResInterface<AboutUsInterface> = await request({
    url: `${GLOBAL_CONSTANTS.apiPath.admin}/home/v1?ePage=${GLOBAL_CONSTANTS.apiPageKeys.aboutus}`,
  })
  return res.data
}

export async function getFaqCategoryData(): Promise<FaqCategoryInterFace[]> {
  const res: DefaultAPIResInterface<FaqCategoryInterFace[]> = await request({
    url: `${GLOBAL_CONSTANTS.apiPath.admin}/faq-category/v1`,
  })
  return res.data
}


interface QuestionSearchInterface  {
id?:string,
search?:string
}
interface QuestionSearchInterface {
  id?: string;
  search?: string;
}

export async function getQuestionCategoryData(data: QuestionSearchInterface): Promise<QuestionCategoryInterFace[]> {
  let url = `${GLOBAL_CONSTANTS.apiPath.admin}/question/v1`;
  // Conditionally add the id parameter to the URL if it's present
  if (data.id) {
    url += `?id=${data.id}`;
  }

  // Conditionally add the search parameter to the URL if it's present and has a value
  if (data.search && data.search.trim() !== '') {
    // Check if there are existing query parameters
    const separator = url.includes('?') ? '&' : '?';
    url += `${separator}search=${data.search}`;
  }

  const res: DefaultAPIResInterface<QuestionCategoryInterFace[]> = await request({
    url: url,
  });

  return res.data;
}


export async function getContactUsData(): Promise<ContactUsInterFace> {
  const res: DefaultAPIResInterface<ContactUsInterFace> = await request({
    url: `${GLOBAL_CONSTANTS.apiPath.admin}/home/v1?ePage=${GLOBAL_CONSTANTS.apiPageKeys.contactUs}`,
  })
  return res.data
}

export async function addContactUsdata(input: AddContactUsDataParamsInterFace):  Promise<any>{
  const res: any = await request({
    url: `${GLOBAL_CONSTANTS.apiPath.admin}/contact-us/v1`,
    data: {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: input ? JSON.stringify(input) : undefined,
    }
  });
  return res.data;
}

// shared/data-sources/api-handlers.ts

export async function getGooglePlayStoreData(): Promise<GooglePlayStoreInterFace> {
  const res: DefaultAPIResInterface<GooglePlayStoreInterFace> = await request({
    url: `${GLOBAL_CONSTANTS.apiPath.admin}/home/v1?ePage=${GLOBAL_CONSTANTS.apiPageKeys.googlePlayStore}`,
  })
  
  return res.data
}
export async function getReviewListData(limit:number): Promise<DefaultAPIResInterface<ReviewListInterface[]>> {
  const res: DefaultAPIResInterface<ReviewListInterface[]> = await request({
    url: `${GLOBAL_CONSTANTS.apiPath.admin}/review/v1?limit=${limit}`,
    params: { limit },
  })
  
  return res
}

export async function getTestimonialDataAboutUs(): Promise<TestimonialInterface[]> {
  const res: DefaultAPIResInterface<TestimonialInterface[]> = await request({
    url: `${GLOBAL_CONSTANTS.apiPath.admin}/testimonial/v1?type=A`,
  })
  return res.data
}

export async function getArticle(): Promise<NewsItemInterFace[]> {
  const res: NewsItemInterFace[] = await request({
    url: `/blogs/wp-json/wp/v2/news`,
  })
  return res
}

export async function getImageUrlNews(id:number): Promise<NewsItem> {
  const res: any = await request({
    url: `/blogs/wp-json/wp/v2/media/${id}`,
  })
  return res.media_details.sizes.full.source_url
}

export async function getCtaSectionData(): Promise<CtaSectionInterFace> {
  const res: DefaultAPIResInterface<CtaSectionInterFace> = await request({
    url: `${GLOBAL_CONSTANTS.apiPath.admin}/home/v1?ePage=${GLOBAL_CONSTANTS.apiPageKeys.download}`,
  })
  return res.data
}

export async function getAppLink(input: GetAppLinkInterface):  Promise<any>{
  const res: any = await request({
    url: `${GLOBAL_CONSTANTS.apiPath.admin}/sms/v1`,
    data: {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: input ? JSON.stringify(input) : undefined,
    }
  });
  return res.data;
}