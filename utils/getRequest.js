export async function callGetRequest(requestCall, url, headers = {}) {
    const response = await requestCall.get(url, {
      headers: headers
    });
    return response;
  }
  