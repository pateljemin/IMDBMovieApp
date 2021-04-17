import React from 'react';

const Form = (props) => {
    return (
        <div className="align-items-center d-flex">
            <label className="sr-only" htmlFor="inlineFormInputName2">Name</label>
            <input type="text" className="form-control mb-2 mr-sm-2" id="inlineFormInputName" placeholder="Movie Name" value={props.searchValue} onChange={(event) => props.setSearchValue(event.target.value)}/>
            <label className="sr-only" htmlFor="inlineFormInputName2">State</label>
            <select id="inputState" className="form-control" onChange={(event) => props.setType(event.target.value)} value={props.type}>
                <option value='' selected>Choose Type</option>
                <option value='movie'>Movie</option>
                <option value='series'>Series</option>
                <option value='episode'>Episode</option>
            </select>
            <label className="sr-only" htmlFor="inlineFormInputName2">Year</label>
            <input type="text" className="form-control mb-2 mr-sm-2" id="inlineFormInputYear" placeholder="Year" value={props.year} onChange={(event) => props.setYear(event.target.value)}/>
            <button className="btn btn-primary mb-2" onClick={(e)=>{
                props.searchCall()
            }}>Submit</button>
        </div>
    );
};

export default Form;