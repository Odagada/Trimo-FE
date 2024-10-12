import useManageUserAccessToken from "./useManageUserAccessToken";

const useIsLogin = () => {
  const { userAccessToken } = useManageUserAccessToken();

  if (userAccessToken) return true;
  else return false;
};

export default useIsLogin;
