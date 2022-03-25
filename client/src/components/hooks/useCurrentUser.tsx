import { useToast } from '@chakra-ui/react';
import { useCookies } from 'react-cookie';
import { useQuery } from 'react-query';
import { API_URL } from 'src/CONSTANTS/API';
import type { UserInterface } from 'src/types';

export function useCurrentUser({
  setUser,
}: {
  setUser: React.Dispatch<React.SetStateAction<null>>;
}) {
  const [cookies, setCookie] = useCookies(['jwt']);
  const toast = useToast();
  return useQuery<{ documents: UserInterface[] }>(
    ['current-user'],
    async () => {
      const headers = {
        'Content-type': 'application/json',
        Authorization: `Bearer ${cookies.jwt}`,
      };

      const res = await fetch(`${API_URL}users/current`, {
        headers: headers,
      });

      if (!res.ok) {
        toast({
          title: 'Error: ',
          description: `User not logged in`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
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
