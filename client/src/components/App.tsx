import React, { useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Profile, NotFound, Auth } from '../pages';
import { Box } from '@chakra-ui/react';

import { UserContext } from '../context/userContext';

import Header from './header/Header';

import { StyledApp, StyledContainer } from './App.styled';

import { useCurrentUser } from './hooks/useCurrentUser';

interface AppProps {}

function App({}: AppProps) {
  const [user, setUser] = useState(null);
  const providerUser = useMemo(() => ({ user, setUser }), [user, setUser]);
  const { isError, error } = useCurrentUser({ setUser });

  if (isError) {
    console.log(`error getting user: ${error}`);
  }

  return (
    <BrowserRouter>
      <StyledApp>
        <UserContext.Provider value={providerUser}>
          <Header />
          {/* {!isLoading && <pre>{data}</pre>} */}
          <StyledContainer>
            <Box>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Auth />} />

                <Route path="/profile" element={<Profile />} />
                <Route path="/*" element={<NotFound />} />
              </Routes>
            </Box>
          </StyledContainer>
        </UserContext.Provider>
      </StyledApp>
    </BrowserRouter>
  );
}

export default App;
