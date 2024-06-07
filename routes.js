export const publicRoutes = ["/", "/about", "/photos", "/articles"];

export const isPublicRouteOrIncludes = (pathname) => {
  return publicRoutes.some((route) => {
    if (pathname === route) {
      return true;
    }
    if (route !== "/" && pathname.startsWith(route)) {
      return true;
    }
    return false;
  });
};

export const authRoutes = ["/accounts/signin", "/accounts/signup"];

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
