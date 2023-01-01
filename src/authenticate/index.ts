import { AzureFunction, Context } from '@azure/functions';
import waitForRandomLatency from '../utils/latency/latencyGenerator';
import { LatencyMethod } from '../utils/latency/latencyMethod';

const httpTriggerSender: AzureFunction = async (context: Context): Promise<void> => {
  await waitForRandomLatency(LatencyMethod.Authenticate);
  context.res = {
    ...context.res,
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      'id-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlNhbGx5IERldiIsImlhdCI6MTUxNjIzOTAyMn0.G9FgN-Ox0Q8vAQ2D0VEt9FLEeE8oeBjx4l8r07dne6I',
    },
  };
};

export default httpTriggerSender;
