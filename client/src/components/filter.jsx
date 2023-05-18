import React, { useState, useEffect } from "react";
import "./filter.css";
import "font-awesome/css/font-awesome.min.css";
import axios from "axios";
import Select from "react-select";
export const Filter = ({ ondata }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [endYear, setEndYear] = useState([]);
  const [topics, setTopics] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [regions, setRegions] = useState([]);
  const [pests, setPests] = useState([]);
  const [sources, setSources] = useState([]);
  const [sortBy, setSortBy] = useState([]);
  const [countrys, setCountrys] = useState([]);
  const [filter, setFilter] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/data/filter`);
        // console.log("filter", data);
        setFilter(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const applyFilter = async () => {
    try {
      const response = await axios.post("/api/data/filter", {
        topics: topics.map((topic) => topic.value),
        sectors: sectors.map((sector) => sector.value),
        regions: regions.map((region) => region.value),
        countrys: countrys.map((country) => country.value),
        sources: sources.map((source) => source.value),
        pests: pests.map((pest) => pest.value),

        sortBy: sortBy.map((sortBy) => sortBy.value),
      });
      //console.log(response);
      ondata(response.data);

      setIsOpen(!isOpen);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEndYearChange = (event) => {
    setEndYear(event);
  };

  const handleSelectTopics = (data) => {
    setTopics(data);
  };

  const handleSelectSectors = (data) => {
    setSectors(data);
  };

  const handleSelectRegions = (data) => {
    setRegions(data);
  };

  const handleSelectPests = (data) => {
    setPests(data);
  };

  const handleSelectSources = (data) => {
    setSources(data);
  };

  const handleSelectSortBy = (data) => {
    setSortBy(data);
  };

  const handleSelectCountrys = (data) => {
    setCountrys(data);
  };
  const optionList = [
    { value: "red", label: "Red" },
    { value: "green", label: "Green" },
    { value: "yellow", label: "Yellow" },
    { value: "blue", label: "Blue" },
    { value: "white", label: "White" },
  ];
  return (
    <div className="filter-menu">
      <div className="top">
        <button
          className="filter-menu-button filter-apply"
          onClick={toggleMenu}
        >
          Filter
          <i style={{ fontSize: "1.5rem" }} className="fa fa-filter"></i>
        </button>
        <h1 className="header">Dashboard</h1>
      </div>
      <div className={"filter-menu-dropdown " + (isOpen ? "animation" : "")}>
        {isOpen && filter.hasOwnProperty("topics") && (
          <>
            <div className="f-head">
              <h2 className="head">Filter Records</h2>
              <i className="fa fa-2x fa-times" onClick={toggleMenu} />
            </div>
            <div className="menu">
              <div className="filter-option">
                <h2>Choose Topic</h2>
                <div className="dropdown-container">
                  <Select
                    options={filter.topics.map((t) => ({ value: t, label: t }))}
                    placeholder="Select Topics"
                    value={topics}
                    onChange={handleSelectTopics}
                    isSearchable={true}
                    isMulti
                  />
                </div>
              </div>
              <div className="filter-option">
                <h2>Choose Sector</h2>
                <div className="dropdown-container">
                  <Select
                    options={filter.sectors.map((t) => ({
                      value: t,
                      label: t,
                    }))}
                    placeholder="Select sectors"
                    value={sectors}
                    onChange={handleSelectSectors}
                    isSearchable={true}
                    isMulti
                  />
                </div>
              </div>
              <div className="filter-option">
                <h2>Choose Region</h2>
                <div className="dropdown-container">
                  <Select
                    options={filter.region.map((t) => ({ value: t, label: t }))}
                    placeholder="Select regions"
                    value={regions}
                    onChange={handleSelectRegions}
                    isSearchable={true}
                    isMulti
                  />
                </div>
              </div>
              <div className="filter-option">
                <h2>Choose Pestle</h2>
                <div className="dropdown-container">
                  <Select
                    options={filter.pestles.map((t) => ({
                      value: t,
                      label: t,
                    }))}
                    placeholder="Select pestles"
                    value={pests}
                    onChange={handleSelectPests}
                    isSearchable={true}
                    isMulti
                  />
                </div>
              </div>
              <div className="filter-option">
                <h2>Choose Source</h2>
                <div className="dropdown-container">
                  <Select
                    options={filter.sources.map((t) => ({
                      value: t,
                      label: t,
                    }))}
                    placeholder="Select sources"
                    value={sources}
                    onChange={handleSelectSources}
                    isSearchable={true}
                    isMulti
                  />
                </div>
              </div>
              <div className="filter-option">
                <h2>Choose Sort By</h2>
                <div className="dropdown-container">
                  <Select
                    options={[
                      "relevance",
                      "impact",
                      "intensity",
                      "likelihood",
                    ].map((t) => ({ value: t, label: t }))}
                    placeholder="Select variables"
                    value={sortBy}
                    onChange={handleSelectSortBy}
                    isMulti
                  />
                </div>
              </div>
              <button className="filter-apply" onClick={applyFilter}>
                Apply
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
