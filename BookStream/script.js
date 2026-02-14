// База даних книг: масив об'єктів з даними про книги
const mockDatabase = [
    {
        id: 1,
        title: "Дюна",
        author: "Френк Герберт",
        genre: "Фантастика",
        rating: 4.9,
        year: 1965,
        description: "Легендарна сага про піщану планету Арракіс, боротьбу за владу та долю людства. Це шедевр світової фантастики.",
        cover: "https://m.media-amazon.com/images/I/81ym3QUd3KL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 2,
        title: "1984",
        author: "Джордж Орвелл",
        genre: "Антиутопія",
        rating: 4.8,
        year: 1949,
        description: "Похмуре майбутнє, де Старший Брат стежить за кожним. Книга, яка змінила уявлення про тоталітаризм.",
        cover: "https://knigomania.com.ua/image/cache/catalog/products/2023/15/1984_4662-512x512.jpg"
    },
    {
        id: 3,
        title: "Мене не зламати",
        author: "Девід Гоггінс",
        genre: "Мотивація",
        rating: 4.7,
        year: 2018,
        description: "Історія про подолання труднощів через самодисципліну та ментальну стійкість. Автор ділиться своїм шляхом від травм дитинства до елітного військового.",
        cover: "https://pic11.kidstaff.com.ua/pictures_user/291/730878/34091032/730878_20240827031839_2252_250x250.jpg"
    },
    {
        id: 4,
        title: "Атомні звички",
        author: "Джеймс Клір",
        genre: "Саморозвиток",
        rating: 4.8,
        year: 2018,
        description: "Практичний посібник з формування корисних звичок та позбавлення від шкідливих. Маленькі зміни для великих результатів.",
        cover: "https://static.yakaboo.ua/media/catalog/product/i/m/img_46560.jpg"
    },
    {
        id: 5,
        title: "Багатий тато, бідний тато",
        author: "Роберт Кійосакі",
        genre: "Фінанси",
        rating: 4.6,
        year: 1997,
        description: "Уроки фінансової грамотності через історії двох батьків. Як досягти фінансової незалежності.",
        cover: "https://m.media-amazon.com/images/I/81bsw6fnUiL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 6,
        title: "Гаррі Поттер і філософський камінь",
        author: "Дж. К. Ролінг",
        genre: "Фентезі",
        rating: 4.9,
        year: 1997,
        description: "Перша книга про хлопчика-чарівника, який відкриває світ магії в школі Гоґвортс.",
        cover: "https://litcentr.in.ua/_nw/51/13221958.jpg"
    },
    {
        id: 7,
        title: "Володар перснів: Братство персня",
        author: "Дж. Р. Р. Толкін",
        genre: "Фентезі",
        rating: 4.8,
        year: 1954,
        description: "Епічна подорож Фродо та його друзів, щоб знищити Перстень Влади.",
        cover: "https://m.media-amazon.com/images/I/71jLBXtWJWL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 8,
        title: "Шантарам",
        author: "Грегорі Девід Робертс",
        genre: "Пригоди",
        rating: 4.7,
        year: 2003,
        description: "Історія втікача з в'язниці, який опиняється в Індії та переживає неймовірні пригоди.",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAROCqGJWHmT-ldPiTQ3qMcATonIxtXEfLsg&s"
    }
];

// Авторизація: масив користувачів з локального сховища
let mockUsers = JSON.parse(localStorage.getItem('users')) || [];

// Збереження користувачів у локальне сховище
function saveUsers() {
    localStorage.setItem('users', JSON.stringify(mockUsers));
}

// Отримання ID поточного користувача з локального сховища
function getCurrentUserId() {
    return localStorage.getItem('currentUserId');
}

// Отримання об'єкта поточного користувача
function getCurrentUser() {
    const id = getCurrentUserId();
    return mockUsers.find(u => u.id == id);
}

// Вхід користувача: перевірка email та пароля
function login(email, password) {
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (user) {
        localStorage.setItem('currentUserId', user.id);
        return true;
    }
    return false;
}

// Реєстрація: створення нового користувача
function register(name, email, password) {
    if (mockUsers.find(u => u.email === email)) return false;
    const newUser = {id: mockUsers.length + 1, name, email, password, favorites: []};
    mockUsers.push(newUser);
    saveUsers();
    localStorage.setItem('currentUserId', newUser.id);
    return true;
}

// Вихід: видалення ID користувача з локального сховища
function logout() {
    localStorage.removeItem('currentUserId');
}

// Тема: ініціалізація та перемикання теми
function initTheme() {
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    
    const applyTheme = (theme) => {
        if (theme === 'light') {
            body.setAttribute('data-theme', 'light');
            if (themeBtn) themeBtn.textContent = '☾';
        } else {
            body.removeAttribute('data-theme');
            if (themeBtn) themeBtn.textContent = '☀';
        }
    };

    applyTheme(localStorage.getItem('theme') || 'dark');

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const newTheme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });
    }
}

