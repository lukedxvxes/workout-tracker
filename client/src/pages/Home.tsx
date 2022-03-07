import React, { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import { Exercises } from '../components/exercises/Exercises';

export function Home() {
  const { user } = useContext(UserContext);

  return (
    <div className="page home-page">
      <h1>Home</h1>
      {user ? (
        <Grid
          templateRows="repeat(5, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={2}
        >
          <GridItem rowSpan={5} colSpan={1} bg="gray.600">
            <Box color="white" p={2}>
              <p>profile: </p>
              <pre>{JSON.stringify(user, null, 2)}</pre>
            </Box>
          </GridItem>
          <GridItem colSpan={2} bg="gray.300">
            <Box p={2}>
              <p>workout count this week: </p>
            </Box>
          </GridItem>
          <GridItem colSpan={2} bg="gray.200">
            <Box p={2}>
              <p>muscle groups hit this week: </p>
            </Box>
          </GridItem>
          <GridItem colSpan={4} bg="gray.400">
            <Box p={2}>
              <p>workouts today: </p>
            </Box>
          </GridItem>
          <GridItem colSpan={4} bg="gray.500">
            <Box p={2} color="white">
              <p>muscle groups: </p>
            </Box>
          </GridItem>
          <GridItem colSpan={4} bg="gray.600">
            <Exercises />
          </GridItem>
          <GridItem colSpan={4} bg="gray.700">
            <Box p={2} color="white">
              <p>workouts: </p>
            </Box>
          </GridItem>
        </Grid>
      ) : (
        <p>Please Log in. </p>
      )}
    </div>
  );
}
