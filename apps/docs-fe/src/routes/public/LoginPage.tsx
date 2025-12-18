// /src/pages/AuthPage.tsx
//<Route path="/login" element={<AuthPage mode="login" />} />

import type { AuthResponseDTO } from '@gdocs/shared/auth/register.js';
import type { AxiosResponse } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';
import { useAuth } from '../../store/useAuth';

export default function AuthPage({ mode }: { mode: 'login' | 'register' }) {
	const navigate = useNavigate();
	const setToken = useAuth((s) => s.setToken);
	const setUserData = useAuth((d) => d.setUserData);

	const [form, setForm] = useState({
		email: '',
		password: '',
		name: '',
	});

	function handleInputs(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setForm((prevForm) => ({
			...prevForm,
			[name]: value,
		}));
	}

	async function submit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const endpoint = mode === 'register' ? '/auth/register' : '/auth/login';
		const payload =
			mode === 'register'
				? form
				: { email: form.email, password: form.password };

		try {
			const res: AxiosResponse<AuthResponseDTO> = await api.post(
				endpoint,
				payload,
			);

			console.info(`-> ${res.data.access_token}`);
			setToken(res.data.access_token);
			setUserData(res.data.user);
		} catch (e) {
			console.info(` => error ${e}`);
		}

		navigate('/app');
	}

	return (
		<form onSubmit={submit}>
			{mode === 'register' && (
				<input
					name='name'
					placeholder='Name'
					value={form.name}
					onChange={handleInputs}
				/>
			)}

			<input
				type='email'
				name='email'
				value={form.email}
				onChange={handleInputs}
				placeholder='Email'
			/>
			<input
				type='password'
				name='password'
				value={form.password}
				onChange={handleInputs}
				placeholder='Password'
			/>

			<button type='submit'>
				{mode === 'register' ? 'Create Account' : 'Login'}
			</button>
		</form>
	);
}
