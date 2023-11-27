import { HttpResponse, http } from 'msw';
import item from './mockPeopleData.json';
import data from './mockResultData.json';

export const handlers = [
  http.get('https://swapi.dev/api/people?search=Luke%20Skywalker', () => {
    return HttpResponse.json(item);
  }),

  http.get('https://swapi.dev/api/people?page=1', () => {
    return HttpResponse.json(data);
  }),
];
