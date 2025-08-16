import { useState } from 'react';
import { useAuthenticationStatus, useSignInEmailPassword, useSignUpEmailPassword } from '@nhost/react';

export function AuthForm() {
	const [mode, setMode] = useState<'signin' | 'signup'>('signin');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { isLoading: authLoading } = useAuthenticationStatus();
	const { signInEmailPassword, isLoading: signingIn, error: signInError } = useSignInEmailPassword();
	const { signUpEmailPassword, isLoading: signingUp, error: signUpError } = useSignUpEmailPassword();

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (mode === 'signin') {
			await signInEmailPassword(email, password);
		} else {
			await signUpEmailPassword(email, password);
		}
	}

	return (
		<div style={{ maxWidth: 360, margin: '64px auto', padding: 24, border: '1px solid #e5e7eb', borderRadius: 8 }}>
			<h2 style={{ margin: 0, marginBottom: 16 }}>{mode === 'signin' ? 'Sign In' : 'Sign Up'}</h2>
			<form onSubmit={handleSubmit}>
				<label style={{ display: 'block', marginBottom: 8 }}>Email</label>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					style={{ width: '100%', padding: 8, marginBottom: 12 }}
					required
				/>
				<label style={{ display: 'block', marginBottom: 8 }}>Password</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					style={{ width: '100%', padding: 8, marginBottom: 16 }}
					required
				/>
				<button type="submit" disabled={authLoading || signingIn || signingUp} style={{ width: '100%', padding: 10 }}>
					{mode === 'signin' ? 'Sign In' : 'Sign Up'}
				</button>
			</form>
			<div style={{ marginTop: 12, color: 'crimson', minHeight: 20 }}>
				{signInError?.message || signUpError?.message}
			</div>
			<div style={{ marginTop: 8, textAlign: 'center' }}>
				{mode === 'signin' ? (
					<button onClick={() => setMode('signup')} style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer' }}>
						Create an account
					</button>
				) : (
					<button onClick={() => setMode('signin')} style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer' }}>
						Already have an account? Sign in
					</button>
				)}
			</div>
		</div>
	);
} 