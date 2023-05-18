// Write a function that takes a string (paragraph) and an array of strings (in this example book_titles) and check if one of the list members (book titles) is in the string (paragraph). Return an array of the book titles found in the paragraph.

let paragraph = "In 'The Great Gatsby', F. Scott Fitzgerald explores the decadence of the jazz age. 'To Kill a Mockingbird' by Harper Lee, on the other hand, is a tale of innocence lost in the deep south.";

let bookTitles = ['The Great Gatsby', 'To Kill a Mockingbird', 'Moby Dick'];

// console.log(findBookTitles(paragraph, bookTitles)); // Outputs: ['The Great Gatsby', 'To Kill a Mockingbird']

const findBookTitles = (par, listBooks) => {
    titlesFound = []
    for ( let title of listBooks) {
        if (par.includes(title)) {
            titlesFound.push(title)
        }
    }
    return titlesFound
}

// console.log(findBookTitles(paragraph, bookTitles));

console.log(findBookTitles(paragraph, bookTitles))