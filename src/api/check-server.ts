const apiUrl = 'https://swapi.dev/api/';

const checkServerAvailability = (): void => {
  const xhr: XMLHttpRequest = new XMLHttpRequest();
  const serverUrl: string = apiUrl;

  xhr.open('GET', serverUrl, true);

  xhr.onload = () => {
    const message =
      xhr.status >= 200 && xhr.status < 300
        ? console.log('Server ok')
        : console.log('Server not ok');
    return message;
  };

  xhr.onerror = () => {
    throw new Error('Server error');
  };

  xhr.send();
};

export { checkServerAvailability };
