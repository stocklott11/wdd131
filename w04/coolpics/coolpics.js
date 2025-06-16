const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('nav');
const gallery = document.querySelector('.gallery');

// Toggle nav visibility
menuButton.addEventListener('click', () => {
  nav.classList.toggle('hide');
});

// Handle screen resize to restore menu visibility
function handleResize() {
  if (window.innerWidth > 1000) {
    nav.classList.remove('hide');
  } else {
    nav.classList.add('hide');
  }
}
window.addEventListener('resize', handleResize);
window.addEventListener('load', handleResize);

// Create and append modal to page
const modal = document.createElement('dialog');
document.body.appendChild(modal);

// Open modal with larger image when gallery image is clicked
gallery.addEventListener('click', (event) => {
  const clickedImg = event.target.closest('img');
  if (!clickedImg) return;

  const src = clickedImg.getAttribute('src');
  const base = src.split('-')[0];
  const alt = clickedImg.getAttribute('alt');

  modal.innerHTML = `
  <div class="modal-content">
    <img src="${base}-full.jpeg" alt="${alt}">
    <button class="close-viewer">X</button>
  </div>
`;

  modal.showModal();

  // Handle close button inside modal
  document.querySelector('.close-viewer').addEventListener('click', () => {
    modal.close();
  });
});

// Close modal if clicking outside image
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.close();
  }
});
