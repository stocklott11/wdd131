const articles = [
    {
      id: 1,
      title: "Septimus Heap Book One: Magyk",
      date: "July 5, 2022",
      description: "If you enjoy stories about seventh sons of seventh sons and magyk this is the book for you.",
      imgSrc: "septimus_heap.jpg",
      imgAlt: "Cover of Septimus Heap Book One: Magyk",
      ages: "10-14",
      genre: "Fantasy",
      stars: "★★★★"
    },
    {
      id: 2,
      title: "Magnus Chase Book One: Sword of Summer",
      date: "December 12, 2021",
      description: "The anticipated new novel by Rick Riordan. After Greek mythology (Percy Jackson), Greek/Roman (Heroes of Olympus), and Egyptian (Kane Chronicles), Rick decides to try his hand with Norse Mythology, and the end result is good.",
      imgSrc: "https://books.google.com/books/content/images/frontcover/xWuyBAAAQBAJ?fife=w300",
      imgAlt: "Book cover for Magnus Chase 1",
      ages: "12-16",
      genre: "Fantasy",
      stars: "⭐⭐⭐⭐"
    },
    {
      id: 3,
      title: "Belgariad Book One: Pawn of Prophecy",
      date: "Feb 12, 2022",
      description: "A fierce dispute among the Gods and the theft of a powerful Orb leaves the World divided into five kingdoms...",
      imgSrc: "https://images-na.ssl-images-amazon.com/images/I/41ZxXA+nInL.jpg",
      imgAlt: "Book cover for Pawn of Prophecy",
      ages: "12-16",
      genre: "Fantasy",
      stars: "⭐⭐⭐⭐⭐"
    }
  ];
  
  function buildArticles() {
    const container = document.querySelector('.reviews');
    container.innerHTML = ''; // clear existing content
  
    articles.forEach(article => {
      const newArticle = document.createElement('article');
      newArticle.innerHTML = `
        <div class="book-grid">
          <div class="book-meta">
            <p><time datetime="${new Date(article.date).toISOString().split('T')[0]}">${article.date}</time></p>
            <p>${article.ages}</p>
            <p>${article.genre}</p>
            <p>${article.stars}</p>
          </div>
          <div class="book-content">
            <h2>${article.title}</h2>
            <img src="${article.imgSrc}" alt="${article.imgAlt}">
            <p>${article.description}</p>
          </div>
        </div>
      `;
      container.appendChild(newArticle);
    });
  }
  
  document.addEventListener('DOMContentLoaded', buildArticles);
  