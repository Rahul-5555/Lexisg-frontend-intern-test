import React, { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous errors
    setError(null);

    // Validation checks
    if (!query.trim()) {
      setError("Please enter a question");
      return;
    }

    if (query.length < 10) {
      setError("Question too short - please provide more details");
      return;
    }

    if (!query.match(/[a-zA-Z]/)) {
      setError("Please enter a valid question");
      return;
    }

    setIsLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      // Check if question is valid legal question
      const isLegalQuestion = query.toLowerCase().includes("motor vehicles act") ||
        query.toLowerCase().includes("section 166") ||
        query.toLowerCase().includes("accident claim");

      if (!isLegalQuestion) {
        setResponse({
          answer: "This doesn't appear to be a valid legal question about motor accident claims. Please ask about Section 166 of the Motor Vehicles Act, 1988.",
          citations: []
        });
      } else {
        setResponse({
          answer: "Yes, under Section 166 of the Motor Vehicles Act, 1988, the claimants are entitled to an addition for future prospects even when the deceased was self-employed and aged 54–55 years at the time of the accident. In Dani Devi v. Pritam Singh, the Court held that 10% of the deceased's annual income should be added as future prospects.",
          citations: [
            {
              text: "as the age of the deceased at the time of accident was held to be about 54-55 years by the learned Tribunal, being self-employed, as such, 10% of annual income should have been awarded on account of future prospects.",
              source: "Dani Devi v. Pritam Singh",
              link: "https://lexisingapore-my.sharepoint.com/personal/harshit_lexi_sg/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fharshit%5Flexi%5Fsg%2FDocuments%2Fcases%2FDani%20Vs%20Pritam%20%28Future%2010%20at%20age%2054%2D55%29%2Epdf&parent=%2Fpersonal%2Fharshit%5Flexi%5Fsg%2FDocuments%2Fcases&ga=1",
              paragraph: 7
            }
          ]
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleCitationClick = (citation) => {
    window.open(citation.link, '_blank');
    console.log(`Would scroll to paragraph ${citation.paragraph} in the PDF`);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Lexi Legal Assistant</h1>

      {/* Input Panel */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label htmlFor="legalQuery" className="block text-sm font-medium text-gray-700 mb-2">
            Enter your legal question:
          </label>
          <textarea
            id="legalQuery"
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. In a motor accident claim where the deceased was self-employed and aged 54–55 years at the time of death..."
          ></textarea>
        </div>
        {error && (
          <div className="text-red-600 mb-4 p-2 bg-red-50 rounded-md">
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className={`px-4 py-2 rounded-md text-white ${isLoading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          {isLoading ? 'Processing...' : 'Submit Question'}
        </button>
      </form>

      {/* Answer Panel */}
      {response && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Answer:</h2>
          <p className="mb-6">{response.answer}</p>

          {response.citations.length > 0 && (
            <>
              <h3 className="text-lg font-medium mb-3">Citations:</h3>
              {response.citations.map((citation, index) => (
                <div key={index} className="mb-4 p-4 bg-gray-50 rounded-md">
                  <p className="mb-2 italic">"{citation.text}"</p>
                  <p className="text-sm text-gray-600 mb-2">Source: {citation.source}</p>
                  <button
                    onClick={() => handleCitationClick(citation)}
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                  >
                    View in original document (Paragraph {citation.paragraph})
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;