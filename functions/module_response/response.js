const invalidParamResponse = "Invalid request param/s";
const successResponse = "OK"

exports.format = function(code, data) {
  let response = new Object();
  response['code'] = code;
  response['status'] = getResponseMessage(code);
  response['data'] = data;
  response['timestamp'] = Date.now();
  return response;
}

function getResponseMessage(code) {
  switch (code) {
    case 200:
      return successResponse;
    case 422:
      return invalidParamResponse;
    default:
      return "Internal server error";
  }
}
