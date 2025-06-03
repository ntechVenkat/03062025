import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "./Table";

const BrPostApi = () => {
  const [districts, setDistricts] = useState([]);
  const [localities, setLocalities] = useState([]);
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState({
    applicationType: "",
    applicantName: "",
    district: "",
    localityName: "",
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let data = await axios.post(
      "https://backend.ts-bpass.com/api/v1/citizen_search/search_by_params",
      {},
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    console.log(data.data.data);
    setApplications(data.data.data.applications);

    setDistricts((prev) => {
      const values = [
        ...prev,
        ...data.data.data.applications.map((each) => each.district_name),
      ];
      const unique = [...new Set(values)];
      return unique;
    });

    setLocalities((prev) => {
      const values = [
        ...prev,
        ...data.data.data.applications.map((each) => each.locality),
      ];
      const unique = [...new Set(values)];
      return unique;
    });
  };
  // console.log(districts);
  // console.log(localities);

  const changeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
  };

  const filteredApplications = applications.filter(
    (each) =>
      (search.applicationType
        ? each.application_type.includes(search.applicationType)
        : true) &&
      (search.district ? each.district_name.includes(search.district) : true) &&
      (search.applicantName
        ? each.applicant_name.includes(search.applicantName)
        : true) &&
      (search.localityName ? each.locality.includes(search.localityName) : true)
  );
  // console.log(applications);
  // console.log(filteredApplications);
  // console.log(search);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Welcome to Website</h1>
      <div className="d-flex justifty-content-center flex-direction-row align-items-center">
        <label className="m-3">Application Type :</label>
        <input
          type="text"
          className="m-2"
          placeholder="Application Type"
          name="applicationType"
          value={search.applicationType}
          onChange={changeHandler}
        />
        <br />
        <label className="m-3">Applicant Name :</label>
        <input
          type="text"
          className="m-2"
          placeholder="Applicant Name"
          name="applicantName"
          value={search.applicantName}
          onChange={changeHandler}
        />
        <br />
        <label className="m-3">District :</label>
        <select
          className="m-2"
          onChange={changeHandler}
          name="district"
          value={search.district}
        >
          <option>Please Choose an Option</option>
          {districts.map((eachDistrict, index) => (
            <option key={index}>{eachDistrict}</option>
          ))}
        </select>
        <br />
        <label className="m-3">Locality :</label>
        <select
          className="m-2"
          onChange={changeHandler}
          name="localityName"
          value={search.localityName}
        >
          <option>Please Choose an Option</option>
          {localities.map((eachLocality, index) => (
            <option key={index}>{eachLocality}</option>
          ))}
        </select>

        {/* <input
          type="text"
          className="m-2"
          placeholder="District"
          name="district"
          value={search.district}
          onChange={changeHandler}
        />
        <input
          type="text"
          className="m-2"
          placeholder="Locality"
          name="localityName"
          value={search.localityName}
          onChange={changeHandler}
        /> */}
        {/* <button
          className="btn btn-primary m-2"
          onClick={clickSearchApplications}
        >
          Search
        </button> */}
      </div>
      <Table applications={filteredApplications} />
      {/* {applications.map((each, index) => (
        <h1 key={index}> {each.application_id}</h1>
      ))} */}
    </div>
  );
};
export default BrPostApi;
