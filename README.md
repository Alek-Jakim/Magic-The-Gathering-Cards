# Magic-The-Gathering-Cards

To install the app:
```bash
npm install magic-thegathering
```

To start the app:
```bash
npm start magic-thegathering
```

-----
### Home Page
Simply enter your username to get redirected to the cards page.
* Username needs to be at least 3 characters long
* Username has to start with a capital letter

Clicking on the "View More" button redirects you to the offical Magic: The Gathering page.

**Responsive Media Queries Added**

### Cards Page
Cards are loaded after several seconds. You can search cards manually, filter them by color, type, alphabetically.

Hovering over the cards reveals information about them. The border color, as well as the card name indicate the card's color. Cards without a border color are considered colorless cards and I've added a filter for them as well.

Since only 100 cards are loaded, not all card types will be available. Refreshing the page generates new cards (and card types).

**Responsive Media Queries Added**

Tools Used:
* HTML & CSS (no libraries or frameworks)
* Vanilla JavaScript

**Note:** I started off using Sass but ultimately decided I didn't need it for this project. :)

Deployed on Netlify: https://magic-thegathering.netlify.app/home.html?fbclid=IwAR3jmUGVzFlt3vDNjt-mG1D2es1dDXJTOBGREfJSPxSth2c7t9vvaxQJbAU
