"use client";   
import React, { useState } from 'react';

const DatatableinputFilter = ({ filterInput, setfilterInput }) => {

    const handleInputChange = (e) => {
        setfilterInput(e.target.value);
    }

    return (
        <div>
            <input
            type="text"
            placeholder="Search items..."
            className="form-control"
            value={filterInput}
            onChange={handleInputChange}
        />    
        </div>
         
    );
};

export default DatatableinputFilter;
