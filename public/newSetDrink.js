class NewSetDrink {
    constructor(resultsContainer) {
      this.setWordInput = resultsContainer.querySelector('#set-word-input');
      this.setDefInput = resultsContainer.querySelector('#set-def-input');      
    }

    show(drinkDefinition) {
      this.setWordInput.value = drinkDefinition.word;
      this.setDefInput.value = drinkDefinition.definition;
    }

    read() {
      const result = {
        word: this.setWordInput.value,
        definition: this.setDefInput.value
      };
      return result;
    }
}

export default NewSetDrink;

