import { useEffect, useState } from "react";
import bgImg from "../assets/img/bg.png";
import getLeadsManually from "../utils/getLeadsManually";
import getLeads from "../utils/getLeads";
import extractQueryParameters from "../utils/convertUrlToParams";
import getInitialData from "../utils/getInitialData";

const Form = ({ data, setData, progress, setProgress, page, setPage }) => {
  const [url, setUrl] = useState("");
  const [leads, setLeads] = useState("");
  const [apiKey, setApiKey] = useState("pSxdFnuqZ5Nwu4s2SuckXA");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [method, setMethod] = useState(false);
  const [initData, setInitData] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
    if (url.startsWith("https://app.apollo.io/")) {
      const postedData = extractQueryParameters(url);
      const body = { api_key: apiKey, ...postedData };
      try {
        method
          ? getLeads(
              setProgress,
              body,
              leads,
              data,
              setData,
              setIsLoading,
              setIsError,
              initData?.pagination.total_pages
            )
          : getLeadsManually(
              body,
              page,
              data,
              setData,
              setPage,
              setIsLoading,
              setIsError
            );
      } catch (err) {
        setIsError(err.message);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      setIsError("Invalid URL");
    }
  };

  // load initial data from the url
  useEffect(() => {
    const loadInit = async () => {
      if (url && apiKey) {
        try {
          const init = await getInitialData(url, apiKey);
          setInitData(init);
        } catch (err) {
          setIsError(err.response.data);
        }
      }
    };
    loadInit();
  }, [url, apiKey]);

  return (
    <section
      style={{ backgroundImage: `url(${bgImg})` }}
      className="form-wrapper"
    >
      <div className="container-lg">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <h2 className="title">Generate Leads</h2>
            {progress !== 0 && progress <= 100 && (
              <h5
                style={{
                  color: "#1DBF73",
                  marginBottom: "30px",
                  textAlign: "center",
                  display: "block",
                }}
              >
                Completed: {progress.toFixed(2)}%
              </h5>
            )}

            {initData && (
              <h5
                style={{
                  // color: "#1DBF73",
                  marginBottom: "30px",
                  textAlign: "center",
                  display: "block",
                }}
              >
                Total Data: {initData?.pagination.total_entries} | Total Pages :{" "}
                {initData?.pagination.total_pages}
              </h5>
            )}
            <label htmlFor="exampleFormControlInput1">
              Enter apollo search URL
            </label>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Exp: https://app.apollo.io/#/people?....."
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="exampleFormControlSelect1">
              Enter apollo Api Key
            </label>
            <input
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="pSxdFnuqZ5Nwu4s2Suc..."
            />
          </div>
          <div
            className={
              initData
                ? "form-group mb-4 d-flex justify-content-between align-items-center"
                : "form-group mb-4 d-flex justify-content-between align-items-center d-none"
            }
          >
            <label htmlFor="exampleFormControlSelect1">Get data method:</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="manualMethod"
                checked={!method}
                onChange={() => setMethod(false)}
              />
              <label className="form-check-label ml-20" htmlFor="manualMethod">
                Manually
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="autoMethod"
                checked={method}
                onChange={() => setMethod(true)}
              />
              <label className="form-check-label ml-20" htmlFor="autoMethod">
                Automatically
              </label>
            </div>
          </div>
          <div
            className={method ? "form-group mb-4" : "form-group mb-4 d-none"}
          >
            <label htmlFor="exampleFormControlSelect1">
              Select the number of leads
            </label>
            <select
              value={leads}
              onChange={(e) => setLeads(e.target.value)}
              className="form-control"
              id="exampleFormControlSelect1"
            >
              <option value="">Select leads to get...</option>
              {initData && (
                <option value={initData?.pagination.total_entries}>
                  All leads ({initData?.pagination.total_entries})
                </option>
              )}
              {Array.from({ length: 40 }).map((_, ind) => {
                return (
                  <option key={ind} value={`${(ind + 1) * 1000}`}>{`${
                    ind + 1
                  }k`}</option>
                );
              })}
            </select>
            <p style={{ margin: "10px 5px" }}>
              N.B - Out-of-range lead selection can reduce your hourly/daily API
              call limit from your selected plan if you are not using
              Organization plan.
            </p>
          </div>
          {isError && <h4 className="mt-3 mb-3 text-danger">{isError}</h4>}
          <div
            className={
              initData
                ? "form-group d-flex justify-content-between"
                : "form-group d-flex justify-content-between d-none"
            }
          >
            <button disabled={isLoading} type="submit" className="submit-btn">
              {isLoading ? "Getting Data..." : "Get Data"}
            </button>
            {data.length > 0 && (
              <button
                disabled={isLoading}
                onClick={() => {
                  setData([]);
                  setPage(1);
                }}
                className="submit-btn"
              >
                Clear Existing Data - ({data.length})
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Form;
