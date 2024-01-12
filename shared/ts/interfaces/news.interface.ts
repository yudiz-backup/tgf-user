export interface MediaDetails {
    width: number;
    height: number;
    file: string;
    filesize: number;
    sizes: {
      medium: ImageSize;
      large: ImageSize;
      thumbnail: ImageSize;
      medium_large: ImageSize;
      full: ImageSize;
    };
    image_meta: ImageMeta;
  }
  
  interface ImageSize {
    file: string;
    width: number;
    height: number;
    filesize: number;
    mime_type: string;
    source_url: string;
  }
  
  interface ImageMeta {
    aperture: string;
    credit: string;
    camera: string;
    caption: string;
    created_timestamp: string;
    copyright: string;
    focal_length: string;
    iso: string;
    shutter_speed: string;
    title: string;
    orientation: string;
    keywords: string[];
  }
  
  interface Links {
    self: { href: string }[];
    collection: { href: string }[];
    about: { href: string }[];
    author: { embeddable: boolean; href: string }[];
    replies: { embeddable: boolean; href: string }[];
  }
  
  export interface NewsItem {
    id: number;
    date: string;
    date_gmt: string;
    guid: { rendered: string };
    modified: string;
    modified_gmt: string;
    slug: string;
    status: string;
    type: string;
    link: string;
    title: { rendered: string };
    author: number;
    comment_status: string;
    ping_status: string;
    template: string;
    meta: any[]; // Adjust this based on the actual data structure
    acf: any[]; // Adjust this based on the actual data structure
    description: { rendered: string };
    caption: { rendered: string };
    alt_text: string;
    media_type: string;
    mime_type: string;
    media_details: MediaDetails;
    post: number;
    source_url: string;
    _links: Links;
  }

  interface Guid {
    rendered: string;
  }
  
  interface Title {
    rendered: string;
  }
  
  interface Content {
    rendered: string;
    protected: boolean;
  }
  
  interface Excerpt {
    rendered: string;
    protected: boolean;
  }
  
  interface YoastHeadJson {
    title: string;
    robots: {
      index: string;
      follow: string;
      'max-snippet': string;
      'max-image-preview': string;
      'max-video-preview': string;
    };
    og_locale: string;
    og_type: string;
    og_title: string;
    og_description: string;
    og_url: string;
    og_site_name: string;
    article_modified_time: string;
    og_image: {
      width: number;
      height: number;
      url: string;
      type: string;
    }[];
    twitter_card: string;
    twitter_misc: {
      'Est. reading time': string;
    };
    schema: {
      '@context': string;
      '@graph': {
        '@type': string;
        '@id': string;
        url: string;
        name: string;
        isPartOf: {
          '@id': string;
        };
        datePublished: string;
        dateModified: string;
        breadcrumb: {
          '@id': string;
        };
        inLanguage: string;
        potentialAction: {
          '@type': string;
          target: string[];
        }[];
      }[];
    };
  }
  
  export interface NewsItemInterFace {
    id: number;
    date: string;
    date_gmt: string;
    guid: Guid;
    modified: string;
    modified_gmt: string;
    slug: string;
    status: string;
    type: string;
    link: string;
    title: Title;
    content: Content;
    excerpt: Excerpt;
    featured_media: number;
    template: string;
    meta: any[]; // Adjust the type based on your actual data structure
    acf: any[]; // Adjust the type based on your actual data structure
    yoast_head: string;
    yoast_head_json: YoastHeadJson;
    _links: {
      self: [{ href: string }];
      collection: [{ href: string }];
      about: [{ href: string }];
      'wp:featuredmedia': [{ embeddable: boolean; href: string }];
      'wp:attachment': [{ href: string }];
      curies: [{ name: string; href: string; templated: boolean }];
    };
  }
  
  
  
  