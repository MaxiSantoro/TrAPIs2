class DrinkDefinition {
    constructor(resultsContainer, drinkDefinition) {
        const wordDisplay = resultsContainer.querySelector('#set-word-input');
        const defDisplay = resultsContainer.querySelector('#set-def-input');
        wordDisplay.textContent = drinkDefinition.word;
        defDisplay.textContent = drinkDefinition.definition;
    }
}

export default DrinkDefinition;
