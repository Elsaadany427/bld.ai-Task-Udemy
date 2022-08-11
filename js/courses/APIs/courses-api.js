// Load all courses from api

export async function loadCourses() {
    const response = await fetch("http://localhost:3000/courses");
    return await response.json();
}
