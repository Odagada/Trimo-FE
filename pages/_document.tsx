import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head />
      <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
      <body>
        <Main />
        <div id="modal"></div>
        <NextScript />
      </body>
    </Html>
  );
}
