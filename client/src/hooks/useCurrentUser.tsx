import { useCookies } from 'react-cookie';
import { useQuery } from 'react-query';

export function useCurrentUser({
  setUser,
}: {
  setUser: React.Dispatch<React.SetStateAction<null>>;
}) {
  const [cookies, setCookie] = useCookies(['jwt']);

  return useQuery(
    ['current-user'],
    async () => {
      const headers = {
        'Content-type': 'application/json',
        Authorization: `Bearer ${cookies.jwt}`,
      };
      const res = await fetch('http://localhost:3000/users/current', {
        headers: headers,
      });
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const userData = await res.json();
      setUser(userData);
      return userData;
    },
    {
      // Refetch the data every second
      enabled: !!cookies.jwt,
    },
  );
}
