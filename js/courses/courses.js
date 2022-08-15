import * as coursesApi from "./APIs/courses-api.js";

/**
 * Local references to call two classes courses section and Tab list
 */
const courseTabList = document.querySelector(".main-content__cources-list");
const courseSection = document.querySelector(".main-content__cources-content");

/**
 * Local references to call courses api to get categories and tabs data
 */
const categoryArray = Array.from(await coursesApi.loadcategoryData());
const tabsData = await coursesApi.loadTabData();

/**
 * Creating Tabs
 * first looping over category and call createTabs func to create tabs
 */
categoryArray.forEach((categoryName) => {
  createTabs(categoryName);
});

/**
 * Function that create tabs like (python, excel, ...)
 * @param {Tab name we got from category array} tabName
 * @return void
 */
function createTabs(tabName) {
  const li = document.createElement("li");
  li.classList.add("main-content__cources-item");

  const a = document.createElement("a");
  a.href = `#${tabName}`;
  a.innerHTML = tabName;

  li.appendChild(a);
  courseTabList.appendChild(li);
}

// Calling default tap in the first
const courseItem = document.querySelector(".main-content__cources-item");
const tapLink = courseItem.querySelector("a");

onTabClickOrDefaultTab(tapLink);

// when tap clicked
const element = document.querySelector(".main-content__cources-nav");
element.addEventListener(
  "click",
  (event) => onTabClickOrDefaultTab(event.target),
  false
);

/**
 * Function used to create content based on tab needed
 * @param {*} tapName
 */
async function onTabClickOrDefaultTab(tapName) {
  const coursesArray = Array.from(await coursesApi.loadCourses());

  if (courseSection.children.length == 0) {
    createCourseContainer(tapName.href.split("#")[1]);
  } else {
    removeChilds(courseSection);
    createCourseContainer(tapName.href.split("#")[1]);
  }

  let activeTabs = document.querySelectorAll(".active");

  // deactivate existing active tab and panel
  activeTabs.forEach(function (tab) {
    tab.className = tab.className.replace("active", "");
  });

  // activate new tab and panel
  tapName.parentElement.className += " active";
  document.getElementById(tapName.href.split("#")[1]).className += " active";

  const courseContainer = document.getElementById(tapName.href.split("#")[1]);
  const courseCards = courseContainer.querySelector(
    ".main-content__course-cards"
  );

  courseContainer.prepend(
    createCourseDesc(
      tapName.href.split("#")[1],
      tabsData[tapName.href.split("#")[1]].opportunities,
      tabsData[tapName.href.split("#")[1]].desc
    )
  );
  let coursesSize = 0;
  coursesArray.forEach((course) => {
    if (course.category === tapName.href.split("#")[1]) {
      coursesSize++;
    }
  });
  const relatedCourses = [];
  coursesArray.forEach((course) => {
    if (course.category === tapName.href.split("#")[1]) {
      relatedCourses.push(course);
    }
  });
  courseCards.appendChild(createCarousel(relatedCourses, coursesSize));
}

/**
 * Creating cards container
 * Function that create courses container div
 * and cards div inside it
 * @param {*} categoryName
 * @return void
 */
function createCourseContainer(categoryName) {
  const courseParentDiv = document.createElement("div");
  courseParentDiv.classList.add("main-content__course-container");
  courseParentDiv.id = categoryName;

  const courseCards = document.createElement("div");
  courseCards.classList.add("main-content__course-cards");
  courseCards.classList.add("container");

  courseParentDiv.appendChild(courseCards);
  courseSection.appendChild(courseParentDiv);
}

/**
 * Creating Card
 * Function that create card it take object
 * @param {image, title, auther, starRate, students, price } courseObject
 * @return Card Div
 */
