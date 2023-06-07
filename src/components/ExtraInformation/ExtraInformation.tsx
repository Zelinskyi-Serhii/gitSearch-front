import { FC } from 'react';
import './ExtraInformation.scss';
import { ExtraInformationTypes } from '../../types/ExtraInformationTypes';
import { scrollToTop } from '../../helpers/scrollToTop';

type Props = {
  userExtraInformation: ExtraInformationTypes,
}

export const ExtraInformation: FC<Props> = ({
  userExtraInformation,
}) => {

  const {
    languageStatistics,
    repositoriesList,
    totalStatistics,
  } = userExtraInformation;

  const { commits, forks, stars } = totalStatistics;

  return (
    <div className="extra">
      <div className="extra__statistics">
          <span>
            {`Total commits: ${commits}`}
          </span>

          <span>
            {`Total forks: ${forks}`}
          </span>

          <span>
            {`Total stars: ${stars}`}
          </span>
      </div>
      <div className="extra__languages">
        {Object.entries(languageStatistics).map(language => (
          <span>
            {`${language[0]}: ${language[1]}`}
          </span>
        ))}
      </div>
      <div className="extra__repositories">
        {repositoriesList.map(repo => (
          <div className="extra__repo">
            <span>
              {repo.repositoryName}
            </span>

            <span>
              {`commits - ${repo.totalComits}`}
            </span>

            <span>
              {`forks - ${repo.totalForks}`}
            </span>

            <span>
              {`stars - ${repo.totalStars}`}
            </span>
          </div>
        ))}
    </div>

    <button
      className="extra__goTop"
      onClick={() => scrollToTop()}
    />
  </div>
  );
};