// Обробка зображень: додавання класу при завантаженні та помилці
window.onImageLoad = (img) => img.classList.add('loaded');
window.onImageError = (img) => {
    img.src = 'https://dummyimage.com/400x600/2c2c35/aaaaaa&text=No+Cover';
    img.classList.add('loaded');
};

// Обране: отримання списку обраних книг користувача
function getFavorites() {
    const user = getCurrentUser();
    return user ? user.favorites : [];
}

// Збереження списку обраних книг
function setFavorites(favs) {
    const user = getCurrentUser();
    if (!user) return;
    user.favorites = favs;
    saveUsers();
}

// Перемикання обраного: додавання/видалення книги з обраних
function toggleFavorite(bookId) {
    if (!getCurrentUser()) {
        alert('Увійдіть для додавання до обраного');
        return false;
    }
    let favs = getFavorites();
    const index = favs.indexOf(bookId);
    if (index === -1) {
        favs.push(bookId);
    } else {
        favs.splice(index, 1);
    }
    setFavorites(favs);
    return favs.includes(bookId);
}

// Каталог: рендеринг сітки книг
async function renderBooksGrid() {
    const container = document.getElementById('books-container');
    if (!container) return;

    const favs = getFavorites();

    container.innerHTML = mockDatabase.map(book => `
        <article class="book-card">
            <a href="book.html?id=${book.id}" class="card-link">
                <div class="cover-wrapper">
                    <img src="${book.cover}" class="book-cover" onload="onImageLoad(this)" onerror="onImageError(this)">
                </div>
                <div class="card-info">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author">${book.author}</p>
                </div>
            </a>
            <button class="btn btn-secondary fav-btn ${favs.includes(book.id) ? 'active' : ''}" onclick="toggleFavCard(this, ${book.id})">
                ${favs.includes(book.id) ? 'У обраному' : 'Додати до обраного'}
            </button>
        </article>
    `).join('');
}

// Обробник перемикання обраного на картці книги
window.toggleFavCard = function(btn, bookId) {
    const isFav = toggleFavorite(bookId);
    const bookCard = btn.closest('.book-card');

    if (isFav) {
        btn.textContent = 'У обраному';
        btn.classList.add('active');
    } else {
        btn.textContent = 'Додати до обраного';
        btn.classList.remove('active');

        if (document.getElementById('favorites-container') && bookCard) {
            bookCard.classList.add('removing');

            setTimeout(() => {
                renderFavoritesGrid();
            }, 450);
        } 
    }
};

// Деталі книги: завантаження та рендеринг деталей
async function loadBookDetails() {
    const container = document.getElementById('book-detail-app');
    if (!container) return;

    const id = parseInt(new URLSearchParams(window.location.search).get('id'));
    const book = mockDatabase.find(b => b.id === id) || mockDatabase[0];
    const favs = getFavorites();
    const isFav = favs.includes(book.id);

    container.innerHTML = `
        <div class="book-detail-wrapper">
            <div class="cover-container">
                <div class="cover-wrapper">
                    <img src="${book.cover}" class="book-cover" onload="onImageLoad(this)" onerror="onImageError(this)">
                </div>
            </div>
            <div class="detail-info">
                <h1>${book.title}</h1>
                <div class="meta-row">
                    <span>${book.author}</span> • <span>${book.year}</span> • <span>${book.genre}</span>
                    <span style="color: #ffb100;">★ ${book.rating}</span>
                </div>
                <p class="detail-desc">${book.description}</p>
                <div class="action-row">
                    <button class="btn btn-primary">Читати фрагмент</button>
                    <button class="btn btn-secondary ${isFav ? 'active' : ''}" id="fav-detail-btn" onclick="toggleFavDetail(this, ${book.id})">
                        ${isFav ? 'У обраному' : 'Додати до обраного'}
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Обробник перемикання обраного на сторінці деталей
window.toggleFavDetail = function(btn, bookId) {
    const isFav = toggleFavorite(bookId);
    if (isFav !== false) {
        btn.classList.toggle('active', isFav);
        btn.textContent = isFav ? 'У обраному' : 'Додати до обраного';
        btn.style.borderColor = isFav ? 'var(--danger-color)' : 'var(--border-color)';
    }
};

// Профіль: рендеринг сітки обраних книг
async function renderFavoritesGrid() {
    const container = document.getElementById('favorites-container');
    if (!container) return;

    const favs = getFavorites();
    const favBooks = mockDatabase.filter(book => favs.includes(book.id));

    if (favBooks.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 60px; font-size: 18px;">
            У вас поки немає обраних книг ❤️
        </p>`;
        return;
    }

    container.innerHTML = favBooks.map(book => `
        <article class="book-card">
            <a href="book.html?id=${book.id}" class="card-link">
                <div class="cover-wrapper">
                    <img src="${book.cover}" class="book-cover" onload="onImageLoad(this)" onerror="onImageError(this)">
                </div>
                <div class="card-info">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author">${book.author}</p>
                </div>
            </a>
            <button class="btn btn-secondary fav-btn active" onclick="toggleFavCard(this, ${book.id})">
                У обраному
            </button>
        </article>
    `).join('');
}

