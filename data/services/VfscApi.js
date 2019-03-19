import {
  loginUrl,
  userPublicUrl,
  notificationUrl,
  uploadImageUrl,
  getTodayTasksUrl,
  changePasswordUrl,
  workDoneUrl,
  suppliesUrl,
  uploadMetadataUrl,
  useSuppliesUrl,
  createWorkflowUrl,
  quantityVfscUrl,
  quantityGovUrl,
  quantityOrgUrl,
  listPlansUrl,
  plansUrl
} from "./VfscUrl";
function getDefaultHeader() { 
  let defaultHeader = {
    Accept: "application/json",
    "Content-type": "application/json"
  };
  return defaultHeader;
}

async function post(url, body) {
  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
}

async function get(url, accessToken) {
  try {
    let response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken
      }
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.log(error);
  }
}

async function getWithDate(url, fromDate, toDate, accessToken) {
  try {
    let response = await fetch(url + "/" + fromDate +"/" + toDate, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken
      }
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.log(error);
  }
}

async function put(url, value, accessToken) {
  console.log(url + value);
  try {
    let response = await fetch(url + value, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.log(error);
  }
}

async function getWithNumber(url, accessToken, page, size) {
  try {
    let response = await fetch(url + page + "/" + size, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken
      }
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.log(error);
  }
}

async function postAccessToken(url, body, accessToken) {
  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json"
      },
      body:  JSON.stringify(body)
    });
    
    let responseJson = await response.json();
    console.log("responseJson", responseJson);
    return responseJson;
  } catch (error) {
    console.log(error);
  }
}

async function postFile(url, body, accessToken) {
  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "multipart/form-data",

      },
      body:  body
    });
    
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.log(error);
  }
}

async function getId(url, id, accessToken) {
  try {
    console.log(22222, url + "/" + id);
    console.log(4444, accessToken);
    let response = await fetch(url + "/" + id, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.log(error);
  }
}

async function uploadImage(body, accessToken) {
  let imageUpload = await postFile(uploadMetadataUrl, body, accessToken);
  return imageUpload;
}

async function getSupplies(accessToken) {
    let reponse = await get(suppliesUrl, accessToken);
    return reponse;
}

async function getWorkDone(accessToken, page, size) {
  let reponse = await getWithNumber(workDoneUrl,accessToken, page, size);
  return reponse;
}

async function changePassword(value, accessToken) {
  let reponse = await put(changePasswordUrl, value, accessToken);
  return reponse;
}

async function loginApi(body) {
  let loginResponse = await post(loginUrl, body);
  return loginResponse;
}

async function getPublicUser(accessToken) {
  let userResponse = await get(userPublicUrl, accessToken);
  return userResponse;
}

async function getNotification(accessToken) {
  let notification = await get(notificationUrl, accessToken);
  return notification;
}

async function remindWork(accessToken) {
  let remindWork = await get(getTodayTasksUrl, accessToken);
  return remindWork;
}

async function postListUseSupplies(body, accessToken) {
  let useSupplies = await postAccessToken(useSuppliesUrl, body, accessToken);
  return useSupplies;
}

async function createWorkflow(body, accessToken) {
  let createWorkflow = await postAccessToken(createWorkflowUrl, body, accessToken);
  return createWorkflow;
}

async function getQuantityVfsc(fromDate, toDate, accessToken) {
  let quantityVfsc = await getWithDate(quantityVfscUrl, fromDate, toDate, accessToken);
  return quantityVfsc;
}

async function getQuantityGov(fromDate, toDate, accessToken) {
  let quantityGov = await getWithDate(quantityGovUrl, fromDate, toDate, accessToken);
  return quantityGov;
}

async function getQuantityOrg(fromDate, toDate, accessToken) {
  let quantityOrg = await getWithDate(quantityOrgUrl, fromDate, toDate, accessToken);
  return quantityOrg;
}

async function getListPlans(accessToken) {
  let listPlan = await get(listPlansUrl, accessToken); 
  return listPlan;
}

async function getPlan(id, accessToken) {
  let plan = await getId(plansUrl, id, accessToken);
  return plan;
} 

module.exports = {
  loginApi: loginApi,
  getPublicUser: getPublicUser,
  getNotification: getNotification,
  uploadImage: uploadImage,
  remindWork: remindWork,
  changePassword: changePassword,
  getWorkDone: getWorkDone,
  getSupplies: getSupplies,
  postListUseSupplies: postListUseSupplies,
  createWorkflow: createWorkflow,
  getQuantityVfsc: getQuantityVfsc,
  getQuantityGov: getQuantityGov,
  getQuantityOrg: getQuantityOrg,
  getListPlans: getListPlans,
  getPlan: getPlan,
};
