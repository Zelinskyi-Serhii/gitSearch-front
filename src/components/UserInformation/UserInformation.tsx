import { FC, useState } from 'react';
import './UserInformation.scss';
import { User } from '../../types/User';
import { getUserInformation } from '../../api/request';
import { ExtraInformation } from '../ExtraInformation';
import { Loader } from '../Loader';

type Props = {
  user: User,
  closeUserInformation: () => void,
};

export const UserInformation: FC<Props> = ({ user, closeUserInformation }) => {
  const {
    nickname,
    created_at, 
    totalPublicRepositories,
  } = user;

  const [isLoading, setIsLoading] = useState(false);
  const [userExtraInformation, setUserExtraInformation] = useState();
  const [error, setError] = useState('');


  const getExtraInformation = async() => {
    setIsLoading(true);

    try {
      const extraInformation = await getUserInformation(nickname);

      setUserExtraInformation(extraInformation);
    } catch {
      setError('Unable to load extra information');
    } finally {
      setIsLoading(false);
    };
  };

  return (
    <div className="information">
      <h1 className="information__title">
        {nickname}
      </h1>

      <span className="information__create">
        {`Created at: ${created_at}`}
      </span>

      <span className="information__totalRepo">
        {`Public repositories: ${totalPublicRepositories}`}
      </span>

      <button 
        className="information__back"
        onClick={() => closeUserInformation()}
      >
        Back
      </button>

      {!isLoading && !userExtraInformation && !error && (
        <button
          className="information__button"
          onClick={() => getExtraInformation()}
        >
          Get extra information
        </button>
      )}

      {error && (
        <span>{error}</span>
      )}

      {isLoading && (
        <>
          <h3>
            We are searching all information
            <br/>
            It can takes some minutes
          </h3>
          <Loader />
        </>
      )}

      {userExtraInformation && (
        <ExtraInformation 
          userExtraInformation={userExtraInformation}
        />
      )}
    </div>
  )
};