function createCards({ image, title, auther, starRate, students, price }) {
  // create course card div
  const courseCardDiv = document.createElement("div");
  // create course card attr
  courseCardDiv.classList.add("main-content__course-card");

  // create course card img div
  const cardImgDiv = document.createElement("div");
  // create course card img div attr
  cardImgDiv.classList.add("main-content__card-img");
  // create course card img
  const cardImg = document.createElement("img");
  // create image src
  cardImg.src = image;
  // append image in the div
  cardImgDiv.appendChild(cardImg);
  // append card Img Div in course card
  courseCardDiv.appendChild(cardImgDiv);

  // create h3 tag for card title
  const cardTitle = document.createElement("h3");
  // create a tag inside h3 title
  const cardTitleLink = document.createElement("a");
  // craete a tag content text
  cardTitleLink.innerHTML = title;
  // append card link inside card title (h3 tag)
  cardTitle.appendChild(cardTitleLink);
  // append card title (h3 tag) into course card
  courseCardDiv.appendChild(cardTitle);

  // create auther div
  const cardAutherDiv = document.createElement("div");
  // create span inside auther div
  const cardAutherSpan = document.createElement("span");
  // create auther span content text
  cardAutherSpan.innerHTML = auther;
  // append span inside auther div
  cardAutherDiv.appendChild(cardAutherSpan);
  // append card auther div into course card
  courseCardDiv.appendChild(cardAutherDiv);

  // stars
  const stars = createStars(starRate, students);
  courseCardDiv.append(stars);

  // create price div
  const cardPriceDiv = document.createElement("div");
  // create price div attr
  cardPriceDiv.classList.add("main-content__card-price");
  // create price span
  const cardPrice = document.createElement("span");
  // create price span content text
  cardPrice.innerHTML = "E£" + price;
  // append price span into price div
  cardPriceDiv.appendChild(cardPrice);
  // append price div into course card
  courseCardDiv.appendChild(cardPriceDiv);

  return courseCardDiv;
}

/**
 * Creating Course Desc
 * Function that create course desc and opportunities
 * @param {Category name that added in button innerHTML} name
 * @param {*} opportunities
 * @param {*} desc
 * @return course desc div
 */
function createCourseDesc(name, opportunities, desc) {
  const courseDescDiv = document.createElement("div");
  courseDescDiv.classList.add("main-content__course-desc");

  // creating opportunities h2 tag
  const h2 = document.createElement("h2");
  h2.innerHTML = opportunities;
  courseDescDiv.appendChild(h2);

  // creating desc p tag
  const p = document.createElement("p");
  p.innerHTML = desc;
  courseDescDiv.appendChild(p);

  // creating Explore button
  const button = document.createElement("button");
  const classes = ["btn", "btn-secondry", "btn-height"];
  button.classList.add(...classes);
  button.innerHTML = `Explore ${name}`;
  courseDescDiv.appendChild(button);

  return courseDescDiv;
}

/**
 * Function that called in createCard function to create stars div
 * @param {*} starRate
 * @param {Number of students} students
 * @return stars div
 */
function createStars(starRate, students) {
  const totalStars = 5;
  // if rate is 4.4 it will take the integer 4
  const currRateAsInteger = parseInt((starRate / 10) * 10);

  // create star container div
  const starsContainerDiv = document.createElement("div");
  const starRateSpan = document.createElement("span");
  starRateSpan.innerHTML = starRate;
  starsContainerDiv.append(starRateSpan);

  const starIconsSpan = document.createElement("span");
  starIconsSpan.classList.add("main-content__card-stars");

  // fill all integer star with gold color
  for (let i = 0; i < currRateAsInteger; i++) {
    const starIcon = document.createElement("i");
    const classes = ["fa-solid", "fa-star"];
    starIcon.classList.add(...classes);
    starIconsSpan.append(starIcon);
  }

  // fill the half star
  if (starRate - currRateAsInteger > 0) {
    const halfStarIcon = document.createElement("i");
    const classes = ["fa-solid", "fa-star-half-stroke"];
    halfStarIcon.classList.add(...classes);
    starIconsSpan.append(halfStarIcon);
  }

  // fill unFill star with gray color
  const unFillStar = parseInt(((totalStars - starRate) / 10) * 10);

  for (let i = 0; i < unFillStar; i++) {
    // create icon star
    const starIcon = document.createElement("i");
    const classes = ["fa-solid", "fa-star", "fa-gray"];
    starIcon.classList.add(...classes);
    starIconsSpan.append(starIcon);
  }

  // append star in star container
  starsContainerDiv.append(starIconsSpan);

  // create student span
  const studentSpan = document.createElement("span");
  studentSpan.innerHTML = "(" + students + ")";
  starsContainerDiv.append(studentSpan);

  return starsContainerDiv;
}

