import { Box, Heading } from '@chakra-ui/react';
import React from 'react';
import type { WorkoutInterface } from '../../types';
import { useWorkoutList } from '../hooks/useWorkoutList';
import { TARGET_WORKOUTS } from '../utils/constants';
import { filterNotThisWeek } from '../utils/filters/filterNotThisWeek';

export function WeeklyWorkoutCount() {
  const { data, isLoading, isError, error } = useWorkoutList();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!data || isError) {
    return <p>Error: {error}</p>;
  }

  const workoutsThisWeekCount = data.filter(filterNotThisWeek);

  return (
    <Box>
      <Heading size="lg">
        Workouts complete this week: {workoutsThisWeekCount.length}
      </Heading>
      <Heading size="lg">
        Target reached in {TARGET_WORKOUTS - workoutsThisWeekCount.length}{' '}
        workouts
      </Heading>
    </Box>
  );
}
