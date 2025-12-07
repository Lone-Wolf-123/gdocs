// /src/pages/Register.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuth } from '../store/useAuth';

export default function Register() {
  const navigate = useNavigate();
  const setToken = useAuth((s) => s.setToken);
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await api.post('/auth/register', form);
    setToken(res.data.token);
    navigate('/docs');
  }

  return (
    <form onSubmit={submit}>
      <input
        type='email'
        name='email'
        value={form.email}
        onChange={handleInputChange}
        placeholder='Email'
      />
      <input
        type='password'
        name='password'
        value={form.password}
        onChange={handleInputChange}
        placeholder='Password'
      />
      <input
        type='text'
        name='name'
        value={form.name}
        onChange={handleInputChange}
        placeholder='Name'
      />
      <button type='submit'>Register</button>
    </form>
  );
}
