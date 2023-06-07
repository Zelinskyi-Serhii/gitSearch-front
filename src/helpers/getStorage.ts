export const getStorage = (nickname: string) => {
  const storage = localStorage.getItem('usersHistory') || '';
  let storageParsed: string[] = [];

  if (storage.length > 0) {
    try {
      storageParsed = JSON.parse(storage);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  }

  if (!storageParsed.includes(nickname)) {
    storageParsed.push(nickname);
    localStorage.setItem('usersHistory', JSON.stringify(storageParsed));
  }

  return storageParsed;
};



