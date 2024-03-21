import React from "react";
import DataTable, { createTheme } from "react-data-table-component";

const ReactDataTable = () => {
  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Year",
      selector: (row) => row.year,
    },
  ];

  const data = [
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
  ];


  return (
    <>
      <DataTable columns={columns} data={data} selectableRows className="table text-nowrap table-centered mt-0 dataTable no-footer dtr-inline"/>
    </>
  );
};

export default ReactDataTable;
