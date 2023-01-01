import { Context, HttpRequest } from '@azure/functions';
import httpTriggerSender from '../../../src/driversRetrieve';

const context = {} as unknown as Context;

describe('Drivers Retrieve', () => {
  test('Response body contains status 200', async () => {
    context.req = {
      method: 'POST',
      url: '/',
      headers: {},
      query: {},
      params: {
      },
      body: {
        drivingLicenceNumber: 'errorOverDailyLimit',
      },
      user: null,
    } as unknown as HttpRequest;

    await httpTriggerSender(context, context.req);
    const response = context.res as { status : number };
    expect(response.status).toBe(200);
  });
});
