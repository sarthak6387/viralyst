import NodeCache
from "node-cache";

export const trendCache =
  new NodeCache({

    stdTTL: 60 * 30,

    checkperiod: 120,
  });