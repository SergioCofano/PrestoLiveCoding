const navbar = document.querySelector('#navbar');
const navLinks = document.querySelectorAll('.nav-link')
const navBrand = document.querySelector('.navbar-brand');
const btnPrimary = document.querySelector('#btnPrimary');

window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    navbar.style.backgroundColor = '#2a2a2a'
    navLinks.forEach((link) => {
      link.style.color = 'white'
    })
    navBrand.style.color = 'white';
    btnPrimary.style.backgroundColor = 'white'
    btnPrimary.style.color = 'black'
  } else {
    navbar.style.backgroundColor = 'transparent'
    navLinks.forEach((link) => {
      link.style.color = 'black'
    })
    navBrand.style.color = 'black'
    btnPrimary.style.backgroundColor = '#2a2a2a'
    btnPrimary.style.color = 'white'
  }
})

// JSON = JAVASCRIPT OBJECT NOTATION

// PROMISE

fetch('./listapokemon.json')
  .then((response) => response.json())
  .then((listaPokemon) => {
    console.log(listaPokemon);

    let categoriesWrapper = document.querySelector('#categoriesWrapper');
    let cardsWrapper = document.querySelector('#cardsWrapper');

    function showCards(array) {
      cardsWrapper.innerHTML = ''

      array.forEach((element) => {
        let div = document.createElement('div');
        div.classList.add('col-12', 'col-md-6');
        div.innerHTML = `
                <div class="product-card-custom">
                    <div class="icon-container">
                        <i class="fa-regular fa-heart fs-3"></i>
                    </div>
                    <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/132.png" alt="" class="img-fluid mb-3 card-img">
                    <div class="d-flex justify-content-between align-items-start">
                    <div>
                        <p class="fw-bold mb-0" title="${element.name}">${troncate(element.name)}</p>
                        <p class="fst-italic">${element.type}</p>
                    </div>
                    <p class="price-tag">€ ${element.price}</p>
                    </div>
                </div>

                `
        cardsWrapper.appendChild(div)
      })
    }

    showCards(listaPokemon)

    // funzione per creare un input radio per ogni categoira
    function setCategoryRadios() {
      let categories = listaPokemon.map((el) => el.type)


      // creiamo un array che conterrà le categorie non ripetute
      let uniqueCategories = [];

      categories.forEach((type) => {
        if (!uniqueCategories.includes(type)) {
          uniqueCategories.push(type)
        }
      })

      let categoryArray = []
      listaPokemon.forEach((pokemon) => {

        pokemon.type.forEach(pokemonElement => {
          if (!categoryArray.find((elementCheck) => elementCheck == pokemonElement)) {
            categoryArray.push(pokemonElement)
          }
        })
      })

      categoryArray.forEach((type) => {
        let div = document.createElement('div');
        div.classList.add('form-check');
        div.innerHTML = `
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="${type}">
                    <label class="form-check-label" for="${type}">
                        ${type}
                    </label>

                `
        categoriesWrapper.appendChild(div)

        // console.log(div);
      })
    }

    setCategoryRadios()

    let radioInputs = document.querySelectorAll('.form-check-input');
    // console.log(radioInputs);
    // trasformiamo la nodelist in array per applicare i diversi metodi
    let radioBtns = Array.from(radioInputs)
    // console.log(radioBtns);

    // filtro per categoria
    function filterByCategory() {
      let checked = radioBtns.find((radio) => radio.checked)

      let filterType = checked.id
      let filteredPokemonArray = []

      if (filterType != 'All') {
        let filtered = listaPokemon.forEach((pokemon) => {
          pokemon.type.forEach(type => {
            if(type == filterType){
              filteredPokemonArray.push(pokemon)
            }
        })});
        showCards(filteredPokemonArray)
      } else {
        showCards(listaPokemon)
      }
    }

    let inputRange = document.querySelector('.form-range');
    console.dir(inputRange);
    let priceLabel = document.querySelector('#priceLabel');

    // FILTRO PER PREZZO

    // funzione per trovare prezzo più alto
    function findMaxPrice() {
      let maxPrice = listaPokemon.map((el) => Number(el.price)).sort((a, b) => b - a)[0]

      inputRange.max = maxPrice;
      inputRange.value = maxPrice;
      // let maxPrice =
    }

    findMaxPrice()

    function filterByPrice() {
      let filtered = listaPokemon.filter((el) => +el.price <= +inputRange.value)
      showCards(filtered)
    }

    // FILTRO PER PAROLA
    let wordInput = document.querySelector('#wordInput');

    function filterByWord() {
      let value = wordInput.value;
      let filtered = listaPokemon.filter((el) => el.name.toLowerCase().includes(value.toLowerCase()))
      showCards(filtered)
    }

    // eventi
    radioInputs.forEach((input) => {
      input.addEventListener('click', () => {
        filterByCategory()
      })
    })

    inputRange.addEventListener('input', () => {
      priceLabel.innerHTML = inputRange.value
      filterByPrice()
    })

    wordInput.addEventListener('input', () => {
      filterByWord()
    })


    // funzione extra per tagliare titoli degli annunci troppo lunghi
    function troncate(string) {
      if (string.length > 15) {
        return string.split(' ')[0] + '...';
      } else {
        return string
      }
    }

    // console.log(troncate("Compilation di nino d'angelo"))


  })