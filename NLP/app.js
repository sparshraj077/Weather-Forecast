// // Predefined list of Romanized Hindi words for suggestions
// const hindiWords = [
//     "namaste",
//     "naman",
//     "shukriya",
//     "dost",
//     "pyar",
//     "aap",
//     "ghar",
//     "dhanyavaad",
//     "mujhe",
//     "khana",
//     "pani",
//     "sundar",
//     "sabzi"
// ];

// // Function to handle input and show suggestions
// const handleInput = (event) => {
//     const inputText = event.target.value.trim();
//     const suggestionsContainer = document.getElementById('suggestions');

//     if (inputText.length === 0) {
//         suggestionsContainer.style.display = 'none'; // Hide suggestions if input is empty
//         return;
//     }

//     // Filter the words based on the typed input
//     const matchingWords = hindiWords.filter((word) => word.startsWith(inputText.toLowerCase()));

//     if (matchingWords.length === 0) {
//         suggestionsContainer.style.display = 'none'; // Hide if no matches
//     } else {
//         suggestionsContainer.style.display = 'block'; // Show suggestions

//         // Clear previous suggestions
//         suggestionsContainer.innerHTML = '';

//         // Display the matching words as suggestions
//         matchingWords.forEach((word) => {
//             const suggestionItem = document.createElement('div');
//             suggestionItem.textContent = word;
//             suggestionItem.classList.add('suggestion-item');
//             suggestionsContainer.appendChild(suggestionItem);

//             // Handle click on a suggestion
//             suggestionItem.addEventListener('click', () => {
//                 document.getElementById('inputText').value = word; // Set the selected word as input
//                 suggestionsContainer.style.display = 'none'; // Hide suggestions
//             });
//         });
//     }
// };

// // Attach the input event listener to the input field
// document.getElementById('inputText').addEventListener('input', handleInput);

//-----------new code stage2


// const inputField = document.getElementById('inputText');
// const suggestionsBox = document.getElementById('suggestions');

// // Fetch suggestions from the backend based on user input
// async function fetchSuggestions(query) {
//     const response = await fetch(`http://localhost:3000/api/suggestions?q=${query}`);
//     return response.json();
// }

// // Handle user input in the text field
// inputField.addEventListener('input', async (event) => {
//     const query = event.target.value.toLowerCase();
//     if (query.length > 0) {
//         const suggestions = await fetchSuggestions(query);
//         displaySuggestions(suggestions);
//     } else {
//         displaySuggestions([]);
//     }
// });

// // Display suggestions below the input field
// function displaySuggestions(suggestions) {
//     suggestionsBox.innerHTML = '';
//     suggestions.forEach(suggestion => {
//         const suggestionItem = document.createElement('div');
//         suggestionItem.classList.add('suggestion-item');
//         suggestionItem.textContent = suggestion;
//         suggestionsBox.appendChild(suggestionItem);
//     });
// }

// updated approach for stage 2------------------------------------------
// document.getElementById('inputText').addEventListener('input', async function() {
//     const query = this.value.trim();
//     if (query.length === 0) {
//         document.getElementById('suggestions').innerHTML = '';
//         return;
//     }

//     try {
//         const response = await fetch(`http://localhost:3000/api/suggestions?q=${query}`);
//         const suggestions = await response.json();

//         // Update the suggestion list
//         const suggestionsContainer = document.getElementById('suggestions');
//         suggestionsContainer.innerHTML = ''; // Clear previous suggestions

//         suggestions.forEach(suggestion => {
//             const div = document.createElement('div');
//             div.classList.add('suggestion-item');
//             div.textContent = suggestion;
//             suggestionsContainer.appendChild(div);
//         });
//     } catch (error) {
//         console.error("Error fetching suggestions:", error);
//     }
// });

//----------------------------------------------- now we will use n gram approach

// document.getElementById('inputText').addEventListener('input', async function() { 
//     const query = this.value.trim();
//     if (query.length === 0) {
//         document.getElementById('suggestions').innerHTML = '';
//         return;
//     }

//     try {
//         // Make a request to the backend for word suggestions based on the current query
//         const response = await fetch(`http://localhost:3000/api/suggestions?q=${query}`);
//         const suggestions = await response.json();

//         // Update the suggestion list
//         const suggestionsContainer = document.getElementById('suggestions');
//         suggestionsContainer.innerHTML = ''; // Clear previous suggestions

//         suggestions.forEach(suggestion => {
//             const div = document.createElement('div');
//             div.classList.add('suggestion-item');
//             div.textContent = suggestion;
//             suggestionsContainer.appendChild(div);
//         });
//     } catch (error) {
//         console.error("Error fetching suggestions:", error);
//     }
// });


//------------------------------------
// till here the code is successfully showing the suggestions--------------------------------------------
//------------------------------------


//fixing and doing improvisations

document.getElementById('inputText').addEventListener('input', handleInput);

async function handleInput() {
    const query = this.value.trim();
    if (query.length === 0) {
        clearSuggestions();
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/suggestions?q=${query}`);
        const suggestions = await response.json();

        updateSuggestions(suggestions);
    } catch (error) {
        console.error("Error fetching suggestions:", error);
    }
}

function clearSuggestions() {
    document.getElementById('suggestions').innerHTML = '';
}

function updateSuggestions(suggestions) {
    const suggestionsContainer = document.getElementById('suggestions');
    suggestionsContainer.innerHTML = '';

    suggestions.forEach(suggestion => {
        const div = document.createElement('div');
        div.classList.add('suggestion-item');
        div.textContent = suggestion;
        div.addEventListener('click', () => {
            addSuggestionToInput(suggestion);
        });
        suggestionsContainer.appendChild(div);
    });
}

function addSuggestionToInput(suggestion) {
    const inputField = document.getElementById('inputText');
    const currentText = inputField.value;
    const words = currentText.split(/\s+/);
    words.pop();  // Remove the last partially typed word
    words.push(suggestion);  // Add the selected suggestion
    inputField.value = words.join(' ') + ' ';
    clearSuggestions();
}
