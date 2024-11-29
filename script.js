const setupNavButtons = () => {
    const carousel = document.querySelector('.image-carousel')
    const nextButton = document.createElement('button')
    const previousButton = document.createElement('button')
    nextButton.classList.add('next')
    previousButton.classList.add('previous')
    nextButton.textContent = ">"
    previousButton.textContent = "<"
    carousel.appendChild(nextButton)
    carousel.appendChild(previousButton)
}

setupNavButtons()

const imagesNodeList = document.querySelectorAll('.image-carousel img')

const getImageURLs = (images) => {
    const image_urls = []
    images.forEach(image => {
        image_urls.push(image.attributes[1].value)
    })
    return image_urls
}

const image_urls = getImageURLs(imagesNodeList)

console.table(image_urls)

const changeImage = (image, direction) => {
    const mod = direction === 'next' ? 3 : -3
    const currentURL = image.attributes[1].value
    const index = image_urls.findIndex(url => url === currentURL)
    let newIndex = index + mod
    if (newIndex < 0)
        newIndex += image_urls.length
    else if (newIndex > image_urls.length - 1)
        newIndex -= image_urls.length
    image.src = image_urls[newIndex]
}  


const handlePreviousClick = (image) => {
    if (image.classList.contains('left')) {
        image.classList.remove('left')
        image.classList.add('center')
    }
    else if (image.classList.contains('center')) {
        image.classList.remove('center')
        image.classList.add('right')
    }
    else if (image.classList.contains('right')) {
        image.classList.remove('right')
        image.classList.add('left')
        changeImage(image, 'next')
    }
}


const handleNextClick = (image) => {
    if (image.classList.contains('left')) {
        image.classList.remove('left')
        image.classList.add('right')
        changeImage(image, 'next')
    }
    else if (image.classList.contains('center')) {
        image.classList.remove('center')
        image.classList.add('left')
    }
    else if (image.classList.contains('right')) {
        image.classList.remove('right')
        image.classList.add('center')
    }
}


const previous = document.querySelector('.previous')
previous.addEventListener('click', () => {
    imagesNodeList.forEach(handlePreviousClick)
})

const next = document.querySelector('.next')
next.addEventListener('click', () => {
    imagesNodeList.forEach(handleNextClick)
})
