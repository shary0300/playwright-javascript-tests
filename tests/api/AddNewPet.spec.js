import { test, expect, request } from "@playwright/test";
import requestBodyTemplate from "../../test-data/api/addPetBody.json";
import { callPostRequest } from "../../utils/postRequest";
import endPoints from "../../test-data/api/endpoints.json";
import headers from "../../test-data/api/headers.json";

test.describe.configure({ mode: "serial" });

test("Create a Pet @api", async ({ baseURL }) => {
  const requestCall = await request.newContext();

  const dynamicRequestBody = {
    ...requestBodyTemplate,
    id: Date.now(),
    category: {
      id: Math.floor(Math.random() * 1000),
      name: `categoryName-${Date.now()}`,
    },
    name: `PetName-${Date.now()}`,
    photoUrls: ["https://xyz.com/image1.jpg"],
    tags: [
      {
        id: Math.floor(Math.random() * 1000),
        name: `tagName-${Date.now()}`,
      },
    ],
    status: "available",
  };

  const petEndpointURL = `${baseURL}${endPoints.pet}`;

  const petResponse = await callPostRequest(
    requestCall,
    petEndpointURL,
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

  console.log("Created Pet Response:", responseBody);
});
