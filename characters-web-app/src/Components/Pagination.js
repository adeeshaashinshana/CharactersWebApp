import React from "react";

const Pagination = ({ characterPerPage, totalCharacters, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCharacters / characterPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="pagination-page-item">
            <a
              onClick={() => paginate(number)}
              href="!#"
              className="pagination-page-link"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
