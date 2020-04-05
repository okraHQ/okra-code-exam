/**
 * @file define a wrapper over fetch method for calling http requests
 */
// third party imports
import fileDownload from 'js-file-download';

// constants
const GET = 'GET';

/**
 * @constant fetchOptions
 * This are the default options passed into fetch for a typical api request we can update this option to serve individual use case
 */
export const fetchOptions = {
  method: "GET", // GET | POST | PUT | PATCH | DELETE
  // mode: 'no-cors', // Uncheck for cors
  // cache: 'no-cahce' // valid options default, no-cache, reload, force-cache, only-if-chached
  // credentials: 'same-origin', // include, same-origin, omit
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    'x-access-token': ''
    // "Content-Type": "application/x-www-form-urlencoded",
  },
  body: {}, // call JSON.stringify on body
};

const applicationHeaders = {
  json: "application/json",
  pdf: "application/pdf",
  xsl:
    // 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
    // 'application/vnd.openxmlformats-officedocument.spreadsheetml.template' ||
    // 'application/vnd.ms-excel' ||
    // 'application/vnd.ms-excel' ||
    // 'application/vnd.ms-excel' ||
    "text/csv",
};

/**
 * @function checkResponseType
 * @descriotion checks the response type and return appropriate value
 * @param {Response } response   -  fetch response object
 * @return { Promise<Object>}
 */

export const checkResponseType = async (response, filename) => {
  const { json, pdf, xsl } = applicationHeaders;
  try {
    const { headers } = response;
    const contentTypeString = "Content-Type" || "content-type";
    const contentType = headers.get(contentTypeString);
    switch (contentType) {
      case json:
        return await response.json();
      case pdf:
        return await response.blob();
      case xsl:
        const csvFile = await response.blob();
        fileDownload(csvFile, `${filename}.csv`);
        return csvFile;

      default:
        return await response.json();
    }
  } catch (err) {
    throw new Error(`${err} error occoured while translating your response`);
  }
};

/**
 * @function makeRequest
 * @param { String } url
 * @param { Object } userFetchOption - any other option you want to pass to GET, check fetchOptions for shape of this object
 * @return { Promise <Object> }
 */
export const makeRequest = async (url, userfetchOption = {}, filename = "") => {
  if (!url) throw new Error("Must provide url at the least");
  const cookie = ''
  let newFetchOptions = {
    ...fetchOptions,
  };
  newFetchOptions = {
    ...newFetchOptions,
    ...userfetchOption,
  };
  const { method, headers } = newFetchOptions;
  const context = method;
  headers["x-access-token"] = cookie;
  if (context === GET) {
    let itemsReturnedFromGet
    try {
      itemsReturnedFromGet = await fetch(url, { headers });
    } catch (err) {
      throw new Error(err.message)
    }
    const { ok, statusText, status } = itemsReturnedFromGet;
    if (!ok) {
    
      throw new Error(err.message);
    }
    // Cater for other return types asides json such as xml, csv, images , etc

    const objectData = await checkResponseType(itemsReturnedFromGet, filename);
    if (!objectData) {
      const errorObj = new Error({
        status: 500,
        message: "Error Getting a json, xml response",
        url,
      });
      const error = errorObj;
      throw new Error(error.message);
    }
    return objectData;
  } else {
    let itemsReturned;
    try {
      let { body } = newFetchOptions;
      if (body) {
        body = JSON.stringify(body);
      }
      itemsReturned = await fetch(url, { ...newFetchOptions, body });
    } catch (err) {
      throw new Error(err.message)
    }

    const { ok, status } = itemsReturned;
    if (!ok) {
      const itemsReturnedResponse = await itemsReturned.json()
      throw new Error(itemsReturnedResponse.error.message);
    }
    if (status === 204) return {};
    const objectData = await checkResponseType(itemsReturned, filename);
    if (!objectData) {
      const errorObj = new Error({
        status: 503,
        message: "Error Getting a json, xml response",
        url,
      });
      const error = errorObj;
      throw new Error(error.message);
    }
    return objectData;
  }
};
