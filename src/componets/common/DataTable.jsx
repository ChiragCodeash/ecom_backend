import React, { Fragment } from "react";
import IconPack from "./IconPack";
import Loading from "./Loading";

const DataTable = ({ col, data, isLoading, actions, unique }) => {
  // const width = 100 / (col.length + 1);
  unique = unique || "id";
  const success = ["true", "success", "active"];
  const danger = ["false", "blocked", 0, "deactive"];
  const info = ["reject"];
  const warning = ["pending", "processing", "false"];
  const badgeName = {
    0: "deactive",
    1: "active",
  };
  return (
    <>
      <div className="card">
        <table className="table  m-0">
          <thead className="text-center">
            <tr>
              {/* <th scope="col py-5">#</th> */}
              {col.map((item, i) => {
                return (
                  <th
                    className="py-5"
                    key={i}
                    style={{ width: `${item.width}%` }}
                  >
                    <h4 className="m-0">{item.name}</h4>
                  </th>
                );
              })}
              {actions && actions.length != 0 && (
                <th className="text-center py-5">
                  <h4 className="m-0">Action</h4>
                </th>
              )}
            </tr>
          </thead>
          {!isLoading ? (
            <>
              <tbody>
                {data &&
                  data.map((rowData, i) => {
                    return (
                      <tr key={i} className="align-middle text-center">
                        {/* <td>
                        {rowData.length == 1 && currentPage <= 1
                              ? 1
                              : parseInt(lIndex) -
                                parseInt(recordPerPage) +
                                parseInt(i + 1)}
                        {i}
                      </td> */}
                        {col.map((colData, i) => {
                          switch (colData.type) {
                            case "img":
                              return (
                                <td key={i}>
                                  <div
                                    className={`d-flex justify-content-center align-items-center `}
                                  >
                                    <img
                                      src={rowData[colData?.accessor] || "NA"}
                                      alt=""
                                      className={`img-4by3-sm rounded-3 ${
                                        colData.actions && "pointer"
                                      }`}
                                      width={64}
                                      height={48}
                                      onClick={() => {
                                        colData.actions &&
                                          colData.actions["onclick"]();
                                      }}
                                    />
                                  </div>
                                </td>
                              );
                            case "imgContent":
                              return (
                                <td key={i}>
                                  <div className={`d-flex align-items-center `}>
                                    <img
                                      width={64}
                                      height={48}
                                      src={
                                        rowData[colData?.accessor][
                                          colData?.nested[1]
                                        ] || "-"
                                      }
                                      alt=""
                                      className={`img-4by3-sm rounded-3 ${
                                        colData.actions && "pointer"
                                      }`}
                                      onClick={() => {
                                        colData.actions &&
                                          colData.actions["onclick"]("img");
                                      }}
                                    />
                                    <div className="ms-3">
                                      <h5 className="mb-0">
                                        <div
                                          className={`text-inherit ${
                                            colData.actions && "pointer"
                                          }`}
                                          onClick={() => {
                                            colData.actions &&
                                              colData.actions["onclick"](
                                                "content"
                                              );
                                          }}
                                        >
                                          {rowData[colData?.accessor][
                                            colData?.nested[0]
                                          ] || "-"}
                                        </div>
                                      </h5>
                                    </div>
                                  </div>
                                </td>
                              );
                              break;
                            case "badge":
                              return (
                                <td key={i}>
                                  <span
                                    className={`badge badge-${
                                      success.includes(
                                        badgeName[rowData[colData.accessor]]
                                      )
                                        ? "success"
                                        : danger.includes(
                                            badgeName[rowData[colData.accessor]]
                                          )
                                        ? "danger"
                                        : info.includes(
                                            badgeName[rowData[colData.accessor]]
                                          )
                                        ? "info"
                                        : warning.includes(
                                            badgeName[rowData[colData.accessor]]
                                          )
                                        ? "warning"
                                        : "success"
                                    }-soft text-capitalize`}
                                  >
                                    {/* {rowData[colData?.accessor]} */}
                                    {badgeName[rowData[colData.accessor]]}
                                  </span>
                                </td>
                              );
                              break;
                            case "date":
                              return (
                                <td key={i}>
                                  {/* {moment(item[accessor.accessor]).format(
                                      "DD-MM-yyyy"
                                    )} */}
                                </td>
                              );
                              break;
                            case "input":
                              // console.log(rowData[colData?.accessor])
                              return (
                                <td key={i} className="text-start">
                                  <div className="input-group">
                                    <input
                                      type={colData?.type}
                                      value={rowData[colData?.accessor]}
                                      // defaultValue={rowData[colData?.accessor]}
                                      className={`form-control ${
                                        colData?.when(
                                          rowData[colData?.accessor]
                                        )
                                          ? "error-input"
                                          : ""
                                      }`}
                                      name={colData?.name}
                                      onChange={(e) => {
                                        rowData[colData?.accessor] =
                                          e.target.value;
                                        colData?.input["onchange"](
                                          rowData[colData?.accessor]
                                        );
                                      }}
                                      onInput={(e, number) => {
                                        e.target.value = e.target.value
                                          .replace(/[^0-9.]/g, "")
                                          .replace(/(\..*?)\..*/g, "$1")
                                          .slice(0, number || 9);
                                      }}
                                      // onChange={()=>{
                                      //   colData?.input["onchange"]("onChanges")
                                      // }}
                                    />
                                    <span
                                      className="input-group-text p-2 pointer"
                                      onClick={() => {
                                        colData?.input["onclick"](
                                          rowData[colData?.accessor],
                                          rowData[unique]
                                        );
                                      }}
                                    >
                                      <IconPack icon={"caret-right"} />
                                    </span>
                                  </div>
                                  {colData?.when(rowData[colData?.accessor])}
                                </td>
                              );
                              break;
                            case "custom":
                              return(
                                <td key={i}>
                                  {colData.element(rowData[colData?.accessor] ,  rowData[unique])}
                                </td>
                              )
                              break;

                            default:
                              return (
                                <td key={i}>
                                  <div
                                    className={`${
                                      colData.actions && "pointer text-inherit "
                                    }`}
                                    onClick={() => {
                                      colData.actions &&
                                        colData.actions["onclick"]();
                                    }}
                                  >
                                    {rowData[colData.accessor] || "-"}
                                  </div>
                                </td>
                              );
                              break;
                          }
                        })}
                        {actions && actions.length && (
                          <td>
                            <div className=" d-flex justify-content-center gap-2">
                              {actions.length != 0
                                ? actions.map((item, i) => {
                                    return (
                                      <div
                                        key={i}
                                        className="px-1 pointer"
                                        onClick={() => {
                                          item.onclick(rowData[unique]);
                                        }}
                                        title={item.title}
                                      >
                                        {item.icon}
                                      </div>
                                    );
                                  })
                                : ""}
                            </div>
                          </td>
                        )}
                      </tr>
                    );
                  })}
              </tbody>
            </>
          ) : (
            ""
          )}
        </table>
        {isLoading ? (
          <div className="p-5">
            <Loading />
          </div>
        ) : data && !data.length ? (
          <p className="text-center fw-bold m-0 p-5">No Product</p>
        ) : (
          ""
        )}
      </div>

      <>
        {/* This is Pagination */}
        {/* <nav aria-label="Page navigation example" className="bg-white border-bottom border-end border-start p-3">
          <ul className="pagination justify-content-end m-0 gap-2">
            <li className="page-item disabled">
              <a
                className="page-link"
                href="#"
                tabIndex={-1}
                aria-disabled="true"
              >
                Previous
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </nav> */}
      </>
    </>
  );
};

export default DataTable;
