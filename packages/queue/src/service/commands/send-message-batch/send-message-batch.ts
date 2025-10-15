import { SendMessageBatchCommand } from '@aws-sdk/client-sqs';

import { client } from '../../client/client';
import { SendMessageBase } from '../send-message-base/send-message-base';
import type { SendMessagesBatchProps } from './send-message-batch.types';

export class SendMessageBatch extends SendMessageBase {
  constructor(private props: SendMessagesBatchProps) {
    super();
  }

  exec() {
    const command = new SendMessageBatchCommand({
      QueueUrl: this.props.url,
      Entries: this.props.messages.map((message, index) => ({
        Id: index.toString(),
        MessageBody: this.getBody(message.body),
        MessageAttributes: this.getAttributes(message.attributes),
        DelaySeconds: message.delay,
        MessageGroupId: message.groupId,
        MessageDeduplicationId: message.deduplicationId,
      })),
    });

    return client.send(command);
  }
}
