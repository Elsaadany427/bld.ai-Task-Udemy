import * as coursesApi from "./APIs/courses-api.js";

const courseParent = document.querySelector(
  ".main-content__course-container-1"
);
const courseCards = courseParent.querySelector(".main-content__course-cards");

const courses = await coursesApi.loadCourses();
const tabsData = await coursesApi.loadTabData();

// const tabsDataArray = Array.from(tabsData);
const coursesArray = Array.from(courses);
let stop = false;

coursesArray.forEach((course) => {
  createCards(course);
  if (!stop) {
    let c = course.category;
    console.log("D", tabsData[c].opportunities);
    createCourseDesc(
      course.category,
      tabsData[c].opportunities,
      tabsData[c].desc
    );
    stop = true;
  }
});

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
  const stars = calcStars(starRate, students);
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

  // append card into course parent
  courseCards.appendChild(courseCardDiv);
}

function createCourseDesc(name, opportunities, desc) {
  const tabInfoDiv = document.createElement("div");

  // creating opportunities h2 tag
  const h2 = document.createElement("h2");
  // fill opportunities h2 tag with text
  h2.innerHTML = opportunities;
  // append h2 tag
  tabInfoDiv.appendChild(h2);

  // creating desc p tag
  const p = document.createElement("p");
  // fill desc p tag with text
  p.innerHTML = desc;
  // append p tag
  tabInfoDiv.appendChild(p);

  // creating Explore button
  const button = document.createElement("button");
  // Adding classes to button
  const classes = ["btn", "btn-secondry", "btn-height"];
  button.classList.add(...classes);
  // fill button with text
  button.innerHTML = `Explore ${name}`;
  // append button tag
  tabInfoDiv.appendChild(button);
  courseParent.prepend(tabInfoDiv);
}

function calcStars(starRate, students) {
  const totalStars = 5;
  const currRateAsInteger = parseInt((starRate / 10) * 10);

  // create star container div
  const starsContainerDiv = document.createElement("div");
  // create span that will contain stars with rate
  const starMainSpan = document.createElement("span");
  // create first span inside the main span with rate
  const starRateSpan = document.createElement("span");
  // add content text
  starRateSpan.innerHTML = starRate;
  // append stare rate span to star container
  starsContainerDiv.append(starRateSpan);
  // create span contains star icons
  const starIconSpan = document.createElement("span");
  // add class name to starIconSpan
  starIconSpan.classList.add("main-content__card-stars");

  // fill all integer star
  for (let i = 0; i < currRateAsInteger; i++) {
    // create icon star
    const starIcon = document.createElement("i");
    // add class attr for it
    starIcon.classList.add("fa-solid");
    starIcon.classList.add("fa-star");
    starIconSpan.append(starIcon);
  }


  // for the half star
  if (starRate - currRateAsInteger > 0) {
    const halfStarIcon = document.createElement("i");
    // add class attr for it
    halfStarIcon.classList.add("fa-solid");
    halfStarIcon.classList.add("fa-star-half-stroke");
    starIconSpan.append(halfStarIcon);
  }

  const unFillStar = parseInt(((totalStars - starRate) / 10) * 10);
  // fill all integer star
  for (let i = 0; i < unFillStar; i++) {
    // create icon star
    const starIcon = document.createElement("i");
    // add class attr for it
    starIcon.classList.add("fa-solid");
    starIcon.classList.add("fa-star");
    starIcon.classList.add("fa-gray");
    starIconSpan.append(starIcon);
  }
  // append star in star container
  starsContainerDiv.append(starIconSpan);

  // create student span
  const studentSpan = document.createElement("span");
  // add content text to student span
  studentSpan.innerHTML = "(" + students + ")";
  // append student span into star container
  starsContainerDiv.append(studentSpan);
  

  return starsContainerDiv;
}
