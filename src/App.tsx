import { useState } from 'react';
import { getUserInformation } from './api/request';
import { SearchLine } from './components/SearchLine';
import { UserInformation } from './components/UserInformation';
import { Loader } from './components/Loader';

import './App.scss';
import './styles/reset.scss';
import './styles/normalize.scss';
import { getStorage } from './helpers/getStorage';

export const App = () => {
  const [user, setUser] = useState();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const [historyStorage, setHistoryStorage] = useState<string[]>();
  // const [isShowHistory, setIsShowHistory] = useState(false);

  const getErrorMessage = (error: string) => {
    setError(error);

    setTimeout(() => {
      setError('');
    }, 2000);
  };

  // useEffect(() => {
  //   try {
  //     const history = JSON.parse(localStorage.getItem('usersHistory') || '');

  //     setHistoryStorage(history)
  //   } catch {
  //     console.log('history are empty');
  //   }
  // }, [user]);

  const getUser = async (userName: string) => {
    setIsLoading(true);
    getStorage(userName);

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

  const isSearchLine = !isLoading && !user && !error;
  // const isButton = !user && !isLoading

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

        {/* {isShowHistory && isButton && (
          <button
            className="main__button"
            onClick={() => setIsShowHistory(false)}
          >
            Hide history
          </button>
        )} */}
        {/* {!isShowHistory && isButton && (
          <button
            className="main__button"
            onClick={() => setIsShowHistory(true)}
          >
            Show history
          </button>
        )} */}

        {/* {isShowHistory && !user && (
          <div className="main__history">
            Last 5 you watched:
            {historyStorage?.slice(-5).map(user => (
              <span>
                {user}
              </span>
            ))}
          </div>
        )} */}

    </div>
  );
}
