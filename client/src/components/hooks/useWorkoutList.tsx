import { useToast } from '@chakra-ui/react';

import { useQuery } from 'react-query';
import type { WorkoutInterface } from '../../types';
import { API_URL } from '../../CONSTANTS/API';
import { useAuthHeaders } from './useAuthHeaders';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';

export function useWorkoutList() {
  const toast = useToast();
  const headers = useAuthHeaders();
  const { user } = useContext(UserContext);
  return useQuery<WorkoutInterface[]>(
    'workout-list',
    async () => {
      const response = await fetch(`${API_URL}/workouts`, {
        method: 'GET',
        headers: headers,
      });

      if (!response.ok) {
        toast({
          title: 'Error: ',
          description: `Could not list workouts`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        throw new Error('Network response was not ok');
      }
      return await response.json();
    },
    {
      // Refetch the data every second
      enabled: !!user,
    },
  );
}
