/**
 * Simple API Response Class
 * Spreads all properties directly into response
 * 
 * Usage:
 * res.status(200).json(new ApiResponse(200, { user, token }));
 * res.status(200).json(new ApiResponse(200, 'Deleted successfully'));
 */
class ApiResponse {
  constructor(statusCode, responseData) {
    // Always include success
    this.success = statusCode >= 200 && statusCode < 300;

    // If responseData is a string, treat as message
    if (typeof responseData === 'string') {
      this.message = responseData;
    }
    // If responseData is an object, handle array or spread
    else if (responseData && typeof responseData === 'object') {
      if (Array.isArray(responseData)) {
        this.data = responseData;
      } else {
        Object.assign(this, responseData);
      }
    }
  }
}

module.exports = ApiResponse;
