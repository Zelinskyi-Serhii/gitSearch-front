import { useState } from 'react';
import { getUserInformation } from './api/request';
import { SearchLine } from './components/SearchLine';
import { UserInformation } from './components/UserInformation';
import { Loader } from './components/Loader';

import './App.scss';
import './styles/reset.scss';
import './styles/normalize.scss';

export const App = () => {
  const [user, setUser] = useState();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getErrorMessage = (error: string) => {
    setError(error);

    setTimeout(() => {
      setError('');
    }, 2000);
  };

  const getUser = async (userName: string) => {
    setIsLoading(true);

    try {
      const userFromServer = await getUserInformation(`shortInfo/${userName}`);

      setUser(userFromServer);
    } catch {
      getErrorMessage('User did not found')
    } finally {
      setIsLoading(false);
    }
  };

  const closeUserInformation = () => {
    setUser(undefined)
  };

  const isSearchLine = !isLoading && !user && !error

  console.log(error);
  console.log(user);

  return (
    <div className="main">
      {error && (
        <h1>{error}</h1>
      )}
      {isLoading && <Loader />}

      {isSearchLine && (
        <SearchLine getUser={getUser} />
      )}

      {user && (
        <UserInformation
          user={user}
          closeUserInformation={closeUserInformation}
         />
      )}
    </div>
  );
}
