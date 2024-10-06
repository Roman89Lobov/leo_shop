// Массив для хранения добавленных товаров
let cart = [];

// Находим все кнопки "добавить в корзину"
// const addToCartButtons = document.querySelectorAll('.circle_2 a');

// Находим модальное окно и его элементы
const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const cartItemsContainer = document.getElementById('cartItems');
const closeModalButton = document.querySelector('.close');
const cartCount = document.getElementById('cartCount'); // Элемент для отображения количества товаров

// Функция для открытия/закрытия корзины
function toggleCart() {
    if (cartModal.style.display === 'block') {
        cartModal.style.display = 'none'; // Закрываем корзину
    } else {
        cartModal.style.display = 'block'; // Открываем корзину
        updateCartDisplay();
    }
}

// Обновление количества товаров в корзине
function updateCartCount() {
    cartCount.textContent = `CART (${cart.length})`; // Обновляем текст
}

// Обновление отображения товаров в корзине
function updateCartDisplay() {
    cartItemsContainer.innerHTML = ''; // Очищаем контейнер
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
      <img src="${item.imgSrc}" alt="${item.title}" style="width: 50px; height: 50px; margin-right: 10px;">
      <p>${item.title} - ${item.price}</p><button onclick="removeFromCart(${index})">Remove</button>`;
        cartItemsContainer.appendChild(cartItem);
    });
    updateCartCount(); // Обновляем счетчик
}

// Добавление товаров в корзину
const addToCartButtons = document.querySelectorAll('.circle_2 a');
addToCartButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const product = button.closest('.product');
        const title = product.querySelector('.product_title span').textContent;
        const price = product.querySelector('.current_price').textContent;
        const imgSrc = product.querySelector('.images img').src; // Получаем путь к картинке

        cart.push({ title, price, imgSrc }); // Добавляем товар
        alert(`${title} добавлен в корзину`);
        updateCartCount(); // Обновляем счетчик
    });
});

// Функция для удаления товаров из корзины
function removeFromCart(index) {
    cart.splice(index, 1); // Удаляем товар
    updateCartDisplay(); // Обновляем корзину и счетчик
}

// Открытие/закрытие корзины при клике на иконку
cartIcon.addEventListener('click', (event) => {
    event.preventDefault(); // Предотвращаем переход по ссылке
    toggleCart();
});

// Закрытие корзины при клике на кнопку закрытия
closeModalButton.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

// Закрытие корзины при клике вне окна
window.addEventListener('click', (event) => {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
});