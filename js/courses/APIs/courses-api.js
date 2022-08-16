// Load all courses from api

export async function loadCourses() {
    const response = await (await fetch("http://localhost:3000/courses")).json();
    return response;
}

// Load all courses opportunities and desc from api

export async function loadTabData() {
    const response = await (await fetch("http://localhost:3000/tabs")).json();
    return response;
}

// Load all courses category data from api
export async function loadcategoryData() {
    const response = await (await fetch("http://localhost:3000/categories")).json();
    return response;
}
