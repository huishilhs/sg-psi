import fetchData from "./service/fetchData";
import { useQuery } from "react-query";
import { DateTime } from "luxon";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [getTime, setGetTime] = useState("");
  const [psiValue, setPsiValue] = useState();

  // Get current timestamp
  const isoStr = new Date().toISOString();
  const convertedTimestamp = DateTime.fromISO(isoStr, {
    zone: "Asia/Singapore",
  }).toFormat("yyyy-MM-dd'T'HH:mm:ss");
  // Fetch PSI data
  const { data } = useQuery("psiData", () => fetchData(convertedTimestamp));

  useEffect(() => {
    // Store the PSI value
    if (data) {
      setPsiValue(data.readings.psi_twenty_four_hourly);
    }

    // Store the current timing
    const time_now = DateTime.fromISO(isoStr)
      .setZone("Asia/Singapore")
      .toFormat("cccc, LLLL dd, yyyy - hh:mm:ss a");
    setGetTime(time_now);
  }, [data, getTime]);

  // console.log(psiValue.length)

  return (
    <div>
      <div class="container mx-auto">
        <h1>{getTime}</h1>
        <h2>24 Hourly PSI Value</h2>
        {psiValue &&
          Object.entries(psiValue).map(([name, value]) => (
            <div>
              <h3>{name}</h3>
              <h3>{value}</h3>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
