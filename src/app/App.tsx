import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import BackgroundImage from './components/BackgroundImage/BackgroundImage';
import NavBar from './components/NavBar/NavBar';
import Collections from './pages/Collections/Collections';
import Profile from './pages/Profile/Profile';
import Search from './pages/Search/Search';

export default function App(): JSX.Element {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Switch>
          <Route path="/search">
            <NavBar active="search" />
            <Search />
          </Route>
          <Route path="/collections">
            <NavBar active="collections" />
            <Collections />
          </Route>
          <Route path="/profile">
            <NavBar active="profile" />
            <Profile />
          </Route>
          <Route path="/about">
            <NavBar active="about" />
            <main>About page</main>
          </Route>
          <Route path="/">
            <BackgroundImage>
              <NavBar />
              <main>Splash Home</main>
            </BackgroundImage>
          </Route>
        </Switch>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
