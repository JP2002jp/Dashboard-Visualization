import React from "react";
import { DataGrid } from "@mui/x-data-grid";

export const MyDataGrid = ({ data }) => {
  const rows = data.map((item) => ({ id: item._id, ...item }));

  const columns = [
    { field: "title", width: "400", headerName: "Title" },
    { field: "topic", width: "100", headerName: "Topic" },
    { field: "sector", width: "100", headerName: "Sector" },
    { field: "region", width: "150", headerName: "Region" },
    { field: "country", width: "100", headerName: "Country" },
    { field: "end_year", width: "80", headerName: "End Year" },
    { field: "intensity", width: "50", headerName: "Intensity" },
    { field: "relevance", width: "50", headerName: "Relevance" },
    { field: "impact", width: "50", headerName: "Impact" },
    { field: "likelihood", width: "50", headerName: "Likelihood" },
    { field: "insight", width: "300", headerName: "Insight" },
    { field: "start_year", width: "80", headerName: "Start Year" },
    { field: "added", width: "200", headerName: "Added" },
    { field: "published", width: "200", headerName: "Published" },
    { field: "pestle", width: "200", headerName: "Pestle" },
    { field: "source", width: "200", headerName: "Source" },
    { field: "url", width: "300", headerName: "URL" },
  ];

  return (
    <div style={{ height: "calc(100% - 5vw)", width: "100%" }}>
      <div className="chartTitle">Records</div>
      <DataGrid
        rows={rows}
        columns={columns}
        columnBuffer={2}
        columnThreshold={2}
        getRowId={(row) => row.id}
      />
    </div>
  );
};
