import { ListItem } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { calcRem } from '../../helper/caclRem';

export const StyledListItem = styled(ListItem)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  border: '1px solid',
  padding: calcRem(10),
  marginBottom: calcRem(5),
});
