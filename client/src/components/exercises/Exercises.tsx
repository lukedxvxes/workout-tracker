import React, { useContext } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { useExerciseList } from '../hooks/useExerciseList';

export function Exercises() {
  const { isLoading, isError, data: exerciseData } = useExerciseList();

  if (isLoading) {
    return <p>is loading</p>;
  }
  return (
    <Box p={2} color="white">
      <Heading size="lg">Exercises: </Heading>
      <pre>{JSON.stringify(exerciseData, null, 2)}</pre>
    </Box>
  );
}
