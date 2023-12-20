
const navbar = document.querySelector('.navbar')
const navLinks = document.querySelectorAll('.nav-link')
const buttonAggiungi = document.querySelector('.button-aggiungi')
const countingVisitatori = document.querySelector('#countingVisitatori')
const ultimiAnnunci = document.querySelector('#ultimiAnnunci')



// scroll navbar
window.addEventListener('scroll',() => {
    if (window.scrollY > 120) {
        navbar.classList.add('navbar-transition')
        navbar.style.backgroundColor = 'var(--red)';
        navLinks.forEach((link) => {
            link.style.color = 'var(--lightcyan)'
        })
        buttonAggiungi.style.backgroundColor = 'var(--lightcyan)'
        buttonAggiungi.style.color = 'var(--red)'
    } else {
        navbar.style.backgroundColor = 'transparent';
        navLinks.forEach((link) => {
            link.style.color = 'var(--red)'
        })
        buttonAggiungi.style.backgroundColor = 'var(--red)'
        buttonAggiungi.style.color = 'var(--lightcyan)'
    }
});


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


let prodotti = [
    {'nome':'macchina', 'descrizione':'ibrida', 'prezzo':'10000', 'immagine':'https://picsum.photos/200/200'},
    {'nome':'fotocamera', 'descrizione':'full-frame', 'prezzo':'500', 'immagine':'https://picsum.photos/200/200'},
    {'nome':'snowborad', 'descrizione':'freestyle', 'prezzo':'200', 'immagine':'https://picsum.photos/200/200'},        {'nome':'bici', 'descrizione':'corsa', 'prezzo':'700', 'immagine':'https://picsum.photos/200/200'},
    {'nome':'snowborad', 'descrizione':'freestyle', 'prezzo':'200', 'immagine':'https://picsum.photos/200/200'},        {'nome':'scooter', 'descrizione':'city', 'prezzo':'2000', 'immagine':'https://picsum.photos/200/200'},
]


// creazione card ultimi annuncci
prodotti.forEach((singoloProdotto, index) => {
    if ( index >= prodotti.length - 3){

        let newDiv = document.createElement('div');
        newDiv.classList.add('col-12', 'col-md-4');
        newDiv.innerHTML = `
        <div class="border card position-relative">
            <img src='${singoloProdotto.immagine}' alt="">
            <i class="fa-solid fa-heart position-absolute margin-heart text-white"></i>
            <div class="px-3 pt-3">
            <p>${singoloProdotto.nome}</p>
            <p>${singoloProdotto.descrizione}</p>
            </div>
            <p class="ms-auto mt-auto px-3">${singoloProdotto.prezzo}</p>  
        </div>
        `
        ultimiAnnunci.appendChild(newDiv);
    }
});


