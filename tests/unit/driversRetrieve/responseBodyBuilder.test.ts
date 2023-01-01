import { DriverDetailsResponse } from '@dvsa/ftts-dvla-api-model/dist/standard/generated/driverDetailsResponse';
import responseBodyBuilder from '../../../src/driversRetrieve/responseBodyBuilder';

describe('Response Body Builder', () => {
  test('Check licence body contains provided licence number', () => {
    const drivingLicenceNumber = 'test-licence';

    const actual : DriverDetailsResponse = responseBodyBuilder(drivingLicenceNumber);
    expect(actual.driver.drivingLicenceNumber).toBe(drivingLicenceNumber);
  });
});
