import { useToast } from '@chakra-ui/react';
import { useQuery } from 'react-query';

import { API_URL } from '../../CONSTANTS/API';
import type { TargetMuscleInterface } from '../../types';
import { useAuthHeaders } from './useAuthHeaders';

export function useTargetMuscleList() {
  const toast = useToast();
  const headers = useAuthHeaders();
  return useQuery<TargetMuscleInterface[]>('target-muscle-list', async () => {
    const response = await fetch(`${API_URL}/target-muscles`, {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      toast({
        title: 'Error: ',
        description: `Could not list target muscles`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      throw new Error('Network response was not ok');
    }
    return await response.json();
  });
}
