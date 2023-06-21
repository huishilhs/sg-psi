import axios from "axios";

const fetchData = async (time) => {
  const response = await axios.get(
    `https://api.data.gov.sg/v1/environment/psi`,
    { params: { date_time: time } }
  );
  const data = response.data.items[0]
  return data
};

export default fetchData;
