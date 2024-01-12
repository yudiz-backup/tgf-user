import { Poppins } from "next/font/google";
import type { Metadata } from "next";

import "./globals.scss";
import MainFooter from "@/shared/components/mainFooter";
import MainHeader from "@/shared/components/mainHeader";
import Providers from "./providers";
import { getFooterData } from "@/shared/data-sources/api-handlers";
import { headers } from "next/headers";
import Script from "next/script";

const poppins = Poppins({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TFG App",
  description: "Download the official TFG App",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const footerData = await getFooterData();
  const headersList = headers();
  const pathname = headersList.get("x-pathname");
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <Providers>
          {pathname !== "/google-play-store" ? (
            <>
              <MainHeader />
              {children}
              <MainFooter data={footerData} />
            </>
          ) : (
            children
          )}
        </Providers>
        <Script
          strategy="afterInteractive"
          id="clarity-script"
          dangerouslySetInnerHTML={{
            __html: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "kdgj08idsk");
          `,
          }}
        />
        

        <Script
          strategy="afterInteractive"
          id="facebook-script"
          dangerouslySetInnerHTML={{
            __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1518942632198817');
            fbq('track', 'PageView');
          `,
          }}
        />
        <noscript dangerouslySetInnerHTML={{ __html: ` <img
            height="1"
            width="1"
            style="display:none"
            src="https://www.facebook.com/tr?id=1518942632198817&ev=PageView&noscript=1"
          />` }}
    />
        
      </body>
    </html>
  );
}
