// Load all courses from api

export async function loadCourses() {
    const response = await (await fetch("https://my-json-server.typicode.com/Sara-Samer/udemy/courses")).json();
    return response;
}

// Load all courses opportunities and desc from api

export async function loadTabData() {
    const response = await (await fetch("https://my-json-server.typicode.com/Sara-Samer/udemy/tabs")).json();
    return response;
}

// Load all courses category data from api
export async function loadcategoryData() {
    const response = await (await fetch("https://my-json-server.typicode.com/Sara-Samer/udemy/categories")).json();
    return response;
}
