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

let start = 0
let end = 2

const scaleImages = (images) => {
    images.forEach((image, index) => {
        console.log(start)
        console.log(end)
        if(index === start || index === end)
            image.classList.add('small')
        else 
        image.classList.remove('small')
    })
}

const images = document.querySelectorAll('.image')
scaleImages(images)

const previous = document.querySelector('.previous')
previous.addEventListener('click', () => {
    start--
    end--
    images.forEach((image, index) => {
        if (image.classList.contains('next-image')) {
            image.classList.remove('next-image')
            image.classList.add('reset')
            setTimeout(() => {
                image.classList.remove('reset')
            },500)
        } else {
            image.classList.remove('next-image')
            image.classList.add('previous-image')
        }
        scaleImages(images)
    })
})


const next = document.querySelector('.next')
next.addEventListener('click', () => {
    start++
    end++
    images.forEach((image, index) => {
        if (image.classList.contains('previous-image')) {
            image.classList.remove('previous-image')
            image.classList.add('reset')
            setTimeout(() => {
                image.classList.remove('reset')
            },500)
        } else {
            image.classList.remove('previous-image')
            image.classList.add('next-image')
        }
        scaleImages(images)
    })
})