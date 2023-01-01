interface Latency {
  minimum: number;
  maximum: number;
  mean: number;
  median: number;
}

interface Config {
  latency: {
    authenticate: Latency;
    driversRetrieve: Latency;
  };
}

export default {
  latency: {
    authenticate: {
      minimum: parseInt(process.env.LATENCY_AUTHENTICATE_MINIMUM || '0', 10),
      maximum: parseInt(process.env.LATENCY_AUTHENTICATE_MAXIMUM || '222249', 10),
      mean: parseInt(process.env.LATENCY_AUTHENTICATE_MEAN || '228', 10),
      median: parseInt(process.env.LATENCY_AUTHENTICATE_MEDIAN || '125', 10),
    },
    driversRetrieve: {
      minimum: parseInt(process.env.LATENCY_DRIVERS_RETRIEVE_MINIMUM || '62', 10),
      maximum: parseInt(process.env.LATENCY_DRIVERS_RETRIEVE_MAXIMUM || '231105', 10),
      mean: parseInt(process.env.LATENCY_DRIVERS_RETRIEVE_MEAN || '780', 10),
      median: parseInt(process.env.LATENCY_DRIVERS_RETRIEVE_MEDIAN || '423', 10),
    },
  },
} as Config;
