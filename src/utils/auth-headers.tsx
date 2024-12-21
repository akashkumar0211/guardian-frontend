import { AuthHeadersResponse } from "@/interfaces/common-interfaces";

function AuthHeaders(): AuthHeadersResponse {
  function getCookie(name: string): string | undefined {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return undefined;
  }

  const token = getCookie('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export default AuthHeaders;
