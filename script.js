const main = (carousel, index) => {
  setupNavButtons(carousel, index);
  setupNavDots(carousel, index);
  const previousButtons = document.querySelectorAll(".previous");
  previousButtons.forEach((previous) => {
    previous.addEventListener("click", handlePreviousClick);
  })

  const nextButtons = document.querySelectorAll(".next");
  nextButtons.forEach((next) => {
    next.addEventListener("click", handleNextClick);
  })

  const imageDotsButtons = document.querySelectorAll(".dots");
  imageDotsButtons.forEach((imageDots) => {
    imageDots.addEventListener("click", handleDotClick);
  })
};

// create the nav buttons (left and right)
const setupNavButtons = (carousel, index) => {
    const nextButton = document.createElement("button");
    const previousButton = document.createElement("button");
    const dotNavs = document.createElement("div");
    
    nextButton.classList.add("next");
    previousButton.classList.add("previous");
    dotNavs.classList.add("dots");

    nextButton.value = index
    previousButton.value = index
    
    nextButton.textContent = ">";
    previousButton.textContent = "<";
    carousel.appendChild(nextButton);
    carousel.appendChild(previousButton);
    carousel.appendChild(dotNavs);
};

// create the nav buttons (left and right)
const setupNavDots = (carousel, index) => {
  const imageDots = carousel.querySelector(".dots");
  const total = image_urls[index].length;
  for (let i = 0; i < total; i++) {
    const dot = document.createElement("button");
    dot.classList.add("dot");
    dot.value = index
    if (i === 1) dot.classList.add("filled");
    imageDots.appendChild(dot);
  }
};

// get index for looping array
const getNewIndex = (index, mod, image_urls) => {
  let newIndex = index + mod;
  if (newIndex < 0) newIndex += image_urls.length;
  else if (newIndex > image_urls.length - 1) newIndex -= image_urls.length;
  return newIndex;
};

// change the image on screen
const changeImage = (image, direction, i) => {
  const mod = direction === "next" ? 3 : -3;
  const currentURL = image.attributes[1].value;
  const index = image_urls[i].findIndex((url) => url === currentURL);
  const newIndex = getNewIndex(index, mod, image_urls[i]);
  image.src = image_urls[i][newIndex];
};

// update which dot is filled
const updateDots = (direction, carouselIndex) => {
  const dots = allCarousels[carouselIndex].querySelectorAll(".dot");
  let index = null;
  const mod = direction === "next" ? 1 : -1;
  for (let i = 0; i < dots.length; i++) {
    const dot = dots[i];
    if (dot.classList.contains("filled")) {
      index = i;
      dot.classList.remove("filled");
    }
  }
  const newIndex = getNewIndex(index, mod, image_urls[carouselIndex]);
  dots[newIndex].classList.add("filled");
};

const handlePreviousClick = (e) => {
  const i = e.target ? e.target.value : e
  updateDots("previous", i);
  imagesNodeList[i].forEach((image) => {
    image.style.left = "";
    if (image.classList.contains("left")) {
      image.classList.remove("left");
      image.classList.add("center");
      image.style.left = `calc(50% - ${image.width}px / 2)`;
    } else if (image.classList.contains("center")) {
      image.classList.remove("center");
      image.classList.add("right");
    } else if (image.classList.contains("right")) {
      image.classList.remove("right");
      image.classList.add("left");
      changeImage(image, "previous", i);
    }
  });
};

const handleNextClick = (e) => {
  const i = e.target ? e.target.value : e
  updateDots("next", i);
  imagesNodeList[i].forEach((image) => {
    image.style.left = "";
    if (image.classList.contains("left")) {
      image.classList.remove("left");
      image.classList.add("right");
      changeImage(image, "next", i);
    } else if (image.classList.contains("center")) {
      image.classList.remove("center");
      image.classList.add("left");
    } else if (image.classList.contains("right")) {
      image.classList.remove("right");
      image.classList.add("center");
      image.style.left = `calc(50% - ${image.width}px / 2)`;
    }
  });
};

const handleDotClick = (e) => {
  const i = e.target.value
  const targetClass = e.target.classList;
  targetClass.add("selected");
  const [currentIndex, selectedIndex] = getIndexes(i);
  moveImages(currentIndex, selectedIndex, i);
  targetClass.remove("selected");
};

// move images if dots clicked
const moveImages = (currentIndex, selectedIndex, carouselNumb) => {
  if (selectedIndex > currentIndex) {
    for (let i = currentIndex; i < selectedIndex; i++) {
      handleNextClick(carouselNumb);
    }
  } else {
    for (let i = selectedIndex; i < currentIndex; i++) {
      handlePreviousClick(carouselNumb);
    }
  }
};

// get index range from dot clicks
const getIndexes = (i) => {
  let currentIndex = 0;
  let selectedIndex = 0;
  const dots = allCarousels[i].querySelectorAll(".dot");
  for (let i = 0; i < dots.length; i++) {
    const dot = dots[i];
    if (dot.classList.contains("filled")) currentIndex = i;
    if (dot.classList.contains("selected")) selectedIndex = i;
  }
  return [currentIndex, selectedIndex];
};

// get image href's
const getImageURLs = (images) => {
  const image_urls = [];
  images.forEach((image) => {
    image_urls.push(image.attributes[1].value);
  });
  return image_urls;
};


const setCSSDimensions = (carousel, length) => {
  const dots = carousel.querySelector(".dots");
  dots.style.left = `calc(50% - 1rem * ${length}/2`;
};

let image_urls = [];
let imagesNodeList = [];

const allCarousels = document.querySelectorAll(".image-carousel");
allCarousels.forEach((carousel, index) => {
  imagesNodeList.push(carousel.querySelectorAll("img"));
  image_urls.push(getImageURLs(imagesNodeList[index]));
  main(carousel, index);
  setCSSDimensions(carousel, imagesNodeList[index].length);

})
