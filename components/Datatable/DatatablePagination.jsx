"use client";
import React from 'react'

const DatatablePagination = ({ itemsPerPage, totalItems, setCurrentPage }) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

     // function to paginate the items
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
                <div className='d-flex align-items-center justify-content-between'>
                {totalItems > 0  &&
                 <div className='text-center'>Showing <span className='fw-bold text-primary'>{itemsPerPage}</span> of <span className='fw-bold text-primary'>{totalItems} Orders</span></div>
                }
                
                { pageNumbers.length > 1 &&
                    <nav aria-label="...">
                        <ul className="pagination pagination-sm me-3">
                        {pageNumbers.map((number) => (
                            <li className='page-item active' key={number}>
                                <div className='page-link' onClick={() => paginate(number)} >{number}</div>
                            </li>
                        ))}
                        </ul>
                    </nav>
                }

                </div>
        
                
        
    )
}

export default DatatablePagination