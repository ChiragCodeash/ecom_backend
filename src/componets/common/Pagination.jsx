import React from "react";

const Pagination = ({ className, currentPage, TotalPage, onPageChange }) => {
  const PageArray = [];
  for (let i = 1; i <= TotalPage; i++) {
    PageArray.push(i);
  }
  let showPageArray;
  if (PageArray.length > 5) {
    showPageArray = PageArray.slice(
      currentPage + 4 < PageArray.length
        ? currentPage - 1
        : PageArray.length - 5,
      currentPage + 4 > PageArray.length ? PageArray.length : currentPage + 4
    );
  } else {
    showPageArray = PageArray;
  }
  return (
    <>
      <nav className={className}>
        <ul className={`pagination m-0 gap-2`}>
          <li
            className={`page-item   ${
              currentPage > 1 ? "pointer" : "disabled"
            }`}
            onClick={() => {
              onPageChange(currentPage !== 1 ? currentPage - 1 : currentPage);
            }}
          >
            <div className="page-link ">Previous</div>
          </li>
          {PageArray.map((num, i) => {
            return (
              <li
                key={i}
                className={`page-item pointer ${
                  currentPage === num ? "active" : ""
                }`}
                onClick={() => {
                  onPageChange(num);
                }}
              >
                <div className="page-link ">{num}</div>
              </li>
            );
          })}

          <li
            className={`page-item  ${currentPage < PageArray.length ? "" : "disabled"}`}
            onClick={() => {
              onPageChange( currentPage === PageArray.length ? currentPage : currentPage + 1);
            }}
          >
            <div className="page-link pointer">Next</div>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
