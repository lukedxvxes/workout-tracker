import { Box, Button, Flex, Grid, GridItem, Heading } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { Exercises } from '../components/exercises/Exercises';
import { SuggestedExercises } from '../components/exercises/SuggestedExercises';
import { useTargetMuscleList } from '../components/hooks/useTargetMuscleList';
import { useWorkoutList } from '../components/hooks/useWorkoutList';
import { WeeklyWorkoutCount } from '../components/workouts/WeeklyWorkoutCount';

import { UserContext } from '../context/userContext';

export function Home() {
  const { user } = useContext(UserContext);
  const { isLoading, isError, data: targetMuscleData } = useTargetMuscleList();
  const { data: workoutData } = useWorkoutList();

  return (
    <div className="page home-page">
      {user ? (
        <Grid
          templateRows="repeat(4, minMax(250px, 1fr))"
          templateColumns="repeat(6, 1fr)"
          gap={2}
        >
          <GridItem colSpan={6} bg="gray.400">
            <Box p={2}>
              <Heading size="md">Graph data</Heading>
            </Box>
          </GridItem>
          <GridItem colSpan={6} bg="gray.500">
            <Flex p={2} color="white">
              <Box width="50%">
                <Button variant="outline">Start new workout</Button>
              </Box>
              <WeeklyWorkoutCount />
            </Flex>
          </GridItem>
          <GridItem colSpan={3} bg="gray.300">
            <Box p={2}>
              {' '}
              <Heading size="md">Muscles worked this week</Heading>
            </Box>
          </GridItem>
          <GridItem colSpan={3} bg="gray.200">
            <Box p={2}>
              {' '}
              <Heading size="md">Muscles not hit this week</Heading>
            </Box>
          </GridItem>

          <GridItem colSpan={6} bg="gray.600" p={2}>
            <SuggestedExercises />
          </GridItem>
        </Grid>
      ) : (
        <p>Please Log in. </p>
      )}
    </div>
  );
}
