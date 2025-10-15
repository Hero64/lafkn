import type { MessageAttributeValue } from '@aws-sdk/client-sqs';

export class SendMessageBase {
  getAttributes(messageAttributes?: Record<string, number | string>) {
    if (!messageAttributes) {
      return undefined;
    }

    const attributes: Record<string, MessageAttributeValue> = {};

    for (const attributeKey in messageAttributes) {
      const value = messageAttributes[attributeKey];
      attributes[attributeKey] = {
        StringValue: String(messageAttributes[attributeKey]),
        DataType: typeof value === 'number' ? 'Number' : 'String',
      };
    }

    return attributes;
  }

  getBody(body?: any) {
    if (!body) {
      return undefined;
    }

    return JSON.stringify(body);
  }
}
