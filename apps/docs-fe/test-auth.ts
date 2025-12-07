// test-auth.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

async function run() {
  try {
    console.log('REGISTER:');
    const r = await api.post('/auth/register', {
      email: 'test@example.com',
      password: 'test123',
      name: 'Demo User',
    });
    console.log('REGISTER RESULT:', r.data);

    console.log('\nLOGIN:');
    const l = await api.post('/auth/login', {
      email: 'test@example.com',
      password: 'test123',
    });
    console.log('LOGIN RESULT:', l.data);

    let token = l.data.access_token;
    console.log('\n Org TOKEN:', token);

    console.log('\n 00: TEST PROTECTED ENDPOINT /docs:');
    const p0 = await api.get('/docs', {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('DOCS:', p0.data);

    let token1 = token.slice(0, -2) + 'cc';
    console.log('\n Changed TOKEN:', token1);

    console.log('\n01: TEST PROTECTED ENDPOINT /docs:');
    const p1 = await api.get('/docs', {
      headers: { Authorization: `Bearer ${token1}` },
    });
    console.log('DOCS:', p1.data);
  } catch (err: any) {
    console.error('\nERROR:', err.response?.data || err.message);
  }
}

run();
