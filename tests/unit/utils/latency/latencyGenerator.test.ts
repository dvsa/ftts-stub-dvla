import logNormal from '@stdlib/random-base-lognormal';
import { mocked } from 'jest-mock';
import waitForRandomLatency from '../../../../src/utils/latency/latencyGenerator';
import { LatencyMethod } from '../../../../src/utils/latency/latencyMethod';

jest.mock('@stdlib/random-base-lognormal');
const mockedLogNormal = mocked(logNormal);

jest.mock('../../../../src/config', () => ({
  __esModule: true,
  default: {
    latency: {
      authenticate: {
        minimum: 1,
        maximum: 3,
        mean: 10,
        median: 10,
      },
      driversRetrieve: {
        minimum: 4,
        maximum: 6,
        mean: 10,
        median: 10,
      },

    },
  },
}));

function setLogNormalValue(milliseconds: number) {
  mockedLogNormal.mockImplementation((() => milliseconds));
}

describe('waitForRandomLatency', () => {
  let spy: jest.SpyInstance;

  beforeEach(() => {
    spy = jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test.each([
    [3, LatencyMethod.Authenticate],
    [6, LatencyMethod.DriversRetrieve],
  ])('Should generate a max value of %s when that is the max for the latency method', async (expected: number, latencyMethod: LatencyMethod) => {
    setLogNormalValue(100);
    await waitForRandomLatency(latencyMethod);
    expect(spy).toHaveBeenCalledWith(expect.any(Function), expected);
  });

  test.each([
    [1, LatencyMethod.Authenticate],
    [4, LatencyMethod.DriversRetrieve],
  ])('Should generate a min value of %s when that is the min for the latency method', async (expected: number, latencyMethod: LatencyMethod) => {
    setLogNormalValue(0);
    await waitForRandomLatency(latencyMethod);
    expect(spy).toHaveBeenCalledWith(expect.any(Function), expected);
  });

  test.each([
    [2, LatencyMethod.Authenticate],
    [5, LatencyMethod.DriversRetrieve],
  ])('Should generate a value of %s when that is between the min and max for the latency method', async (expected: number, latencyMethod: LatencyMethod) => {
    setLogNormalValue(expected);
    await waitForRandomLatency(latencyMethod);
    expect(spy).toHaveBeenCalledWith(expect.any(Function), expected);
  });
});
