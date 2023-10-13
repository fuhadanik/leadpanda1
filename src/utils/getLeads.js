import axios from "axios";

export default async function getLeads(
  setProgress,
  searchParams,
  leads,
  data,
  setData,
  setIsLoading,
  setIsError
) {
  let page = 1;
  let progress = 0;
  const loopLength = Math.round(leads / 100);
  const dataArray = [];
  for (var i = 0; i <= loopLength; i++) {
    progress = ((i + 1) / loopLength) * 100;
    setProgress(progress);
    const randomQueryParam = `random=${Math.random()}`;
    const url = `https://api.apollo.io/v1/mixed_people/search?${searchParams}&${randomQueryParam}`;
    try {
      const res = await axios.post(url, {
        page,
        per_page: 100,
      }, {
        headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
        },
      });
      const userData = await res.data.people;
      dataArray.push(...userData);
      setData(dataArray);
    } catch (err) {
      setIsError("Something went wrong while fetching data");
      setIsLoading(false);
      break;
    }
    page = page + 1; 
  }
  setIsLoading(false);
  return data;
}
