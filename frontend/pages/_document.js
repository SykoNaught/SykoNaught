import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Metal+Mania&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"/>
        <link rel="icon" href="/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Web site created using create-react-app" />
        <link rel="manifest" href="/manifest.json" />
        <title>SykoNaught | Coming Soon</title>
        <meta name="description" content="The God King of the internet realm"/>

        <meta itemprop="name" content="SykoNaught | Coming Soon"/>
        <meta itemprop="description" content="The God King of the internet realm"/>
        <meta itemprop="image"
            content=""/>

        <meta property="og:url" content="https://sykonaught.com"/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content="SykoNaught | Coming Soon"/>
        <meta property="og:description" content="The God King of the internet realm"/>
        <meta property="og:image"
            content=""/>

        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="SykoNaught | Coming Soon"/>
        <meta name="twitter:description" content="The God King of the internet realm"/>
        <meta name="twitter:image"
            content=""/>


        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-DB70SLBZJM"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-DB70SLBZJM');
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}