import { GetServerSidePropsContext } from "next";

export const getAccessTokenFromCookie = (context: GetServerSidePropsContext) => {
  const cookieString = context.req.headers.cookie;

  if (!cookieString) return null;

  const cookies = cookieString.split(";");
  const accessTokenCookie = cookies.find((cookie) => cookie.trim().startsWith("accessToken="));

  if (accessTokenCookie) {
    const accessToken = accessTokenCookie.split("=")[1];
    return accessToken;
  }

  return null;
};
