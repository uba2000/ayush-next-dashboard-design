import axios from 'axios';

export const setHeaders = ({ token }) => {
  return {
    Authorization: `Bearer ${token}`,
  };
};

// Send GET Requests
export const get = async (payload) => {
  return await ajax({ ...payload, method: 'GET' });
};

// Send POST Requests
export const post = async (payload) => {
  return await ajax({ ...payload, method: 'POST' });
};

// Send DELETE Requests
export const deleteRequest = async (payload) => {
  return await ajax({ ...payload, method: 'DELETE' });
};

// Send Any HTTP Request
async function ajax({
  method = 'GET',
  url,
  data,
  headers = [],
  before = () => {},
  after = () => {},
  mutate = false,
  success = () => {},
  error = () => {},
  handleError = true,
  serverError = false,
  formErrors = true,
  axiosProps = {},
}) {
  // Request Response And Error
  let result = { response: false, error: false };

  // Activate Loading Status
  // commit("loading");

  // Call Before Function
  before();

  // Send Request
  await axios({
    // Request URL
    url,
    // Request Method
    method,
    // Post Data
    data,
    // Request Headers
    headers,
    // Axios Specific Properties
    ...axiosProps,
  })
    .then((response) => {
      // Assign Request Response
      result.response = response;

      // Handle Responses
      handleHttpResponse({ response, mutate, success });
    })
    .catch((err) => {
      // Assign Response Error
      result.error = err;

      // Handle Errors
      if (handleError) {
        handleHttpError({ ...err, error, serverError, formErrors });
      }
    });

  // Call After Function With Response As Parameter
  after(result);

  // Deactivate Loading Status
  // commit("loading", false);

  return result;
}

function queryParams(key, queries) {
  if (!key) return queries;

  return queries[key] || false;
}

// Handle Response Data
function handleHttpResponse({ response, success }) {
  // No Data Was Returned
  if (!response.data) {
    console.log('No Data Was Returned');
    // this.warning(
    // 	"There was an error",
    // 	"Please Try Again Later"
    // );
    return;
  }

  if (response.data.success) {
    success(response);
  }
}

// Handle Response Errors
function handleHttpError({ response, error, serverError, formErrors }) {
  // No Response Was Returned
  if (!response) {
    console.log('No Response Was Returned');
    // this.error(
    // 	"There was an error",
    // 	"Please try again later"
    // );
    return;
  }

  error(response);

  // Handle Error States / Codes
  switch (response.status) {
    case 400:
      // Bad Request
      console.log('Bad Request');
      break;
    case 404:
      // Not Found
      console.log('Not Found');
      break;
    case 419:
      // X-CSRF-TOKEN Error
      console.log('X-CSRF-TOKEN Error');
      break;
    case 422:
      if (formErrors) {
        // Input Data Error
        console.log('Input Data Error');
      }
      break;
    case 500:
      // Server Error
      console.log('Server Error');
      break;
    case 504:
      // Gateway Timeout
      console.log('Gateway Timeout');
      break;

    // ================================================================================
    // ================================================================================
    // Custom Error Codes
    // ================================================================================
    // ================================================================================
    case 449:
      // Just Try Again
      console.log('Just Try Again');
      break;
    default:
      // Unknown Error
      console.log('Unknown Error');
      break;
  }
}
