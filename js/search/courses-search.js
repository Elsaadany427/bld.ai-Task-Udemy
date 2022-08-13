const cousesNavContentDiv = document.querySelector(".navbar__web-content");
const courseNav = cousesNavContentDiv.querySelector(".navbar__list");
const courseNavsearchForm = courseNav.querySelector(".navbar__search-form");
const courseNavsearchFormInput = courseNavsearchForm.querySelector("input");
const courseNavsearchFormButton = courseNavsearchForm.querySelector("button");


function handlingEmptyInput() {
    const inputValue = courseNavsearchFormInput?.value?.trim()?.toLowerCase();
    if (!inputValue) {
        handlingCourses();
    }
}

function handlingSearchBtn(event) {
    event.preventDefault();
    handlingCourses();
}

function handlingCourses() {
    const inputValue = courseNavsearchFormInput?.value?.trim()?.toLowerCase();

    const coursesCardsDiv = Array.of(
        document.querySelector(".main-content__course-cards")
    );

    coursesCardsDiv.forEach((card) => {
        card.style.display = "grid";
        const courseCardTitle = card.querySelector("a").innerHTML.toLowerCase();
        const matched = courseCardTitle.includes(inputValue);
        if (!matched) card.style.display = "none";
    });
}

// Handling courses cards when btn clicked
courseNavsearchFormButton.addEventListener("click", handlingSearchBtn, false);

// Handling courses cards when input is empty
courseNavsearchFormInput.addEventListener("keyup", handlingEmptyInput, false);
