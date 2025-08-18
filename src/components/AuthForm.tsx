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
    <div className="max-w-sm mx-auto mt-16 p-6 bg-white border border-gray-200 rounded-2xl shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        {mode === 'signin' ? 'Sign In' : 'Sign Up'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={authLoading || signingIn || signingUp}
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-50 transition transform active:scale-95"
        >
          {mode === 'signin' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>

      {/* Error */}
      <div className="mt-3 text-red-500 text-sm min-h-[20px] text-center">
        {signInError?.message || signUpError?.message}
      </div>

      {/* Switch mode */}
      <div className="mt-4 text-center">
        {mode === 'signin' ? (
          <button
            type="button"
            onClick={() => setMode('signup')}
            className="text-blue-600 hover:underline text-sm"
          >
            Create an account
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setMode('signin')}
            className="text-blue-600 hover:underline text-sm"
          >
            Already have an account? Sign in
          </button>
        )}
      </div>
    </div>
  );
}
