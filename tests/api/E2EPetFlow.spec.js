import { test, expect, request } from "@playwright/test";
import requestBodyTemplate from "../../test-data/api/addPetBody.json";
import { callPostRequest } from "../../utils/postRequest";
import { callGetRequest } from "../../utils/getRequest";
import endPoints from "../../test-data/api/endpoints.json";
import headers from "../../test-data/api/headers.json";

let petID;
const { pet: petEndPoint } = endPoints;

test.describe.configure({ mode: "serial" });

test("1. Create a Pet @api", async ({ baseURL }) => {
  const requestCall = await request.newContext();

  const dynamicRequestBody = {
    ...requestBodyTemplate,
    id: Date.now(),
    category: {
      id: Math.floor(Math.random() * 1000),
      name: `categoryName-${Date.now()}`,
    },
    name: `PetName-${Date.now()}`,
    tags: [
      {
        id: Math.floor(Math.random() * 1000),
        name: `tagName-${Date.now()}`,
      },
    ],
    status: "available",
  };

  const petResponse = await callPostRequest(
    requestCall,
    `${baseURL}${petEndPoint}`,
    dynamicRequestBody,
    headers
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

  petID = responseBody.id;
  console.log(`Created Pet ID: ${petID}`);
});

test("2. Get Pet details @api", async ({ baseURL }) => {
  const requestCall = await request.newContext();
  const { accept } = headers;

  const petResponse = await callGetRequest(
    requestCall,
    `${baseURL}${petEndPoint}/${petID}`,
    accept
  );
  const responseBody = await petResponse.json();

  expect(petResponse.status()).toBe(200);
  expect(responseBody.id).toBe(petID);
  expect(responseBody.category).toBeDefined();
  expect(responseBody.name).toBeDefined();
  expect(responseBody.photoUrls).toEqual(requestBodyTemplate.photoUrls);
  expect(responseBody.tags).toBeDefined();
  expect(responseBody.status).toBeDefined();

  console.log(`Retrieved Pet Details:`, responseBody);
});
