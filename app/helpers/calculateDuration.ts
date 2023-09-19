interface DurationData {
    [timestamp: number]: number
}

function averageAroundTimestamp(data: DurationData, timestamp: number, processedTimestamps:  {[timestamp: number]: boolean}) {
  const timestampMs = timestamp;
  const interval = 10 * 60 * 1000; 

  let sum = 0;
  let count = 0;

  for (const otherTimestamp of Object.keys(data)) {
    if (data.hasOwnProperty(otherTimestamp)) {
      const otherTimestampMs = parseInt(otherTimestamp);

      if (Math.abs(otherTimestampMs - timestampMs) <= interval) {
        const number = data[otherTimestampMs];
        if (typeof number === 'number') {
          sum += number;
          count += 1;

          processedTimestamps[otherTimestampMs] = true;
        }
      }
    }
  }

  const average = count > 0 ? sum / count : undefined;

  return average;
}

export default function averageDuration(data: DurationData) {
  const result = {} as {[timestamp: number]: number | undefined} ;
  const processedTimestamps = {} as {[timestamp: number]: boolean};

  for (const timestamp of Object.keys(data)) {
    const key = parseInt(timestamp);
    if (data.hasOwnProperty(timestamp) && !processedTimestamps[key]) {
      const number = data[key];

      if (typeof number === 'number') {

        const average = averageAroundTimestamp(data, key, processedTimestamps);

        result[key] = average;
      }

      processedTimestamps[key] = true;
    }
  }

  let sum = 0
  let alarms = 0

  for (const average of Object.values(result)) {
    if (average) {
      sum += average
      alarms++
    }
  }

  return { sum, alarms };
}
