//DOM Selectors
const welcomeTitle = document.getElementById('title');
const cardDataContainer = document.querySelector('.card-container');
const searchBar = document.getElementById('search-bar');
const spinner = document.querySelector('.spinner');
const colorSelect = document.getElementById('select-color');
const typeSelect = document.getElementById('select-type');
const sortAlphabetically = document.getElementById('select-sort');



//Get User Input in home.html from Local Storage
if (localStorage.getItem('user') !== null) {
    welcomeTitle.textContent = 'Hello ' + localStorage.getItem('user') + '!';
    welcomeTitle.style.color = '#fff'
}

//Main Function fetching the card data, all other functions are nested inside this one :)
const fetchData = async () => {
    // Fetching data from API and creating an array
    const res = await fetch(`https://api.magicthegathering.io/v1/cards?random=true&pageSize=100&language=English`);
    const data = await res.json();
    let cardArr = data.cards;
    const frontCardUrl = 'https://content.abugames.com//img/upload/Duress-Back-HP.jpg';

    // Set the border color depending on the card's color
    const cardColor = {
        white: '#EAEAEA',
        black: '#191919',
        blue: '#408DCE',
        green: '#45CE40',
        red: '#D33434'
    }

    //Get the card color and use it for the border
    const getColor = (color) => {
        switch (color) {
            case 'White':
                return cardColor.white;
            case 'Black':
                return cardColor.black;
            case 'Red':
                return cardColor.red;
            case 'Blue':
                return cardColor.blue;
            case 'Green':
                return cardColor.green;
            default: return null;
        }
    };

    //Generate and regenerate the cards depending on the function
    const generateCards = (arr) => {
        return arr.forEach(card => {
            cardDataContainer.innerHTML += `
        <div class="flip-card" id="card-element">
            <div class="flip-card-inner">
                <div class="flip-card-front">
                <img src=${card.imageUrl ? card.imageUrl : frontCardUrl} style="width:300px;height:400px;" />
            </div>
            <div class="flip-card-back">
            <div class="card-back" style="border: 6px solid ${getColor(card.colors[0])} ;">
                <h3>Card Name: ${card.name}</h3>
                <p>Card Type: ${card.types[0]}</p>
                <p>Card Set: ${card.setName}</p>
                <p style="font-size: 0.9rem;">${card.text}</p>
                <small>#${card.number}</small>
            </div>
            </div>
            </div>
        </div>
        `
        })
    };


    //Search Filter Cards START 
    const filterInput = () => {
        let filterValue = searchBar.value.toLowerCase();
        cardDataContainer.innerHTML = '';
        // console.log(filterValue)
        const filteredArr = [];
        cardArr.forEach(card => {
            if (card.name.toLowerCase().includes(filterValue) || (!card.text ? undefined : card.text.toLowerCase().includes(filterValue))) {
                filteredArr.push(card);
            }
        });

        generateCards(filteredArr);
    }
    searchBar.addEventListener('keyup', filterInput);
    // SearchFilter Cards END;


    //Select By Color START
    const selectByColor = (e) => {
        let colorSelected = e.target.value;
        cardDataContainer.innerHTML = '';
        let colorArr = cardArr.filter(card => card.colors[0] === colorSelected)

        generateCards(colorArr);
        if (colorSelected === 'Filter cards by color') {
            generateCards(cardArr);
        }
    }
    colorSelect.addEventListener('change', selectByColor);
    //Select By Color END


    //Sort Alphabetically Start
    const sortCards = (e) => {
        const sortSelected = e.target.value;
        cardDataContainer.innerHTML = '';
        if (sortSelected === 'Ascending') {
            cardArr.sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                } else {
                    return - 1;
                }
            })
            generateCards(cardArr);
        } else if (sortSelected === 'Descending') {
            cardArr.sort((a, b) => {
                if (b.name > a.name) {
                    return 1;
                } else {
                    return - 1;
                }
            });
            generateCards(cardArr)
        } else if (sortSelected === 'Sort cards alphabetically') {
            generateCards(cardArr);
        }
    }
    sortAlphabetically.addEventListener('change', sortCards);
    //Sort Alphabetically END


    //Select By Type START
    const selectByType = (e) => {
        let typeSelected = e.target.value;
        cardDataContainer.innerHTML = '';
        let typeArr = cardArr.filter(card => card.types[0] === typeSelected)

        if (typeSelected === 'Filter cards by type') {
            generateCards(cardArr);
        }
        else if (typeArr.length === 0) {
            document.querySelector('.msg-container').innerHTML =
                `No ${typeSelected} Cards Available At The Moment.`
        } else {
            generateCards(typeArr);
            document.querySelector('.msg-container').innerHTML = '';
        }
    }
    typeSelect.addEventListener('change', selectByType);
    // Select By Type END


    //Load all cards and display them
    generateCards(cardArr);

    //Remove spinner once the data is loaded
    spinner.style.display = 'none';
}

fetchData();