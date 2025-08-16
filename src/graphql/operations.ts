import { gql } from '@apollo/client';

export const SUBSCRIBE_CHATS = gql`
	subscription Chats {
		chats(order_by: { created_at: desc }) {
			id
			title
			created_at
		}
	}
`;

export const CREATE_CHAT = gql`
	mutation CreateChat($title: String!) {
		insert_chats_one(object: { title: $title }) {
			id
			title
		}
	}
`;

export const SUBSCRIBE_MESSAGES = gql`
	subscription Messages($chatId: uuid!) {
		messages(
			where: { chat_id: { _eq: $chatId } }
			order_by: { created_at: asc }
		) {
			id
			role
			content
			created_at
		}
	}
`;

export const INSERT_USER_MESSAGE = gql`
	mutation InsertUserMessage($chatId: uuid!, $content: String!) {
		insert_messages_one(
			object: { chat_id: $chatId, role: "user", content: $content }
		) {
			id
		}
	}
`;

export const SEND_MESSAGE = gql`
	mutation SendMessage($chatId: uuid!, $content: String!) {
		sendMessage(input: { chat_id: $chatId, content: $content }) {
			reply
		}
	}
`; 