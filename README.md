# Lexi Frontend Intern Test

This is a frontend implementation of a legal assistant interface for Lexi's internship assignment.

## Features

- Input panel for legal questions
- Simulated answer generation
- Citation display with clickable links to PDFs
- Loading state during "processing"

## How to Run

1. Clone this repository
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Citation Handling

Citations are displayed below the answer with:
- The relevant text excerpt
- Source document name
- Clickable link that opens the PDF in a new tab

In a production environment, we would implement PDF.js or similar to scroll to the specific paragraph mentioned in the citation.

## Screenshots

[Insert screenshots here]