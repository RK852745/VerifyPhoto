import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Pagination, Form } from 'react-bootstrap';

const VehicleTable = ({ filteredVehicleDetails }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  if (!filteredVehicleDetails || !filteredVehicleDetails.data) {
    return null; // Return null or display a loading indicator if data is not available
  }

  // Logic to calculate the index of the first and last row to display
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredVehicleDetails.data.slice(indexOfFirstRow, indexOfLastRow);

  // Logic to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handler for changing rows per page
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to the first page when changing rows per page
  };

  return (
    <div className="card-body">
      <div className="vehicle-table table-responsive">
        {/* Rows per page selector */}
        <Form.Group className="sm-3">
          <Form.Label>Rows per page:</Form.Label>
          <Form.Control as="select" value={rowsPerPage} onChange={handleRowsPerPageChange} className="custom-dropdown">
         <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={200}>200</option>
            {/* Add more options as needed */}
          </Form.Control>
        </Form.Group>

        {/* Table */}
        <Table striped bordered>
          {/* Table header */}
          <thead>
            <tr>
              <th>SNo</th>
              <th>View</th>
              <th>VehicleNo</th>
              <th>BatchId</th>
              <th>CountImage</th>
              <th>Approved</th>
              <th>Pending</th>
              <th>Reject</th>
              <th>AdvID</th>
              <th>PostedDate</th>
              <th>VerifiedBy</th>
              <th>VerifiedDate</th>
              <th>RejectedBy</th>
              <th>RejectedDate</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {/* Render table rows */}
            {currentRows.map((vehicle, index) => (
              <tr key={index}>
                <td>{indexOfFirstRow + index + 1}</td>
                <td>
                  <Link to={`/verify/${vehicle.vehicleNo}/${vehicle.batchId}`}>
                    <center>
                      <i className="fas fa-eye"></i>
                    </center>
                  </Link>
                </td>
                <td>{vehicle.vehicleNo}</td>
                <td>{vehicle.batchId}</td>
                <td>
                  <center>
                    <i className="fas fa-image text-primary"></i> &nbsp;{vehicle.total}{' '}
                  </center>
                </td>
                <td>
                  <center>
                    <i className="fas fa-check text-success"></i> &nbsp;{vehicle.approved}{' '}
                  </center>
                </td>
                <td>
                  <center>
                    <i className="fas fa-clock text-warning"></i> &nbsp;{vehicle.pending}{' '}
                  </center>
                </td>
                <td>
                  <center>
                    <i className="fas fa-times text-danger"></i> &nbsp;{vehicle.rejected}{' '}
                  </center>
                </td>
                <td>
                  <center>{vehicle.advertisementId}</center>
                </td>
                <td>{vehicle.postedDate}</td>
                <td>{vehicle.verifiedBy}</td>
                <td>{vehicle.verifiedDate}</td>
                <td>{vehicle.rejectedBy}</td>
                <td>{vehicle.rejectedDate}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pagination */}
        <Pagination>
          <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
          {/* Numbered page buttons */}
          {[...Array(Math.ceil(filteredVehicleDetails.data.length / rowsPerPage))].map((_, index) => (
            <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={indexOfLastRow >= filteredVehicleDetails.data.length} />
        </Pagination>
      </div>
    </div>
  );
};

export default VehicleTable;
