import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getImageStatusDetails } from './Server/API';
import { getImageFile } from './Server/API';
import { updateImageStatus } from './Server/API';
import _ from 'lodash';

function VerifyImg() {
  const { id } = useParams();
  const Vno = id;
  const { vehicleNo, batchId } = useParams();
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [batchIds, setBatchId] = useState(null);
  const storedUserData = JSON.parse(sessionStorage.getItem('user'));
  const Phone = storedUserData.mobile;
  const Username = storedUserData.customerName;
  const location = useLocation();

  useEffect(() => {
    fetchDataDebounced({
      vehicleNo: Vno,
      batchId: batchId,
      startDate: '',
      endDate: '',
      status: '',
      requestNo: String(generateUniqueRequestNo()),
      requestedBy: Phone,
    });
  }, [location.pathname]);

  const fetchData = async (requestData) => {
    try {
      const response = await getImageStatusDetails(requestData);
      if (response.success) {
        const dataArray = response.data.data || [];
        const allGetVehicleImagesStatus = dataArray
          .map(entry => entry.getVehicleImagesStatus || [])
          .flat()
          .filter(status => status);
        const batchId = dataArray.map(entry => entry.batchId).filter(id => id);
        setBatchId(batchId)
        setVehicleDetails(allGetVehicleImagesStatus);
      } else {
        console.error('API request unsuccessful:', response.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchDataDebounced = _.debounce(fetchData, 50); // Adjust debounce delay as needed

  const handleViewImage = async (imageDetails) => {
    try {
      const imageResponse = await getImageFile(imageDetails);
      if (imageResponse.success) {
        const imageUrl = imageResponse.imageUrl;
        setSelectedImage(imageUrl);
        setShowModal(true);
      } else {
        console.error('Error fetching image:', imageResponse.message);
      }
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  const handleImageStausChange = async (status, imageDetails) => {
    try {
      const selectedVehicle = vehicleDetails.find(vehicle => vehicle.imageDetails === imageDetails);
      if (!selectedVehicle) {
        console.error('No selected vehicle.');
        return;
      }
      const uniqueRequestNo = generateUniqueRequestNo();
      const requestData = {
        isImageApproved: status,
        imageKey: selectedVehicle.imageDetails,
        vehicleNo: selectedVehicle.vehicleNo,
        requestedBy: Phone,
        requestNo: String(uniqueRequestNo),
        mobileNo: Phone,
      };
      const updateResponse = await updateImageStatus(requestData);
      if (updateResponse.success) {
        fetchData({
          vehicleNo: id,
          startDate: '',
          endDate: '',
          status: '',
          batchId: batchId,
          requestNo: Phone,
          requestedBy: Username,
        });
      } else {
        console.error('Error updating image status:', updateResponse.message);
      }
    } catch (error) {
      console.error('Error updating image status:', error);
    }
  };

  const generateUniqueRequestNo = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  const handleGoBack = () => { 
    navigate('/dashboard'); 
    //window.location.reload();
  };

  return (
    <div>
      {vehicleDetails && (
        <div>
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <button className="btn btn-primary" onClick={handleGoBack}>
                Back
              </button>
            </div>
            <div className="card-body">
              <div className=' '>
                <table className="table table-striped table-bordered" id="datatable">
                  <thead className='text-center'>
                    <tr>
                      <th className="m-0 font-bold " colSpan={7}>
                        <h4>Vehicle Details {id}</h4>
                      </th>
                    </tr>
                    <tr>
                      <th colSpan={7}>
                        <h6>Batch ID : {batchId}</h6>
                      </th>
                    </tr>
                    <tr className=''>
                      <th>Sno</th>
                      <th>Status</th>
                      <th>Type</th>
                      <th>View</th>
                      <th colSpan={2}>Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
  {vehicleDetails.map((vehicle, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>
        {(vehicle.isImageApproved === 'Approved' || vehicle.isImageApproved === 'approved') && (
          <i className="fas fa-check text-success" style={{ fontSize: '24px' }} />
        )}
        {(vehicle.isImageApproved === 'Rejected' || vehicle.isImageApproved === 'rejected') && (
          <i className="fas fa-times text-danger" style={{ fontSize: '24px' }} />
        )}
        {(vehicle.isImageApproved === 'Pending' || vehicle.isImageApproved === 'pending') && (
          <i className="fas fa-clock text-warning" style={{ fontSize: '24px' }}></i>
        )}
      </td>
      <td>{vehicle.imageType}</td>
      <td onClick={() => handleViewImage(vehicle.imageDetails)}>
        <center>
          <i className="fas fa-eye"></i>
        </center>
      </td>
      <td>
        {vehicle.isImageApproved === 'Pending' && (
          <button type="button" className="btn btn-success btn-sm px-3"
            onClick={() => handleImageStausChange('Approved', vehicle.imageDetails)}>
            Approve
          </button>
        )}
      </td>
      <td>
        {vehicle.isImageApproved === 'Pending' && (
          <button type="button" className="btn btn-danger btn-sm px-3"
            onClick={() => handleImageStausChange('Rejected', vehicle.imageDetails)}>
            Reject
          </button>
        )}
      </td>
    </tr>
  ))}
</tbody>

                </table>
              </div>
            </div>
          </div>

          {showModal && (
            <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">View Image </h5>
                    <button type="button" className="close" onClick={handleCloseModal}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <img src={selectedImage} alt="Vehicle Image" style={{ width: '100%' }} />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default VerifyImg;
