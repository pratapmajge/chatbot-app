import { useState } from 'react';
import { useMutation, useSubscription } from '@apollo/client';
import { CREATE_CHAT, SUBSCRIBE_CHATS } from '../graphql/operations';

export function ChatList(props: { selectedChatId?: string | null; onSelect: (id: string) => void; }) {
	const { data } = useSubscription(SUBSCRIBE_CHATS);
	const [title, setTitle] = useState('');
	const [createChat, { loading }] = useMutation(CREATE_CHAT, {
		variables: { title },
		onCompleted: (res) => {
			setTitle('');
			if (res?.insert_chats_one?.id) props.onSelect(res.insert_chats_one.id);
		}
	});

	return (
		<div style={{ width: 320, borderRight: '1px solid #e5e7eb', height: '100%', display: 'flex', flexDirection: 'column' }}>
			<div style={{ padding: 12, borderBottom: '1px solid #e5e7eb' }}>
				<form onSubmit={(e) => { e.preventDefault(); if (title.trim()) createChat(); }}>
					<input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New chat title" style={{ width: '100%', padding: 8 }} />
					<button type="submit" disabled={loading || !title.trim()} style={{ marginTop: 8, width: '100%', padding: 8 }}>Create Chat</button>
				</form>
			</div>
			<div style={{ overflowY: 'auto', flex: 1 }}>
				{data?.chats?.map((c: any) => (
					<div
						key={c.id}
						onClick={() => props.onSelect(c.id)}
						style={{ padding: 12, cursor: 'pointer', background: props.selectedChatId === c.id ? '#f1f5f9' : 'transparent' }}
					>
						<div style={{ fontWeight: 600 }}>{c.title || 'Untitled Chat'}</div>
						<div style={{ fontSize: 12, color: '#6b7280' }}>{new Date(c.created_at).toLocaleString()}</div>
					</div>
				))}
			</div>
		</div>
	);
} 