import React from 'react';

const SearchForm = ({
  searchOption,
  onSearchOptionChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  status,
  onStatusChange,
  vehicleNumber,
  onVehicleNumberChange,
  onSearchByDateRange,
  onSearchByVehicleNumber,
}) => {
  return (
    <div className="search-form">
      <div className="row">
        <div className="col-md-2">
          <label>Search by:</label>
          <div className="form-check">
  <input
    type="radio"
    id="dateRangeRadio"
    className="form-check-input"
    value="dateRange"
    checked={searchOption === 'dateRange'}
    onChange={() => {
      onSearchOptionChange('dateRange');
      window.location.reload(); // Refresh the page
    }}
  />
  <label className="form-check-label" htmlFor="dateRangeRadio">
    Date Range
  </label>
</div>
<div className="form-check">
  <input
    type="radio"
    id="vehicleNumberRadio"
    className="form-check-input"
    value="vehicleNumber"
    checked={searchOption === 'vehicleNumber'}
    onChange={() => {
      onSearchOptionChange('vehicleNumber');
      window.location.reload(); // Refresh the page
    }}
  />
  <label className="form-check-label" htmlFor="vehicleNumberRadio">
    Vehicle Number
  </label>
</div>

        </div>

        {searchOption === 'dateRange' && (
          <div className="col-md-10">
            <div className="form-group row">
              <div className="col-md-3">
                <label htmlFor="startDate">Start Date:</label>
                <input
                  type="date"
                  id="startDate"
                  className="form-control"
                  placeholder="Enter Start Date"
                  onChange={(e) => onStartDateChange(e.target.value)}
                  value={startDate}
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="endDate">End Date:</label>
                <input
                  type="date"
                  className="form-control"
                  value={endDate}
                  onChange={(e) => onEndDateChange(e.target.value)}
                    max={new Date().toISOString().split('T')[0]} // Set max attribute to current date
/>

              </div>
              <div className="col-md-3">
                <label htmlFor="status">Status:</label>
                <select
                  id="status"
                  className="form-control"
                  onChange={(e) => onStatusChange(e.target.value)}
                  value={status}
                >
                  <option value="select">--Select--</option>
                  <option value="Archive">Archive</option>
                  <option value="InProgress">InProgress</option>
                </select>
              </div>
              <div className="col-md-2">
                <label>&nbsp;</label>
                <button type="button" className="btn btn-primary btn-block" onClick={onSearchByDateRange}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {searchOption === 'vehicleNumber' && (
        <div className="col-md-10">
        <div className="form-group row">
            <div className="col-md-4">
                <label htmlFor="Vehicle Number" className="col-form-label">Vehicle Number:</label>
                <div className="input-group">
                    <input
                        type="text"
                        id="searchBox"
                        className={`form-control ${vehicleNumber.length <= 10 ? 'is-valid' : 'is-invalid'}`}
                        placeholder="Enter Vehicle Number"
                        value={vehicleNumber}
                        onChange={(e) => onVehicleNumberChange(e.target.value)}
                    />&nbsp;
                    <div className="input-group-append">
                        <button type="button" className="btn btn-primary" onClick={onSearchByVehicleNumber}>
                            <i className="fas fa-search"></i> 
                        </button>
                    </div>
                    <div className="valid-feedback">Valid Vehicle Number</div>
                    <div className="invalid-feedback">Invalid Vehicle Number</div>
                </div>
            </div>
        </div>
    </div>
    
     
        )}
      </div>
    </div>
  );
};

export default SearchForm;
