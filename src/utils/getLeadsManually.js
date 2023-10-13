import axios from "axios";

const getLeadsManually = async (
  searchParams,
  page,
  data,
  setData,
  setPage,
  setIsLoading,
  setIsError
) => {
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
    console.log(url, userData);
    setPage(page + 1);
    setData([...data, ...userData]);
    setIsLoading(false);
    return data;
  } catch (err) {
    setIsError("Something went wrong while fetching data");
    setIsLoading(false);
    return null;
  }
};

export default getLeadsManually;
