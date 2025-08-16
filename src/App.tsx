import { useState } from 'react'
import './App.css'
import { useAuthenticationStatus, useUserDisplayName, useUserEmail } from '@nhost/react'
import { nhost } from './lib/nhost'
import { AuthForm } from './components/AuthForm'
import { ChatList } from './components/ChatList'
import { ChatView } from './components/ChatView'

function App() {
	const { isAuthenticated, isLoading } = useAuthenticationStatus()
	const displayName = useUserDisplayName()
	const email = useUserEmail()
	const [selectedChatId, setSelectedChatId] = useState<string | null>(null)

	if (isLoading) return <div style={{ padding: 24 }}>Loading...</div>

	if (!isAuthenticated) return <AuthForm />

	return (
		<div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
			<header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 16px', borderBottom: '1px solid #e5e7eb' }}>
				<div style={{ fontWeight: 700 }}>Chatbot</div>
				<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
					<div style={{ fontSize: 14, color: '#6b7280' }}>{displayName || email}</div>
					<button onClick={() => nhost.auth.signOut()}>Sign out</button>
				</div>
			</header>
			<div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
				<ChatList selectedChatId={selectedChatId} onSelect={setSelectedChatId} />
				<ChatView chatId={selectedChatId} />
			</div>
		</div>
	)
}

export default App
