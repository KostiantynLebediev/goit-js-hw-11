//? npm install axios
//? https://pixabay.com/api/docs/
//? Your API key: 39117010-188e78dbd91dcd6bc7f235c58

import axios from 'axios';

const PER_PAGE = 40; //*                                   К-сть результатів на 1 сторінці
const API_KEY = '39117010-188e78dbd91dcd6bc7f235c58'; //*  API-ключ для доступу до Pixabay API
const BASE_URL = 'https://pixabay.com/api/'; //*           Базова URL-адреса для запитів

//* Клас ApiService для взаємодії з Pixabay API
export default class ApiService {
  //* Поля для збереження стану запитів
  #searchQuery; //* Пошуковий запит
  #page; //* Поточна сторінка результатів
  #totalHits; //* Загальна к-сть знайдених результатів.

  //* Конструктор класу
  constructor() {
    //* Ініціалізація пошукового запиту, сторінки та загальної к-сті результатів
    this.#searchQuery = '';
    this.#page = 1;
    this.#totalHits = 0;
  }

  //* Метод для збільшення номера поточної сторінки.
  addPage() {
    this.#page += 1;
  }

  //* Метод для скидання номера поточної сторінки на 1.
  resetPage() {
    this.#page = 1;
  }

  //* Метод для перевірки наявності більше сторінок для завантаження.
  isMorePage() {
    //* Перевірка наявності більше результатів для завантаження.
    return PER_PAGE * (this.#page - 1) < this.#totalHits;
  }

  //* Геттер для отримання загальної к-сті результатів.
  get totalHits() {
    return this.#totalHits;
  }

  //* Геттер для отримання номера поточної сторінки.
  get currentPage() {
    return this.#page;
  }

  //* Сеттер для встановлення пошукового запиту.
  set searchQuery(value) {
    this.#searchQuery = value;
  }

  //* Асинхронний метод для отримання зображень за допомогою API.
  async fetchImage() {
    //* Виконання GET-запиту до Pixabay API з використанням axios.
    const response = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${
        this.#searchQuery
      }&image_type=photo&orientation=horizontal&safesearch=true&per_page=${PER_PAGE}&page=${
        this.#page
      }`
    );

    //* Оновлення загальної к-сті результатів з отриманої відповіді.
    this.#totalHits = response.data.totalHits;

    //* Повернення даних з відповіді API.
    return response.data;
  }
}
