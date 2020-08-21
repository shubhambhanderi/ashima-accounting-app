import authHeader from "./auth-header";

export default function isAuthenticated() {
  const authHeaderToken = authHeader();
  if (authHeaderToken === null || typeof (authHeaderToken.Authorization) === "undefined") {
    return false;
  }
  const parsedToken = parseJwt(authHeaderToken);
  const currentTimeStamp = new Date().getTime();
  // console.log("-=-=>", parsedToken.iat, currentTimeStamp);
  const l1 = currentTimeStamp.toString();
  const l2 = parsedToken.exp.toString();
  const n = (l1.length - l2.length);
  const iat = parsedToken.exp * (10 ** n);

  // console.log("++>", iat)
  // console.log("++>", currentTimeStamp)

  if (iat < currentTimeStamp) {
    console.log("TOKEN EXPIRED")
    return false;
  }
  // 12: 12 <- exp
  // 13: 01 < - currtimeStamp
  // if exp < curr
  return true;
}

function parseJwt(raw_token) {
  // console.log("--->", token.Authorization.substring(7));
  const token = raw_token.Authorization.substring(7);

  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};