import * as coursesApi from "./APIs/courses-api.js";

let courses = coursesApi.loadCourses();

courses.then((response) => setAllCourses(response));

console.log(document.querySelector(".main-content__course-container-1").querySelector('.main-content__course-card'))
function setAllCourses(data){
    console.log("S", data);
}
setAllCourses();