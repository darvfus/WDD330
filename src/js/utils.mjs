// Wrapper for querySelector that returns the matching element
export const qs = (selector, parent = document) => parent.querySelector(selector);


// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// helper to get parameter strings
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

// function to take a list of objects and a template and insert the objects as HTML into the DOM
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  const htmlStrings = list.map(templateFn);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// function to take an optional object and a template and insert the objects as HTML into the DOM
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  //if there is a callback...call it and pass data
=======
// Retrieve data from local storage
export const getLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null; // Return null if no data found
};

// Save data to local storage
export const setLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Set a listener for both touchend and click events
export const setClick = (selector, callback) => {
  const element = qs(selector);
  if (element) { // Ensure element exists
    element.addEventListener("touchend", (event) => {
      event.preventDefault();
      callback();
    });
    element.addEventListener("click", callback);
  }
};

// Get parameter from URL
export const getParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param); // Return the parameter value
};

// Function to take a list of objects and a template and insert the objects as HTML into the DOM
export const renderListWithTemplate = (
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) => {
  const htmlStrings = list.map(templateFn);
  // If clear is true, clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
};

// Render single item with template
export const renderWithTemplate = (templateFn, parentElement, data, callback) => {
  parentElement.insertAdjacentHTML("afterbegin", templateFn(data)); // Pass data to template function

  if (callback) {
    callback(data);
  }
};

// Load a template from the given path
const loadTemplate = async (path) => {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to load template: ${res.statusText}`);
    const template = await res.text();
    return template;
  } catch (error) {
    console.error(error); // Log any errors that occur during the fetch
    return ""; // Return an empty string in case of error
  }
};


async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

// function to dynamically load the header and footer into a page
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("#main-header");
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// Function to dynamically load the header and footer into a page
export const loadHeaderFooter = async () => {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("#header");
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#footer");

  if (headerElement) {
    renderWithTemplate(() => headerTemplate, headerElement);
  }

  if (footerElement) {
    renderWithTemplate(() => footerTemplate, footerElement);
  }
};
