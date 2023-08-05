import React from 'react'
import propTypes from 'prop-types'

function Pagination({currentPage, numberOfPages, onClick, limit}) {
  
  // startPage 계산
  const currentSet = Math.ceil(currentPage / limit);
  const startPage = limit * (currentSet - 1) + 1;

  // pagination 배열 크기 계산
  const lastSet = Math.ceil(numberOfPages/limit);
  const numberOfPagesForSet = currentSet === lastSet ? numberOfPages%limit : limit

  return (
    <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">

            {/* 첫번째 세트에서는 Previous 안보이게 설정 */}
            { currentSet !== 1 && <li className="page-item">
              <div className="page-link cursor-pointer"
                    onClick={() => onClick(startPage - limit)}>Previous</div>
            </li>}

            {Array(numberOfPagesForSet).fill(startPage)
              .map((value, index) => value + index)
              .map((pageNumber) => {
                return <li key = {pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                            <div className="page-link cursor-pointer"
                                onClick={() => {
                                    onClick(pageNumber)
                                }}>
                                {pageNumber}
                            </div>
                        </li>
              })}

            {/* 마지막 세트에서는 Next 버튼 안보이게 설정 */}
            { currentSet !== lastSet && <li className="page-item">
                <div className="page-link cursor-pointer" 
                      onClick={() => onClick(startPage + limit)}
                >Next</div>
            </li>}
        </ul>
    </nav>
  )
}

Pagination.propTypes = {
    currentPage: propTypes.number,
    numberOfPages: propTypes.number.isRequired,
    onClick: propTypes.func.isRequired,
    limit: propTypes.number
}

Pagination.defaultProps = {
    currentPage: 1,
    limit: 5
}
export default Pagination