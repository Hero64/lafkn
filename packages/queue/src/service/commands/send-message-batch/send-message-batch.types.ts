import type { SendMessageProps } from '../send-message/send-message.types';

export interface SendMessagesBatchProps {
  url: string;
  messages: Omit<SendMessageProps, 'url'>[];
}
