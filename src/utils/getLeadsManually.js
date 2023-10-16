import axios from "axios";

const getLeadsManually = async (
  body,
  page,
  data,
  setData,
  setPage,
  setIsLoading,
  setIsError
) => {
  const url = `https://api.apollo.io/v1/mixed_people/search`;

  try {
    const res = await axios.post(
      url,
      {
        ...body,
        page,
        per_page: 100,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "https://app.apollo.io",
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
        },
      }
    );
    const userData = await res.data.people;
    setPage(page + 1);
    setData([...data, ...userData]);
    setIsLoading(false);
    console.log(userData);
    return data;
  } catch (err) {
    setIsError(err.message);
    setIsLoading(false);
    return null;
  }
};

export default getLeadsManually;
