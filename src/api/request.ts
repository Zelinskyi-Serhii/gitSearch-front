const BASE_URL = 'https://gitsearch-backend-qt51.onrender.com';

export const getUserInformation = async (nickName: string) => {
  const userInformation = await fetch(`${BASE_URL}/${nickName}`);
  const userInformationParsed = userInformation.json();

  return userInformationParsed;
};
