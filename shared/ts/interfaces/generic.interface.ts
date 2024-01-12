

export interface FetchInterface {
  url: string | URL | Request
  data?: RequestInit | any,
  params?: {limit?:number} ,
}

export interface DefaultAPIResInterface<TData> {
  status: number
  message: string
  data: TData,
  count?: number
}


export interface ContactUsFormInterface{
    firstName: string;
    lastName: string;
    email: string;
    message: string;
}


export interface MetaInputInterface {
    aKeywords?: string[];
    eStatus?: string | null;
    oFB?: {
      sUrl: string | null;
      sTitle: string | null;
      sDescription: string | null;
    };
    oTwitter?: {
      sDescription: string | null;
      sTitle: string | null;
      sUrl: string | null;
    };
    sCUrl?: string;
    sDescription?: string;
    sRobots?: string | null;
    sSlug?: string | null;
    sTitle?: string | null;
}


declare global {
  interface Window {
      fbq?:any;
      onYouTubeIframeAPIReady:any;
  }
}
