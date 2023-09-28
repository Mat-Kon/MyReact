const apiUrl = 'https://swapi.dev/api/?format=json';

const checkServerAvailability = (): void => {
  const xhr: XMLHttpRequest = new XMLHttpRequest();
  const serverUrl: string = apiUrl;

  xhr.open('GET', serverUrl, true);

  xhr.onload = () => {
    const message =
      xhr.status >= 200 && xhr.status < 300
        ? console.log('Сервер доступен')
        : console.log('Сервер недоступен');
    return message;
  };

  xhr.onerror = () => {
    throw new Error('Запусти или правильно настрой сервер!');
  };

  xhr.send();
};

export { checkServerAvailability };
