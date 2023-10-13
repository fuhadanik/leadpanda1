import { useState } from "react";
import bgImg from "../assets/img/bg.png";
import getLeadsManually from "../utils/getLeadsManually";
import getLeads from "../utils/getLeads";

const Form = ({ data, setData, progress, setProgress, page, setPage }) => {
  const [url, setUrl] = useState("");
  const [leads, setLeads] = useState("");
  const [apiKey, setApiKey] = useState("pSxdFnuqZ5Nwu4s2SuckXA");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [method, setMethod] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
    if (url.startsWith("https://app.apollo.io/")) {
      let searchParams = `api_key=${apiKey}&` + url.split("?")[1] + `&per_page=${100}&page=${page}`;
      try {
      method ?
 getLeads(
    setProgress,
    searchParams,
    leads,
    data,
    setData,
    setIsLoading,
    setIsError
          )
       :
         getLeadsManually(
            searchParams,
            page,
            data,
            setData,
            setPage,
            setIsLoading,
            setIsError
         );
      } catch (err) {
        setIsError("Something went wrong. Please try again.");
      }
    } else {
      setIsLoading(false);
      setIsError("Invalid URL");
    }
  };
  return (
    <section
      style={{ backgroundImage: `url(${bgImg})` }}
      className="form-wrapper"
    >
      <div className="container-lg">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <h2 className="title">Generate Leads</h2>
            {(progress !== 0) && (progress <= 100) && (
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
            <label htmlFor="exampleFormControlInput1">
              Enter apollo search URL
            </label>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="https://app.apollo.io/#/people?"
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
          <div className="form-group mb-4 d-flex justify-content-between align-items-center">
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
              <option value="">Select leads</option>
              {Array.from({ length: 40 }).map((_, ind) => {
                return (
                  <option key={ind} value={`${(ind + 1) * 1000}`}>{`${
                    ind + 1
                  }k`}</option>
                );
              })}
            </select>
          </div>
          {isError && <h4 className="mt-3 mb-3 text-danger">{isError}</h4>}
          <div className="form-group d-flex justify-content-between">
            <button disabled={isLoading} type="submit" className="submit-btn">
              {isLoading ? "Getting Data..." : "Get Data"}
            </button>
          { data.length > 0 && <button disabled={isLoading} onClick={()=>{ setData([]); setPage(1);}} className="submit-btn">
              Clear Existing Data - ({data.length})
            </button>}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Form;
