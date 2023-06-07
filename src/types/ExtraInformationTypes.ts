import { LanguagesStatistics } from "./LanguagesStatistics";
import { RepositoriesList } from "./RepositoriesList";
import { TotalStatistics } from "./totalStatistics";

export interface ExtraInformationTypes {
  repositoriesList: RepositoriesList[],
  languageStatistics: LanguagesStatistics,
  totalStatistics: TotalStatistics,
};
