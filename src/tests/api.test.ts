import axios from 'axios';
import { fetchData } from '../service/api';

jest.mock('axios');

describe('API Service', () => {
  it('should fetch data from the API', async () => {
    const mockedResponse = { data: [{ id: 1, name: 'John',username:'john123',email:'john@gmail.com' }] };
    (axios.get as jest.Mock).mockResolvedValue(mockedResponse);

    const userId = 123; // Provide the desired userId value
    const data = await fetchData(userId);

    expect(data).toEqual(mockedResponse.data);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
  });
});
