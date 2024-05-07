document.addEventListener('DOMContentLoaded', function () {
    const quoteText = document.getElementById('quote-text');
    const author = document.getElementById('author');
    const newQuoteBtn = document.getElementById('new-quote-btn');
    const searchForm = document.getElementById('search-form'); // Corrected selector
    const authorInput = document.getElementById('author-input');


    function fetchQuote() {
        fetch('http://quotable.io/random')
            .then(response => response.json())
            .then(data => {

                quoteText.innerHTML = `"${data.content}"`;
                author.innerHTML = `${data.author}.....`;
            })
            .catch(error => console.error('Error fetching quote:', error));
    }

    // Function to fetch a quote by author name
    // Function to fetch a quote by author name
    function searchQuoteByAuthor(authorName) {
        fetch(`http://api.quotable.io/quotes?author=${authorName}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.results && data.results.length > 0) {
                    const quotes = data.results;
                    const randomIndex = Math.floor(Math.random() * quotes.length); // Generate a random index
                    const quote = quotes[randomIndex]; // Get the quote at the random index
                    quoteText.innerHTML = `"${quote.content}"`;
                    author.innerHTML = `${quote.author}.....`; // Display the author's name dynamically
                } else {
                    quoteText.textContent = `No quotes found for author ${authorName}.`;
                    author.textContent = '';
                }
            })
            .catch(error => console.error('Error searching quote:', error));
    }

    // Event listener for the "New Quote" button
    newQuoteBtn.addEventListener('click', fetchQuote);

    // Event listener for the search form submission
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const authorName = authorInput.value.trim();
        if (authorName !== '') {
            searchQuoteByAuthor(authorName);
        } else {
            // If the input is empty, display an error message or handle it as needed
            console.error('Author name input is empty');
        }
    });

    // Fetch a new quote when the page loads
    fetchQuote();
});
