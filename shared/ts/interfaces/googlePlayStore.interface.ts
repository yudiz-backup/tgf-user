import { MetaInputInterface } from "./generic.interface";

export type AppImage = {
    nPriority: number | string;
    sPath: string;
  }
  
  export interface GooglePlayStoreInterFace {
    _id: string;
    ePage: string;
    aAppImages: AppImage[];
    nTotalReview: string;
    sAbout: string;
    sAvgReview: string;
    sBackGroundVideo: string;
    sRated: string;
    sDownloads: string;
    sUpdateOn: string;
    oSeo?: MetaInputInterface
  }