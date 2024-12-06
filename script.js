const main = () => {
  setupNavButtons();
  setupNavDots();
  const previous = document.querySelector(".previous");
  previous.addEventListener("click", handlePreviousClick);

  const next = document.querySelector(".next");
  next.addEventListener("click", handleNextClick);

  const imageDots = document.querySelector(".dots");
  imageDots.addEventListener("click", handleDotClick);
};

const setupNavButtons = () => {
  const carousel = document.querySelector(".image-carousel");
  const nextButton = document.createElement("button");
  const previousButton = document.createElement("button");
  const dotNavs = document.createElement("div");

  nextButton.classList.add("next");
  previousButton.classList.add("previous");
  dotNavs.classList.add("dots");

  nextButton.textContent = ">";
  previousButton.textContent = "<";
  carousel.appendChild(nextButton);
  carousel.appendChild(previousButton);
  carousel.appendChild(dotNavs);
};

const getImageURLs = (images) => {
  const image_urls = [];
  images.forEach((image) => {
    image_urls.push(image.attributes[1].value);
  });
  return image_urls;
};

const setupNavDots = () => {
  const imageDots = document.querySelector(".dots");
  const total = image_urls.length;
  for (let i = 0; i < total; i++) {
    const dot = document.createElement("button");
    dot.classList.add("dot");
    if (i === 1) dot.classList.add("filled");
    imageDots.appendChild(dot);
  }
};

const getNewIndex = (index, mod, image_urls) => {
  let newIndex = index + mod;
  if (newIndex < 0) newIndex += image_urls.length;
  else if (newIndex > image_urls.length - 1) newIndex -= image_urls.length;
  return newIndex;
};

const changeImage = (image, direction) => {
  const mod = direction === "next" ? 3 : -3;
  const currentURL = image.attributes[1].value;
  const index = image_urls.findIndex((url) => url === currentURL);
  const newIndex = getNewIndex(index, mod, image_urls);
  image.src = image_urls[newIndex];
};

const updateDots = (direction) => {
  const dots = document.querySelectorAll(".dot");
  let index = null;
  const mod = direction === "next" ? 1 : -1;
  for (let i = 0; i < dots.length; i++) {
    const dot = dots[i];
    if (dot.classList.contains("filled")) {
      index = i;
      dot.classList.remove("filled");
    }
  }
  const newIndex = getNewIndex(index, mod, image_urls);
  dots[newIndex].classList.add("filled");
};

const handlePreviousClick = () => {
  updateDots("previous");
  imagesNodeList.forEach((image) => {
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
      changeImage(image, "next");
    }
  });
};

const handleNextClick = () => {
  updateDots("next");
  imagesNodeList.forEach((image) => {
    image.style.left = "";
    if (image.classList.contains("left")) {
      image.classList.remove("left");
      image.classList.add("right");
      changeImage(image, "next");
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
  const targetClass = e.target.classList;
  targetClass.add("selected");
  const [currentIndex, selectedIndex] = getIndexes();
  moveImages(currentIndex, selectedIndex);
  targetClass.remove("selected");
};

const moveImages = (currentIndex, selectedIndex) => {
  if (selectedIndex > currentIndex) {
    for (let i = currentIndex; i < selectedIndex; i++) {
      handleNextClick();
    }
  } else {
    for (let i = selectedIndex; i < currentIndex; i++) {
      handlePreviousClick();
    }
  }
};

const getIndexes = () => {
  let currentIndex = 0;
  let selectedIndex = 0;
  const dots = document.querySelectorAll(".dots .dot");
  for (let i = 0; i < dots.length; i++) {
    const dot = dots[i];
    if (dot.classList.contains("filled")) currentIndex = i;
    if (dot.classList.contains("selected")) selectedIndex = i;
  }
  return [currentIndex, selectedIndex];
};

const setCSSDimensions = (length) => {
  const dots = document.querySelector(".dots");
  dots.style.left = `calc(50% - 1rem * ${length}/2`;
};

const imagesNodeList = document.querySelectorAll(".image-carousel img");
const image_urls = getImageURLs(imagesNodeList);
main();
setCSSDimensions(imagesNodeList.length);
