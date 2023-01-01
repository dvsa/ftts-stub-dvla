import logNormal from '@stdlib/random-base-lognormal';
import config from '../../config';
import { LatencyMethod } from './latencyMethod';

function generateLatency(min: number, max: number, mean: number, median: number) : number {
  const mu = Math.log(median);
  const sigma = Math.sqrt(2 * (Math.log(mean) - mu));

  const randomLatency = logNormal(mu, sigma);
  if (max !== 0 && randomLatency > max) {
    return max;
  }

  if (min !== 0 && randomLatency < min) {
    return min;
  }

  return randomLatency;
}

export default function waitForRandomLatency(method: LatencyMethod): Promise<unknown> {
  let delayTime = 0;
  switch (method) {
    case LatencyMethod.Authenticate:
      delayTime = generateLatency(
        config.latency.authenticate.minimum,
        config.latency.authenticate.maximum,
        config.latency.authenticate.mean,
        config.latency.authenticate.median,
      );
      break;
    case LatencyMethod.DriversRetrieve:
      delayTime = generateLatency(
        config.latency.driversRetrieve.minimum,
        config.latency.driversRetrieve.maximum,
        config.latency.driversRetrieve.mean,
        config.latency.driversRetrieve.median,
      );
      break;
    default:
      throw new Error('Unknown LatencyMethod - there should be a case for each LatencyMethod');
  }

  const result = new Promise((resolve) => {
    setTimeout(resolve, delayTime);
  });

  return result;
}
