// api.js

// UserLogin
export const UserLogin = async (requestData) => {
  try {
    const response = await fetch('https://testapi.trucksups.in/TrucksUpFOAPI/Fieldofficer/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic RGV2VXNlcjpEZXZAMTIz',
      },
      body: JSON.stringify(requestData),
    });

    const data = await response.json();
    console.log("APIjs", data);

    if (response.status === 200 && data.status === 200 && data.message === 'Successful') {
      // Assuming your API returns a user_id, customer_Name, and mobile in the response
      const user = {
        userId: data.data.user_id,
        customerName: data.data.customer_Name,
        mobile: data.data.mobile,
      };

      return { success: true, data: user };
    } else {
      throw new Error(`API error! Status: ${data.status}, Message: ${data.message}`);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return { success: false, message: error.message };
  }
};
 
//getImageStatusDetails
export const getImageStatusDetails = async (requestData) => {
  try {
    const response = await fetch('https://testapi.trucksups.in/Apigateway/Gateway/GetImageStatusDetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': 'Basic RGV2VXNlcjpEZXZAMTIz'
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    
    if (data) {
      return { success: true, data };
    } else {
      throw new Error('API response is empty');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return { success: false, message: error.message };
  }
};
 
//getImageFile 
export const getImageFile = async (fileName) => {
  try {
    const response = await fetch(`https://sslapi.trucksups.in/S3ImageAPI/get-imagefile?fileName=${fileName}&Position=1`, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic RGV2VXNlcjpEZXZAMTIz',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch image. Status: ${response.status}`);
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);

    return { success: true, imageUrl };
  } catch (error) {
    console.error('Error fetching image:', error);
    return { success: false, message: error.message };
  }
};

//updateimagestatus
export const updateImageStatus = async (requestData) => {
  try {
    const response = await fetch('https://testapi.trucksups.in/Apigateway/Gateway/UpdateImageStatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic RGV2VXNlcjpEZXZAMTIz',
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data) {
      return { success: true, data };
    } else {
      throw new Error('API response is empty');
    }
  } catch (error) {
    console.error('Error updating image status:', error);
    return { success: false, message: error.message };
  }
};

