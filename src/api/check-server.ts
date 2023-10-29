const apiUrl = 'https://swapi.dev/api/';

const checkServerAvailability = (): void => {
  const xhr: XMLHttpRequest = new XMLHttpRequest();
  const serverUrl: string = apiUrl;

  xhr.open('GET', serverUrl, true);

  xhr.onload = () => {
    const message =
      xhr.status >= 200 && xhr.status < 300
        ? console.log('Server is available')
        : console.log('Server is unavailable');
    return message;
  };

  xhr.onerror = () => {
    throw new Error('Error on server!');
  };

  xhr.send();
};

export { checkServerAvailability };
