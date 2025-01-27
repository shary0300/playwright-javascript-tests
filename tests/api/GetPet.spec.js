import { test, expect, request } from "@playwright/test";
import { callGetRequest } from "../../utils/getRequest";
import requestBodyTemplate from "../../test-data/api/addPetBody.json";
import endPoints from "../../test-data/api/endpoints.json";
import headers from "../../test-data/api/headers.json";

test("Get Pet details @api", async ({ baseURL }) => {
  const requestCall = await request.newContext();
  const { accept } = headers;

  const petId = Date.now();
  const dynamicRequestBody = {
    ...requestBodyTemplate,
    id: petId,
    category: {
      id: Math.floor(Math.random() * 1000),
      name: "categoryName" + Date.now(),
    },
    name: "PetName" + Date.now(),
    photoUrls: ["https://xyz.com/image1.jpg"],
    tags: [
      {
        id: Math.floor(Math.random() * 1000),
        name: "tagName" + Date.now(),
      },
    ],
    status: "available",
  };

  const petCreateResponse = await requestCall.post(
    `${baseURL}${endPoints.pet}`,
    {
      data: dynamicRequestBody,
      headers,
    }
  );
  expect(petCreateResponse.status()).toBe(200);

  const petResponse = await callGetRequest(
    requestCall,
    `${baseURL}${endPoints.pet}/${dynamicRequestBody.id}`,
    accept
  );

  const responseBody = await petResponse.json();

  expect(petResponse.status()).toBe(200);
  expect(responseBody.id).toBeDefined();
  expect(typeof responseBody.id).toBe("number");
  expect(responseBody.id).toBeGreaterThan(0);
  expect(responseBody.category).toEqual(dynamicRequestBody.category);
  expect(responseBody.name).toBe(dynamicRequestBody.name);
  expect(responseBody.photoUrls).toEqual(dynamicRequestBody.photoUrls);
  expect(responseBody.tags).toEqual(dynamicRequestBody.tags);
  expect(responseBody.status).toBe(dynamicRequestBody.status);
});
