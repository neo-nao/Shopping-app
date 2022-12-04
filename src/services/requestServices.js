import http from "./httpServices";

async function fetchFunc(url) {
  try {
    const { data } = await http.get(url);

    return data;
  } catch (err) {
    console.error(err);
    return { errorMessage: err };
  }
}

async function postFunc(url, data) {
  try {
    const response = await http.post(url, data);

    return response.data;
  } catch (err) {
    console.error(err);
    return { errorMessage: err };
  }
}

async function deleteFunc(url) {
  try {
    const {
      data: [selectedItem],
    } = await http.get(url);

    const res = await http.delete("/usersCart/" + selectedItem.id);

    return res.statusText === "OK" && selectedItem;
  } catch (err) {
    console.error(err);
    return { errorMessage: err };
  }
}

async function putFunc(url, data) {
  return await http.put(url, data);
}

export { fetchFunc, postFunc, deleteFunc, putFunc };
