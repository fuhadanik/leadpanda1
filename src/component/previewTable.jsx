import {  useState } from "react";
import { CSVLink } from "react-csv";

const PreviewTable = ({ data }) => {
  const [search, setSearch] = useState("");

  // Use a Set to keep track of unique email addresses
  const uniqueEmails = new Set();

  const processedData = data.reduce((accumulator, person) => {
        const email = person?.email;
        if (email && !uniqueEmails.has(email)) {
          uniqueEmails.add(email);
          accumulator.push({
            firstName: person?.first_name,
            lastName: person?.last_name,
            email: person?.email,
            name: person?.name,
            email_status: person?.email_status,
            title: person?.title,
            linkedin_url: person?.linkedin_url,
            organization_name: person?.organization?.name,
            organization_website: person?.organization?.website_url,
          });
        }
        return accumulator;
      }, []);

  const filteredData = search
    ? processedData?.filter((person) =>
        {
            if(person.email?.toLowerCase()?.includes(search.toLowerCase())){
                return person
            }else if(person.title?.toLowerCase()?.includes(search.toLowerCase())){
                 return person
            }else{
                return false;
            }
        }
      )
    : processedData;

  return (
    <>
      <h2 className="table-title">Fetched Leads: {data?.length}</h2>
      <h2 className="table-subtitle">Unique: {filteredData?.length}</h2>
      <div className="form-group px-5">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control search"
          placeholder="Search leads by email"
        />
        {processedData.length > 0 && (
          <CSVLink
            className="download-btn"
            filename={`data-${processedData.length}.csv`}
            data={processedData}
          >
            Download Leads
          </CSVLink>
        )}
      </div>
      <table className="GeneratedTable">
        <thead>
          <tr>
            <th>Index No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Title</th>
            <th>Email</th>
            <th>LinkedIn</th>
            <th>Company Name</th>
            <th>Company Website</th>
          </tr>
        </thead>
        <tbody>
        {filteredData?.reduce((rows, person, ind) => {
    rows.push(
      <tr key={ind}>
        <td>{ind + 1}</td>
        <td>{person.firstName}</td>
        <td>{person.lastName}</td>
        <td>{person.title}</td>
        <td>{person.email}</td>
        <td>{person.linkedin_url}</td>
        <td>{person.organization_name}</td>
        <td>{person.organization_website}</td>
      </tr>
    );
    return rows;
  }, [])}
        </tbody>
      </table>
    </>
  );
};

export default PreviewTable;
