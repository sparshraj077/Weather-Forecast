// const express = require('express');
// const cors = require('cors');
// const fs = require('fs');
// const app = express();
// const PORT = 3000;

// app.use(cors());
// app.use(express.json());

// // Load the dataset
// const datasetPath = 'assets/hindi_expanded_sentences.json';
// let sentenceDataset = [];
// try {
//     sentenceDataset = JSON.parse(fs.readFileSync(datasetPath, 'utf-8'));
//     console.log("Dataset loaded successfully");
// } catch (error) {
//     console.error("Error loading dataset:", error);
// }

// // Suggestion endpoint
// app.get('/api/suggestions', (req, res) => {
//     const query = req.query.q.toLowerCase();
//     if (!query) {
//         return res.json([]);
//     }
//     const suggestions = sentenceDataset
//         .filter(item => item.romanized.startsWith(query))
//         .slice(0, 5)
//         .map(item => item.romanized);
//     res.json(suggestions);
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

//- updated approach for stage 2------------------------------------------

// const express = require('express');
// const cors = require('cors');
// const fs = require('fs');
// const app = express();
// const PORT = 3000;

// app.use(cors());
// app.use(express.json());

// // Load the dataset (Assume the dataset is stored in 'assets/hindi_expanded_sentences.json')
// const datasetPath = 'assets/hindi_expanded_sentences.json';
// let sentenceDataset = [];
// try {
//     sentenceDataset = JSON.parse(fs.readFileSync(datasetPath, 'utf-8'));
//     console.log("Dataset loaded successfully");
// } catch (error) {
//     console.error("Error loading dataset:", error);
// }

// // Tokenize sentences into words (or n-grams)
// function tokenizeText(text) {
//     return text.split(/\s+/); // Split by spaces to get individual words
// }

// // Process all sentences and store individual words
// let wordDataset = [];
// sentenceDataset.forEach(item => {
//     const words = tokenizeText(item.romanized); // Tokenize each sentence into words
//     wordDataset = wordDataset.concat(words);  // Add words to the dataset
// });

// // Suggestion endpoint
// app.get('/api/suggestions', (req, res) => {
//     const query = req.query.q.toLowerCase();
//     if (!query) {
//         return res.json([]);
//     }
//     const suggestions = wordDataset
//         .filter(item => item.startsWith(query)) // Find words that start with the query
//         .slice(0, 5); // Return top 5 matching words
//     res.json(suggestions);
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

//----------------------------------------------- now we will use n gram approach


// const express = require('express');
// const cors = require('cors');
// const fs = require('fs');
// const app = express();
// const PORT = 3000;

// app.use(cors());
// app.use(express.json());

// // Load the dataset (Assume the dataset is stored in 'assets/hindi_expanded_sentences.json')
// const datasetPath = 'assets/hindi_expanded_sentences.json';
// let sentenceDataset = [];
// try {
//     sentenceDataset = JSON.parse(fs.readFileSync(datasetPath, 'utf-8'));
//     console.log("Dataset loaded successfully");
// } catch (error) {
//     console.error("Error loading dataset:", error);
// }

// // Tokenize sentences into words (or n-grams)
// function tokenizeText(text) {
//     return text.split(/\s+/); // Split by spaces to get individual words
// }

// // Create bigrams from sentences and store in a dataset
// let bigrams = [];
// sentenceDataset.forEach(item => {
//     const words = tokenizeText(item.romanized); // Tokenize each sentence into words
//     for (let i = 0; i < words.length - 1; i++) {
//         bigrams.push([words[i], words[i + 1]]); // Store consecutive word pairs (bigrams)
//     }
// });

// // Generate word suggestions based on bigrams
// function getNextWordSuggestions(currentWord) {
//     const nextWords = bigrams.filter(bigram => bigram[0] === currentWord);  // Find all bigrams where the current word is the first
//     const nextWordCount = {};

//     nextWords.forEach(bigram => {
//         const nextWord = bigram[1];  // The next word in the bigram
//         nextWordCount[nextWord] = (nextWordCount[nextWord] || 0) + 1;  // Count occurrences of each next word
//     });

//     // Sort words by frequency and return the top 5 most frequent next words
//     const sortedNextWords = Object.keys(nextWordCount)
//         .sort((a, b) => nextWordCount[b] - nextWordCount[a])
//         .slice(0, 5);

//     return sortedNextWords;
// }

// // Suggestion endpoint
// app.get('/api/suggestions', (req, res) => {
//     const query = req.query.q.toLowerCase();
//     if (!query) {
//         return res.json([]);
//     }

//     // Return suggestions for the current word and next word predictions
//     const suggestions = getNextWordSuggestions(query);
//     res.json(suggestions);
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });


//---------------------------------
// till here the code is successfully showing the suggestions--------------------------------------------
//-------------------------------


//fixing and doing inmprovisations

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const datasetPath = 'assets/hindi_expanded_sentences.json';
let sentenceDataset = [];
try {
    sentenceDataset = JSON.parse(fs.readFileSync(datasetPath, 'utf-8'));
    console.log("Dataset loaded successfully");
} catch (error) {
    console.error("Error loading dataset:", error);
}

// Tokenize sentences and build bigram data
const bigrams = {};
sentenceDataset.forEach(item => {
    const words = item.romanized.split(/\s+/);
    words.forEach((word, index) => {
        if (index < words.length - 1) {
            const bigramKey = word.toLowerCase();
            const nextWord = words[index + 1].toLowerCase();
            if (!bigrams[bigramKey]) bigrams[bigramKey] = [];
            bigrams[bigramKey].push(nextWord);
        }
    });
});

app.get('/api/suggestions', (req, res) => {
    const query = req.query.q.trim().toLowerCase();
    const words = query.split(/\s+/);
    const lastWord = words[words.length - 1];

    let suggestions;
    if (words.length === 1) {
        // Single-word suggestion
        suggestions = Object.keys(bigrams)
            .filter(word => word.startsWith(lastWord))
            .slice(0, 5);
    } else {
        // Bigram-based suggestions using the last word
        suggestions = bigrams[lastWord] || [];
        suggestions = Array.from(new Set(suggestions)).slice(0, 5);  // Remove duplicates
    }

    res.json(suggestions);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
