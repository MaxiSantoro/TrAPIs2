import NewSetDrink from "./newSetDrink.js";
import DrinkDefinition from "./drinkDefintion.js";
import NewDefinions from "./newsDefinitions.js";


class App {
  constructor() {
    this.newDefinions = new NewDefinions();

    const searchForm = document.querySelector('#searchBtn');
    this._onSearch = this._onSearch.bind(this);
    searchForm.addEventListener('submit', this._onSearch);

    const redNewDrink = document.querySelector('#newDrinks');
    this._redirectToNewView = this._redirectToNewView.bind(this);
    redNewDrink.addEventListener('onclick', this._redirectToNewView);

    const setForm = document.querySelector('#set-form');
    this._onSet = this._onSet.bind(this);
    setForm.addEventListener('submit', this._onSet);
  }

  _onSet(event) {
    event.preventDefault();

    const resultsContainer = document.querySelector('#results');
    const newSetDrink = new NewSetDrink(resultsContainer);
    const postBody = newSetDrink.read();

    const status = results.querySelector('#status');
    status.textContent = '';

    this.newDefinions.save(postBody)
      .then(result => {
        // Update definition
        new DrinkDefinition(resultsContainer, postBody);
        status.textContent = 'Saved.';
      });

  }

  _onSearch(event) {
    event.preventDefault();
    const status = results.querySelector('#status');
    status.textContent = '';
    const input = document.querySelector('#word-input');
    const word = input.value.trim();
    this.newDefinions.doLookup(word)
      .then(this._showResults);
  }

  _showResults(result) {
    const resultsContainer = document.querySelector('#results');
    resultsContainer.classList.add('hidden');

    // Show Word Definition.
    new DrinkDefinition(resultsContainer, result);

    // Prep set definition form.
    const newSetDrink = new NewSetDrink(resultsContainer);
    newSetDrink.show(result);

    // Display.
    resultsContainer.classList.remove('hidden');
  }

  _redirectToNewView() {
    window.location.href = 'newDrink.html';
  }

}

// Init app
const app = new App();
