

export async function callPostRequest(requestCall, url, requestBody, headers = {}) {
    const response = await requestCall.post(url, {
        data: requestBody,
        headers: headers
    });
    return response;
}