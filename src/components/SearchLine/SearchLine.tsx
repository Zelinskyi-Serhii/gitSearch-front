import { FC, useState } from 'react';
import classNames from 'classnames';
import './SearchLine.scss';

type Props = {
  getUser: (username: string) => void;
}

export const SearchLine: FC<Props> = ({ getUser }) => {
  const [inputValue, setInputValue] = useState('');

  const isDisabled = !!inputValue.length

  return (
    <div className="searchLine">
      <h1 className="searchLine__title">
        Find GitHun information about User
      </h1>

      <input
        type="text"
        placeholder="User Name"
        className="searchLine__input"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />

      <button
        // className="searchLine__button searchLine__button--is-active"
        className={classNames(
          'searchLine__button',
          {'searchLine__button--is-active': !isDisabled}
        )}
        onClick={() => getUser(inputValue)}
        disabled={!isDisabled}
      >
        Search
      </button>
    </div>
  )
};
