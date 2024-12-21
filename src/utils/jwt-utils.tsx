import { JWTToken } from "@/interfaces/authentication-interfaces";

export const decodeJWT = (token: string): JWTToken => {
    const base64Url: string = token.split(".")[1];
    const jsonPayload: string = atob(base64Url);
    return JSON.parse(jsonPayload);
  };
  