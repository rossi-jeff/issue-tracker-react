export const buildHeaders = (session = {}) => {
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  if (session.Token) {
    headers.Authorization = `Bearer ${session.Token}`;
  }
  return headers;
};

export class ApiFetch {
  baseUrl = "https://issue-tracker-api.jeff-rossi.com/";
  // baseUrl = "http://localhost:4000/";

  buildQueryString(obj) {
    return Object.keys(obj)
      .map(k => escape(k) + "=" + escape(obj[k]))
      .join("&");
  }

  async getData(path, params = {}, headers = {}) {
    let url = `${this.baseUrl}${path}`;
    if (Object.keys(params).length) {
      url += "?" + this.buildQueryString(params);
    }
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers
    });
    if (response.status >= 400) throw new Error(response.statusText);
    if (response.status === 204) return response;
    return response.json();
  }

  async postData(path, params = {}, headers = {}) {
    let url = `${this.baseUrl}${path}`;
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(params),
      headers
    });
    if (response.status >= 400) throw new Error(response.statusText);
    if (response.status === 204) return response;
    return response.json();
  }

  async patchData(path, params = {}, headers = {}) {
    let url = `${this.baseUrl}${path}`;
    const response = await fetch(url, {
      method: "PATCH",
      mode: "cors",
      body: JSON.stringify(params),
      headers
    });
    if (response.status >= 400) throw new Error(response.statusText);
    if (response.status === 204) return response;
    return response.json();
  }

  async deleteData(path, params = {}, headers = {}) {
    let url = `${this.baseUrl}${path}`;
    if (Object.keys(params).length) {
      url += "?" + this.buildQueryString(params);
    }
    const response = await fetch(url, {
      method: "DELETE",
      mode: "cors",
      headers
    });
    if (response.status >= 400) throw new Error(response.statusText);
    // usually 204 "No Content"
    // using .json() is an error
    return response;
  }
}
