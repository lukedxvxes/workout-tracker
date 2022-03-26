import React from 'react';
import {
  Box,
  Heading,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react';
import { useExerciseList } from '../hooks/useExerciseList';
import { FiClock } from 'react-icons/fi';
import { StyledListItem } from './suggestedExercises.styled';
export function SuggestedExercises() {
  const { data, isLoading, isError, error } = useExerciseList();
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Box>
      <Heading size="md" mb={5}>
        exercises complete
      </Heading>
      <List>
        {data &&
          data.map((exercise, i) => (
            <StyledListItem key={i}>
              <Heading size="sm">{exercise.name}</Heading>
              <div>
                <ListIcon as={FiClock} />
                {new Date(exercise.createdAt).toLocaleDateString('en-AU')}
              </div>
            </StyledListItem>
          ))}
      </List>
    </Box>
  );
}
