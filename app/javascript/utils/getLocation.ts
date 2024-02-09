export const getLocation = (callback) => {
  if (navigator.geolocation) {
    const response = navigator.geolocation.getCurrentPosition(showPosition(callback), showError)
  }
};

const showPosition = callback => position  => {
  callback({ 
    lat: position.coords.latitude,
    lng: position.coords.longitude
  });
};

function showError(error) {
  console.log(error)
  switch(error.code) {
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.");
      break;
  }
}