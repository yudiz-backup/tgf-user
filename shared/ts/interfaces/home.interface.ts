import { BannerType } from "@/shared/components/homePageContent/banner";
import { OurResultsType } from "@/shared/components/homePageContent/ourResults";
import { MetaInputInterface } from "./generic.interface";

export interface HomePageDataInterface {
  _id: string;
  ePage: string;
  aBackGroundImages: BannerType[];
  aHeroImages: [
    {
      nPriority: string | number;
      sPath: string;
    },
    {
      nPriority: string | number;
      sPath: string;
    }
  ];
  aOurResults: OurResultsType[];
  aWhyChooseUs: string[];
  sTagLine: string;
  nAppStoreRate: number;
  nCusSatisfaction: number;
  nDailyWinning: number;
  nPlayStoreRate: number;
  oSeo?: MetaInputInterface;
  bOurResultsSwitch?: boolean;
  sDownloadMokeUpImage?: string;
  sDownloadSideImage?: string;
}

export interface HowToPlayDataInterface {
  _id: string;
  ePage: string;
  aVideoTutorial: {
    nPriority: string | number;
    sPath: string;
  }[];
  aHowToPlaySteps: {
    sTitle: string;
    sDescription: string;
    sPath: string;
  }[];
  sBackGroundVideo: string;
  oSeo: MetaInputInterface;
  bHomePageSwitch: boolean;
}
export interface FeatureSectionInterface {
  _id: string;
  ePage: string;
  aFantasyFeature: {
    sTitle: string;
    sDescription: string;
    sPath: string;
    sImage: string;
  }[];
}
export interface TestimonialInterface {
  _id: string;
  sUserName: string;
  sReview: string;
  nRating: number;
  sProfileImagePath: string;
  sDesignation?: string;
  eType: string;
  dCreatedAt: string;
}
export interface MediaGlimInterface {
  _id: string;
  ePage: string;
  aMediaGlim: {
    sTitle: string;
    sPath: string;
    sUrl: string;
  }[];
}
export interface FooterInterface {
  _id: string;
  ePage: string;
  aSocialMedia: [
    {
      sTitle: string;
      sLink: string;
    }
  ];
  nNumber: string;
  sAppDisc: string;
  sAppName: string;
  sEmail: string;
  sCopyRight: string;
  sBackGroundImage: string;
  sAIGFCertified: string
}

export interface AboutUsInterface {
  _id: string;
  ePage: string;
  aDynamicPlayerContent: {
    sDescription: string;
    sTitle: string;
  }[];
  aDynamicPlayerContentImages: {
    nPriority: string;
    sPath: string;
  }[];
  aFounders: {
    sName: string;
    sDesignation: string;
    sDescription: string;
    sPath: string;
  }[];
  aTeamMembers: {
    sName: string;
    sDesignation: string;
    sPath: string;
  }[];
  sBrandContent: string;
  sFounderDescription: string;
  sOurTeamDescription: string;
  sOurVisionContent: string;
  sOurVisionSideImage: string;
  sWhoWeAreContent: string;
  sOurVisionBackImage: string;
  sWhoWeAreBackImage: string;
  sBackGroundVideo: string;
  oSeo?: MetaInputInterface;
}

export interface FaqCategoryInterFace {
  _id: string;
  sTitle: string;
  sDescription: string;
  sPath: string;
  categoryDetails?: {
    sTitle: string;
    sDescription: string;
    sPath: string;
  }[];
}

export interface QuestionCategoryInterFace {
  _id: string;
  sUserName: string;
  sQuestion: string;
  sAnswer: number | string;
  iCategoryId: number | string;
  category: {
    sTitle: string;
    _id: string;
  };
}

export interface ContactUsInterFace {
  _id: string;
  ePage: string;
  sAddress: string;
  sEmail: string;
  sNumber: number | string;
  sBackGroundImage: string;
  oSeo?: MetaInputInterface;
}

export interface AddContactUsDataParamsInterFace {
  sFirstName: string;
  sLastName: string;
  sEmail: string;
  sMessage: string;
}

export interface GetAppLinkInterface {
  sNumber: string
}

export interface StatusContactUsDataInterFace {
  sFirstName: string;
  sLastName: string;
  sEmail: string;
  sMessage: string;
  id: string;
  dCreatedAt: string;
}

export interface CtaSectionInterFace {
  _id: string;
  ePage: string;
  sAndroidPath: string;
  sIosLink: string;
}