// Профіль: завантаження даних користувача та кнопки виходу
function loadProfile() {
    const user = getCurrentUser();
    if (!user) {
        location.href = 'login.html';
        return;
    }

    const profileInfo = document.querySelector('.profile-info');
    if (profileInfo) {
        profileInfo.innerHTML = `
            <p><strong>Ім'я користувача:</strong> ${user.name}</p>
            <p><strong>ID користувача:</strong> ${user.id}</p>
            <p><strong>Email:</strong> ${user.email}</p>
        `;
    }

    const headerRight = document.querySelector('.header-right');
    const logoutBtn = document.createElement('button');
    logoutBtn.classList.add('btn', 'btn-secondary');
    logoutBtn.textContent = 'Вийти';
    logoutBtn.onclick = () => {
        logout();
        location.href = 'index.html';
    };
    headerRight.appendChild(logoutBtn);
}

// Оновлення кнопки авторизації залежно від статусу користувача
function updateAuthButton() {
    const btn = document.getElementById('auth-btn');
    if (!btn) return;

    const user = getCurrentUser();
    if (user) {
        btn.href = 'profile.html';
        btn.textContent = user.name || 'Профіль';
    } else {
        btn.href = 'login.html';
        btn.textContent = 'Увійти';
    }
}

// Пошук: ініціалізація обробника вводу для пошуку
function initSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return; 

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filteredBooks = mockDatabase.filter(book => 
            book.title.toLowerCase().includes(query) || 
            book.author.toLowerCase().includes(query)
        );

        if (document.getElementById('books-container')) {
            renderFilteredBooks(filteredBooks);
        }

        if (document.getElementById('favorites-container')) {
            const favs = getFavorites();
            const filteredFavs = filteredBooks.filter(book => favs.includes(book.id));
            renderFilteredFavorites(filteredFavs);
        }
    });
}

// Рендеринг відфільтрованих книг на головній
function renderFilteredBooks(books) {
    const container = document.getElementById('books-container');
    if (!container) return;

    const favs = getFavorites();

    if (books.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 40px;">Нічого не знайдено 🔍</p>`;
        return;
    }

    container.innerHTML = books.map(book => `
        <article class="book-card">
            <a href="book.html?id=${book.id}" class="card-link">
                <div class="cover-wrapper">
                    <img src="${book.cover}" class="book-cover" onload="onImageLoad(this)" onerror="onImageError(this)">
                </div>
                <div class="card-info">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author">${book.author}</p>
                </div>
            </a>
            <button class="btn btn-secondary fav-btn ${favs.includes(book.id) ? 'active' : ''}" onclick="toggleFavCard(this, ${book.id})">
                ${favs.includes(book.id) ? 'У обраному' : 'Додати до обраного'}
            </button>
        </article>
    `).join('');
}

// Рендеринг відфільтрованих обраних книг на профілі
function renderFilteredFavorites(books) {
    const container = document.getElementById('favorites-container');
    if (!container) return;

    if (books.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 40px;">Нічого не знайдено 🔍</p>`;
        return;
    }

    container.innerHTML = books.map(book => `
        <article class="book-card">
            <a href="book.html?id=${book.id}" class="card-link">
                <div class="cover-wrapper">
                    <img src="${book.cover}" class="book-cover" onload="onImageLoad(this)" onerror="onImageError(this)">
                </div>
                <div class="card-info">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author">${book.author}</p>
                </div>
            </a>
            <button class="btn btn-secondary fav-btn active" onclick="toggleFavCard(this, ${book.id})">У обраному</button>
        </article>
    `).join('');
}

// Ініціалізація після завантаження DOM
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    updateAuthButton();

    renderBooksGrid();
    loadBookDetails();
    renderFavoritesGrid();
    initSearch();

    if (document.querySelector('.profile-section')) {
        loadProfile();
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', e => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            if (login(email, password)) {
                location.href = 'profile.html';
            } else {
                alert('Неправильний email або пароль');
            }
        });
    }

    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', e => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            if (register(name, email, password)) {
                location.href = 'profile.html';
            } else {
                alert('Email вже існує');
            }
        });
    }
});