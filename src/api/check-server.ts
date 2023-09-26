const apiUrl = 'https://swapi.dev/api/?format=json';

const checkServerAvailability = (): void => {
  const xhr: XMLHttpRequest = new XMLHttpRequest();
  const serverUrl: string = apiUrl;

  xhr.open('GET', serverUrl, true);

  xhr.onload = (): void => {
    if (xhr.status >= 200 && xhr.status < 300) {
      console.log('Сервер доступен!');
    } else {
      console.error('Сервер недоступен.');
    }
  };

  xhr.onerror = () => {
    throw new Error('Запусти или правильно настрой сервер!');
  };

  xhr.send();
};

export { checkServerAvailability };
