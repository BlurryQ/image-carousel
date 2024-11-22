const IMAGES = document.querySelector('.images')

const image_urls = [
    "./imgs/gojo.png", 
    "./imgs/goku.jpg", 
    "./imgs/ichigo.png", 
    "./imgs/kakashi.jpeg", 
    "./imgs/l.png", 
    "./imgs/luffy.png"
]

const imageComponent = (url) =>{
    const img = document.createElement('img')
    img.src = url
    return img
}


const emptyCarousel = () => {
    while (IMAGES.firstChild) {
        IMAGES.removeChild(IMAGES.firstElementChild)
    }
}

const displayCarousel = (images, start = 0) => {
    const end = start + 3
    const length = images.length

    for (let i = start; i < end; i++) {
        let url;
        if (i == -1)            
            url = images[length - 1]
        else if (i == length)
            url = images[0]
        else
            url = images[i];
        img = imageComponent(url)
        if (i == start || i == end - 1) 
            img.classList.add('small')
        IMAGES.appendChild(img)
    }
}

let start = 0
displayCarousel(image_urls, start)

// loop up to 3

// if next pressed set loop 1 - 4 and reload


const previous = document.querySelector('.previous')
previous.addEventListener('click', () => {
    emptyCarousel()
    if (start == -1)
        start = image_urls.length - 2
    else
        start--
    displayCarousel(image_urls, start)
})


const next = document.querySelector('.next')
next.addEventListener('click', () => {
    emptyCarousel()
    if (start == image_urls.length - 2)
        start = 0
    else
        start++
    displayCarousel(image_urls, start)
})