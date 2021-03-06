import { InputGroup, useToast } from '@chakra-ui/react';
import { useCookies } from 'react-cookie';
import { useQuery } from 'react-query';

import { API_URL } from '../../CONSTANTS/API';
import type { ExerciseInterface } from '../../types';
import { useAuthHeaders } from './useAuthHeaders';

export function useExerciseList() {
  const toast = useToast();
  const headers = useAuthHeaders();

  return useQuery<ExerciseInterface[]>('exercise-list', async () => {
    const response = await fetch(`${API_URL}/exercises`, {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      toast({
        title: 'Error: ',
        description: `Could not list exercises`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      throw new Error('Network response was not ok');
    }
    return await response.json();
  });
}
