const navbar = document.querySelector('.navbar')

const navLinks = document.querySelectorAll('.nav-link')
const countingVisitatori = document.querySelector('#countingVisitatori')
console.log(countingVisitatori)
window.addEventListener('scroll',() => {

    if (window.scrollY > 100) {
        navbar.style.backgroundColor = '#2a2a2a'
        navLinks.forEach((link) => {
                link.style.color = 'white'
    })  
} else {
       navbar.style.background = 'transparent'
       navLinks.forEach((link) => {
        link.style.color = 'black'
       })
}
})





function counting(maxN, element, f ) {
    let counter = 0
    let Interval = setInterval(() => {
        if(counter<maxN){
            counter++
            element.innerHTML = counter
        } else {
            clearInterval(Interval)
        }
    }, f)
}
counting(200,countingVisitatori,10)