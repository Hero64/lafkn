export interface SendMessageProps {
  url: string;
  attributes?: Record<string, number | string>;
  body?: any;
  delay?: number;
  /**
   * only for fifo queues
   */
  deduplicationId?: string;
  /**
   * only for fifo queues
   */
  groupId?: string;
}