function createCarousel(coursesArray, courseSize) {
  // Carousel Wrapper
  const carouselWrapperDiv = document.createElement("div");
  const carouselClasses = ["carousel", "slide"];
  carouselWrapperDiv.classList.add(...carouselClasses);
  carouselWrapperDiv.setAttribute("data-bs-ride", "carousel");
  carouselWrapperDiv.id = "multi-cards";

  // Controls
  const controlsButtonDiv = document.createElement("div");
  controlsButtonDiv.classList.add("controls");

  // prev button
  const prevButtonLink = document.createElement("a");
  const prevBtnClasses = ["btn-floating", "prev"];
  prevButtonLink.classList.add(...prevBtnClasses);

  prevButtonLink.setAttribute("data-bs-target", "#multi-cards");
  prevButtonLink.setAttribute("data-bs-slide", "prev");

  const prevButtonI = document.createElement("i");
  const prevButtonClasses = ["fa", "fa-chevron-right"];
  prevButtonI.classList.add(...prevButtonClasses);
  prevButtonLink.appendChild(prevButtonI);
  controlsButtonDiv.appendChild(prevButtonLink);

  // next button
  const nextButtonLink = document.createElement("a");
  const nextBtnClasses = ["btn-floating", "next"];
  nextButtonLink.classList.add(...nextBtnClasses);

  nextButtonLink.setAttribute("data-bs-target", "#multi-cards");
  nextButtonLink.setAttribute("data-bs-slide", "next");

  const nextButtonI = document.createElement("i");
  const nextButtonClasses = ["fa", "fa-chevron-left", "next"];
  nextButtonI.classList.add(...nextButtonClasses);
  nextButtonLink.appendChild(nextButtonI);
  controlsButtonDiv.appendChild(nextButtonLink);

  carouselWrapperDiv.appendChild(controlsButtonDiv);

  // Slides
  const carouselInnerDiv = document.createElement("div");
  carouselInnerDiv.classList.add("carousel-inner");
  carouselInnerDiv.setAttribute("role", "listbox");

  let cardsInCarousel = 4;
  // Carousel items
  let carouselItemSize =
    parseInt(courseSize / cardsInCarousel) + (courseSize % 2 == 1 ? 1 : 0);

  // calc carouselItemSize depended on screen size()
  if (screen.width <= 991) {
    cardsInCarousel = 3;
    carouselItemSize =
      parseInt(courseSize / cardsInCarousel) + (courseSize % 2 == 1 ? 1 : 0);
  }
  // calc carouselItemSize depended on screen size()
  if (screen.width <= 767) {
    cardsInCarousel = 2;
    carouselItemSize =
      parseInt(courseSize / cardsInCarousel) + (courseSize % 2 == 1 ? 1 : 0);
  }
  // calc carouselItemSize depended on screen size()
  if (screen.width <= 575) {
    cardsInCarousel = 1;
    carouselItemSize = parseInt(courseSize / cardsInCarousel);
  }

  var j = 0;
  for (let i = 0; i < carouselItemSize; i++) {
    const carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item");
    if (i == 0) carouselItem.classList.add("active");
    const row = document.createElement("div");
    row.classList.add("row");
    var cnt = 0;
    while (cnt < cardsInCarousel && j < courseSize) {
      const col = document.createElement("div");
      const colClasses = ["col-lg-3", "col-md-4", "col-sm-6", "clearfix"];
      col.classList.add(...colClasses);
      const card = createCards(coursesArray[j]);
      col.appendChild(card);
      row.appendChild(col);
      cnt++, j++;
    }

    carouselItem.appendChild(row);
    carouselInnerDiv.appendChild(carouselItem);
  }
  carouselWrapperDiv.appendChild(carouselInnerDiv);
  return carouselWrapperDiv;
}

/**
 * Function used to remove childs
 * @param {*} parentDiv
 */
function removeChilds(parentDiv) {
  while (parentDiv.firstChild) {
    parentDiv.removeChild(parentDiv.firstChild);
  }
}
