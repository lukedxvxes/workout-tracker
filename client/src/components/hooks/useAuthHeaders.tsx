import { useCookies } from 'react-cookie';

export function useAuthHeaders() {
  const [cookies, setCookie] = useCookies(['jwt']);

  const headers = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${cookies.jwt}`,
  };

  return headers;
}
