import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm';
import VehicleTable from './VehicleTable';
import { getImageStatusDetails } from './Server/API';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';

function Dashboard() {
  const [filteredVehicleDetails, setFilteredVehicleDetails] = useState([]);
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('');
  const [searchOption, setSearchOption] = useState('dateRange');
  const storedUserData = JSON.parse(sessionStorage.getItem('user'));
  const Phone = storedUserData.mobile;
  const location = useLocation();

  useEffect(() => {
    sessionStorage.setItem('lastVisitedPage', location.pathname);
    return () => sessionStorage.removeItem('lastVisitedPage');
  });

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const savedSelection = JSON.parse(sessionStorage.getItem('searchSelection')) || {};
  
    if (savedSelection.startDate && savedSelection.endDate && savedSelection.status) {
      setStartDate(savedSelection.startDate);
      setEndDate(savedSelection.endDate);
      setStatus(savedSelection.status);
      setSearchOption(savedSelection.option);
      const requestData = {
        vehicleNo: '',
        startDate: savedSelection.startDate,
        endDate: savedSelection.endDate,
        status: savedSelection.status,
        requestNo: String(generateUniqueRequestNo()),
        requestedBy: Phone,
      };
      fetchData(requestData);
    } else {
      setEndDate(today); // Ensure endDate is set to today if not found in sessionStorage
    }
  
    setSearchOption(savedSelection.searchOption || 'dateRange');
  }, [endDate, Phone]);
  

  const handleSearchOptionChange = (option) => {
    setSearchOption(option);
    saveSearchSelection({ searchOption: option });
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    saveSearchSelection({ startDate: date });
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    saveSearchSelection({ endDate: date });
  };

  const handleStatusChange = (selectedStatus) => {
    setStatus(selectedStatus);
    saveSearchSelection({ status: selectedStatus });
  };

  const handleVehicleNumberChange = (number) => {
    setVehicleNumber(number.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10));
    saveSearchSelection({ vehicleNumber: number.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10) });
  };

  const handleSearchByDateRange = async () => {
    if (!startDate || !endDate || !status) {
      Swal.fire({
        icon: 'error',
        title: 'Incomplete Search',
        text: 'Please select both start date, end date, and status.',
      });
      return;
    }

    const requestData = {
      vehicleNo: '',
      startDate: startDate,
      endDate: endDate,
      status: status,
      requestNo: String(generateUniqueRequestNo()),
      requestedBy: Phone,
    };

    fetchData(requestData);
  };

  const handleSearchByVehicleNumber = async () => {
    if (!vehicleNumber) {
      Swal.fire({
        icon: 'error',
        title: 'Incomplete Search',
        text: 'Please Enter Vehicle Number',
      });
      return;
    }

    const requestData = {
      startDate: '',
      endDate: '',
      status: '',
      vehicleNo: vehicleNumber,
      requestNo: String(generateUniqueRequestNo()),
      requestedBy: Phone,
    };

    try {
      const response = await getImageStatusDetails(requestData);
      if (response.success) {
        setFilteredVehicleDetails(response.data || []);
      } else {
        Swal.fire({
          icon: 'info',
          title: 'No Records Found',
          text: 'Sorry, no records were found for this vehicle.',
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchData = async (requestData) => {
    try {
      const response = await getImageStatusDetails(requestData);
      if (response.success) {
        setFilteredVehicleDetails(response.data || []);
      } else {
        console.error('API request unsuccessful:', response.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const generateUniqueRequestNo = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  const saveSearchSelection = (selection) => {
    const savedSelection = JSON.parse(sessionStorage.getItem('searchSelection')) || {};
    const updatedSelection = { ...savedSelection, ...selection };
    sessionStorage.setItem('searchSelection', JSON.stringify(updatedSelection));
  };
  
  
  return (
    <div className="container-fluid">
      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
              <SearchForm
                searchOption={searchOption}
                onSearchOptionChange={handleSearchOptionChange}
                startDate={startDate}
                onStartDateChange={handleStartDateChange}
                endDate={endDate}
                onEndDateChange={handleEndDateChange}
                status={status}
                onStatusChange={handleStatusChange}
                vehicleNumber={vehicleNumber}
                onVehicleNumberChange={handleVehicleNumberChange}
                onSearchByDateRange={handleSearchByDateRange}
                onSearchByVehicleNumber={handleSearchByVehicleNumber}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Vehicle List</h6>
        </div>
        <div className="card-body">
          <VehicleTable filteredVehicleDetails={filteredVehicleDetails} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
