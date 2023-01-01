import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { DrivingLicenceRequest } from '@dvsa/ftts-dvla-api-model/dist/standard/generated/drivingLicenceRequest';
import responseBodyBuilder from './responseBodyBuilder';
import waitForRandomLatency from '../utils/latency/latencyGenerator';
import { LatencyMethod } from '../utils/latency/latencyMethod';

const httpTriggerSender: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
  await waitForRandomLatency(LatencyMethod.DriversRetrieve);
  const drivingLicenceRequest = req.body as DrivingLicenceRequest;
  const respBody = responseBodyBuilder(drivingLicenceRequest.drivingLicenceNumber);

  context.res = {
    ...context.res,
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: respBody,
  };
};
export default httpTriggerSender;
