import axios from 'axios';
import { User } from '../types/api';

async function fetchData(userId: number): Promise<User[]> {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data;
}

export { fetchData };
