import { useState } from "react";
import Form from "./component/form";
import PreviewTable from "./component/previewTable";

function App() {
  const [previewMode, setPreviewMode] = useState(false);
  const [data, setData] = useState([]);
  const [progress, setProgress] = useState(0);
  let [page, setPage] = useState(1);

  return (
    <>
      {previewMode ? <PreviewTable progress={progress} data={data} /> : <Form page={page} setPage={setPage} data={data} setData={setData} progress={progress} setProgress={setProgress} />}
      <button
        onClick={() => setPreviewMode(!previewMode)}
        className={previewMode ? "submit-btn preview-btn preview" : "submit-btn preview-btn"}
      >
        {previewMode ? "Get More Data" : "Preview Data"}
      </button>
    </>
  );
}

export default App;
