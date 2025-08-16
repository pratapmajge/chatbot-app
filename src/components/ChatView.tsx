import { useEffect, useRef, useState } from 'react';
import { useMutation, useSubscription } from '@apollo/client';
import { INSERT_USER_MESSAGE, SEND_MESSAGE, SUBSCRIBE_MESSAGES } from '../graphql/operations';

export function ChatView(props: { chatId?: string | null; }) {
	const { chatId } = props;
	const [content, setContent] = useState('');
	const bottomRef = useRef<HTMLDivElement | null>(null);

	const { data } = useSubscription(SUBSCRIBE_MESSAGES, {
		variables: { chatId },
		skip: !chatId
	});

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [data]);

	const [insertUserMessage, { loading: inserting }] = useMutation(INSERT_USER_MESSAGE);
	const [sendMessage, { loading: sending }] = useMutation(SEND_MESSAGE);

	async function handleSend(e: React.FormEvent) {
		e.preventDefault();
		if (!chatId || !content.trim()) return;
		const text = content.trim();
		setContent('');
		await insertUserMessage({ variables: { chatId, content: text } });
		await sendMessage({ variables: { chatId, content: text } });
	}

	if (!chatId) {
		return <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>Select or create a chat</div>;
	}

	return (
		<div style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
			<div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
				{data?.messages?.map((m: any) => (
					<div key={m.id} style={{ marginBottom: 12, display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
						<div style={{
							maxWidth: '75%',
							padding: '8px 12px',
							borderRadius: 12,
							background: m.role === 'user' ? '#2563eb' : '#e5e7eb',
							color: m.role === 'user' ? 'white' : 'black'
						}}>
							{m.content}
						</div>
					</div>
				))}
				<div ref={bottomRef} />
			</div>
			<form onSubmit={handleSend} style={{ padding: 12, borderTop: '1px solid #e5e7eb', display: 'flex', gap: 8 }}>
				<input
					type="text"
					value={content}
					onChange={(e) => setContent(e.target.value)}
					placeholder="Type a message..."
					style={{ flex: 1, padding: 10 }}
				/>
				<button type="submit" disabled={inserting || sending || !content.trim()} style={{ padding: '10px 16px' }}>Send</button>
			</form>
		</div>
	);
} 