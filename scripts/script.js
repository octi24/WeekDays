// TODO Добавить легенду цветов ✅
// TODO Сохранение данных за месяц по нажатии на кнопку ✅
// TODO скролл к сохранённым данным ✅
// TODO год к сохранённому месяцу ✅
// TODO кнопка, которое открывает и закрывает модальное окно ❌
// TODO доделать бургер ❌
// TODO кнопка очисти воода

// Добавлено: Массив с названиями месяцев на русском для отображения
const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь'
];

// Добавлено: Инициализация текущей даты для синхронизации с реальной датой
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let currentDay = currentDate.getDate();

// Добавлено: Ссылки на элементы DOM для обновления месяца, года, дней и кнопок
const monthEl = document.querySelector('.month');
const yearEl = document.querySelector('.year');
const daysEl = document.querySelector('.days');
const prevBtn = document.querySelector('.arrow-btn-1'); // Кнопка переключения месяца назад
const nextBtn = document.querySelector('.arrow-btn-2'); // Кнопка переключения месяца вперёд
const submitBtn = document.querySelector('.submit-btn'); // Кнопка подтвердить
const input1 = document.querySelector('.input-1'); // Поле ввода1
const input2 = document.querySelector('.input-2'); // Поле ввода2
const slider1 = document.querySelector('.slider-1'); // Кнопка-слайдер1
const slider2 = document.querySelector('.slider-2'); // Кнопка-слайдер2
const slider3 = document.querySelector('.slider-3'); // Кнопка-слайдер3
const weekend1 = document.querySelector('.weekends.weekend-1'); // Параграф1 с количеством выходных
const weekend2 = document.querySelector('.weekends.weekend-2'); // Параграф2 с количеством выходных
const allWeekends = document.querySelector('.common-dates');
const colorWife = document.querySelector('.wife-color');
const colorHusband = document.querySelector('.husband-color');
const colorCommon = document.querySelector('.common-color');
const localStorageVal1 = localStorage.getItem('inputVal1');
const localStorageVal2 = localStorage.getItem('inputVal2');
const localStorageMonth = localStorage.getItem('savedMonth');
const saveBtn = document.querySelector('.save-btn');
const modalMenu = document.querySelector('.modal-menu');
const savedTextContainer = document.querySelector('.saved');
const modalWindowContainer = document.querySelector('.modal-window-container');
const modalItem = document.querySelector('.modal-item');

let num1;
let num2;
let matchNum;
let array1 = [];
let array2 = [];
let inputValue1 = []; // Даты выходных с поля ввода1
let inputValue2 = []; // Даты выходных с плоля ввода2
let commonDates = []; // Совпадения дат

// Добавлено: Функция для рендеринга календаря с синхронизацией даты
function renderCalendar() {
  // Добавлено: Обновление текста месяца и года на текущие
  monthEl.textContent = months[currentMonth];
  yearEl.textContent = currentYear;

  // months[currentMonth];

  // Добавлено: Очистка контейнера дней перед заполнением
  daysEl.innerHTML = '';

  // Добавлено: Расчет первого дня месяца и количества пустых ячеек (с учетом понедельника как первого дня недели)
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const blanks = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Добавлено: Создание пустых ячеек для заполнения сетки
  for (let i = 0; i < blanks; i++) {
    const empty = document.createElement('p');
    empty.classList.add('day-item', 'empty');
    daysEl.appendChild(empty);
  }

  // Добавлено: Создание элементов для дней месяца с подсветкой текущего дня
  for (let day = 1; day <= daysInMonth; day++) {
    const dayEl = document.createElement('p');
    dayEl.classList.add('day-item');
    dayEl.textContent = day;

    // Добавлено: Проверка и добавление класса для текущего дня
    const isCurrent =
      day === currentDay &&
      currentMonth === currentDate.getMonth() &&
      currentYear === currentDate.getFullYear();
    if (isCurrent) {
      dayEl.classList.add('current-day');
    }

    daysEl.appendChild(dayEl);
  }
}

// Добавлено: Обработчик для предыдущего месяца
prevBtn.addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
    8;
  }
  renderCalendar();
});

// Добавлено: Обработчик для следующего месяца
nextBtn.addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
});

// Добавлено: Инициальный вызов для синхронизации при загрузке
renderCalendar();

//
//
// В этой функции каждый элемент массива преобразуется из строки в число
const stringToNum = (array) => {
  // for (let i = 0; i < array.length; i++) {
  //   array[i] = Number(array[i]);
  // }
  array.forEach((element, index) => (array[index] = Number(element)));
};

//
//
// Эта функция проверяет, каждый элемент массива на NaN, если он NaN, то в кнопке показывает в каком поле ввода ошибка
const nanCheck = (array, inputArea, inputVal) => {
  // До
  // for (let i = 0; i < array.length; i++) {
  //   if (isNaN(array[i])) {
  //     console.log(`Элемент: ${array[i]} массива: ${inputArea} --- NaN`);
  //     // submitBtn.style.color = '#00ffffff';
  //     inputVal.style.color = '#00ffffff';
  //     // return (submitBtn.innerText = `Ошибка ${inputArea}, укажите именно числа!`);
  //     return (inputVal.value = `Ошибка, укажите именно числа!`);
  //   } else {
  //     console.log(`Элемент: ${array[i]} массива: ${inputArea} - не NaN `);
  //   }
  // }
  // После
  const hasNaN = array.some((element) => {
    if (isNaN(element)) {
      // console.log(`Элемент: ${element} ${inputArea} - NaN`);
      return true; // нашли NaN - прерываем поиск
    } else {
      // console.log(`Элемент: ${element} ${inputArea} - не NaN`);
      return false;
    }
  });

  if (hasNaN) {
    inputVal.style.color = '#00ffffff';
    inputVal.value = 'Ошибка, укажите именно числа!';
  }
};

//
//
// Функция Добавляет элементы массива на календарь
const addDateColorV2 = (arr, addClass) => {
  // const day = document.querySelectorAll('.day-item:not(.empty)');
  // for (let i = 0; i < arr.length; i++) {
  //   for (let j = 0; j < day.length; j++) {
  //     if (arr[i] == Number(day[j].textContent)) {
  //       day[j].classList.add(addClass); //num-1
  //     }
  //   }
  // }
  document.querySelectorAll('.day-item:not(.empty)').forEach((day) => {
    if (arr.includes(Number(day.textContent))) {
      // includes() проверяет наличие числа в массиве
      day.classList.add(addClass);
    }
  });
};

//
//
//Функция, которая Убирает элементы массива с календаря
const delDateColor = (arr, removeClass) => {
  // const day = document.querySelectorAll('.day-item:not(.empty)'); // Получает не пустой элемент календаря
  // for (let i = 0; i < arr.length; i++) {
  //   for (let j = 0; j < day.length; j++) {
  //     if (arr[i] == Number(day[j].textContent)) {
  //       day[j].classList.remove(removeClass); //num-1
  //     }
  //   }
  // }
  document.querySelectorAll('.day-item:not(.empty)').forEach((day) => {
    if (arr.includes(Number(day.textContent))) {
      // includes() проверяет наличие числа в массиве
      day.classList.remove(removeClass);
    }
  });
};

//В инпут вводятся цифры, через запятую, в массив приходят цифры в виде строки, которые разделяются на эелемнты массива через запятую.
function matchWeekends() {
  array1 = input1.value.split(' ');
  array2 = input2.value.split(' ');

  stringToNum(array1);
  stringToNum(array2);

  nanCheck(array1, 'в первом поле ввода', input1);
  nanCheck(array2, 'во втором поле ввода', input2);

  inputValue1 = [...array1];
  inputValue2 = [...array2];

  // commonDates = matchDate(inputValue1, inputValue2);
  commonDates = inputValue1.filter((element) => inputValue2.includes(element)); // Заменяет функцию с 167 строки

  weekend1.innerText = `Количество выходных: ${array1.length}`;
  weekend2.innerText = `Количество выходных: ${array2.length}`;

  submitBtn.style.display = 'none';
  allWeekends.innerText = `Количество общих выходных: ${commonDates.length}`;
}

// Сохраняем массивом
function saveInLocalStorage() {
  const inputValue1 = input1.value;
  const inputValue2 = input2.value;

  // Получаем текущий месяц из календаря (предполагаю, что у тебя есть переменная currentMonth)
  const currentMonthName = months[currentMonth]; // или как ты получаешь название месяца

  if (inputValue1.length > 0 || inputValue2.length > 0) {
    // Получаем существующий массив или создаём новый
    let savedArray = JSON.parse(localStorage.getItem('savedData')) || [];

    // Добавляем новое сохранение с месяцем
    savedArray.push({
      month: currentMonthName,
      value1: inputValue1,
      value2: inputValue2
    });

    // Сохраняем обновлённый массив
    localStorage.setItem('savedData', JSON.stringify(savedArray));

    // Обновляем отображение
    displaySavedData();

    console.log('saved');
  } else {
    console.log('error');
  }
}

// Функция для отображения всех сохранений
function displaySavedData() {
  // Очищаем контейнер
  savedTextContainer.innerHTML = '';

  // Получаем массив сохранений
  const savedArray = JSON.parse(localStorage.getItem('savedData')) || [];

  // Отображаем каждый элемент массива
  savedArray.forEach((item, index) => {
    // Добавляем обёртку
    const saveContainer = document.createElement('div');
    saveContainer.classList.add('save-container');
    savedTextContainer.appendChild(saveContainer);

    // Добавляем контейнер для разделения текста и изображения мусорки
    const savedText = document.createElement('div');
    savedText.classList.add('saved-text');
    saveContainer.appendChild(savedText);

    // Добавляем месяц и год
    const monthEl = document.createElement('p');
    monthEl.classList.add('saved-month');
    monthEl.innerText = `${item.month} ${currentYear}`;
    // savedTextContainer.appendChild(monthEl);
    savedText.appendChild(monthEl);

    // Добавляем значение 1, если оно есть
    if (item.value1 && item.value1.length > 0) {
      const save1 = document.createElement('p');
      save1.classList.add('save-1');
      save1.innerText = `Жена: ${item.value1}`;
      // savedTextContainer.appendChild(save1);
      savedText.appendChild(save1);
    }

    // Добавляем значение 2, если оно есть
    if (item.value2 && item.value2.length > 0) {
      const save2 = document.createElement('p');
      save2.classList.add('save-2');
      save2.innerText = `Муж: ${item.value2}`;
      // savedTextContainer.appendChild(save2);
      savedText.appendChild(save2);
    }

    // Добавляем изображение мусорки
    const trashCan = document.createElement('img');
    trashCan.setAttribute('src', './assets/TrashCan.svg');
    trashCan.classList.add('trash-can');
    saveContainer.appendChild(trashCan);

    // Обработчик удаления
    trashCan.addEventListener('click', () => {
      const currentArray = JSON.parse(localStorage.getItem('savedData')) || [];
      if (index >= 0 && index < currentArray.length) {
        currentArray.splice(index, 1);
        localStorage.setItem('savedData', JSON.stringify(currentArray));
        displaySavedData();
      }
    });

    // Добавляем разделитель (кроме последнего элемента)
    if (index < savedArray.length - 1) {
      const separator = document.createElement('hr');
      savedTextContainer.appendChild(separator);
    }
  });
}
// При загрузке страницы отображаем все сохранения
document.addEventListener('DOMContentLoaded', function () {
  displaySavedData();
});

//
//
//
//

// Обработчик слайдера1
// Если слайдер 1 включается, то подсвечиваются дни Жены
slider1.addEventListener('click', () => {
  if (slider1.checked) {
    console.log('Слайдер включён');
    console.log(inputValue1);
    addDateColorV2(inputValue1, 'num-1');
    num1 = document.querySelectorAll('.num-1');
    num1.forEach((el) => (el.style.backgroundColor = colorWife.value));
  } else {
    console.log('Слайдер выключен');
    delDateColor(inputValue1, 'num-1');
    num1.forEach((el) => el.removeAttribute('style'));
  }
});

// Обработчик на изменение цвета выходных дней Жены
colorWife.addEventListener('input', () => {
  num1.forEach((el) => (el.style.backgroundColor = colorWife.value));
});

// Обработчик слайдера2
// Если слайдер 2 включается, то подсвечиваются дни Мужа
slider2.addEventListener('click', () => {
  if (slider2.checked) {
    console.log('Слайдер включён');
    console.log(inputValue2);
    addDateColorV2(inputValue2, 'num-2');
    num2 = document.querySelectorAll('.num-2');
    num2.forEach((el) => (el.style.backgroundColor = colorHusband.value));
  } else {
    console.log('Слайдер выключен');
    delDateColor(inputValue2, 'num-2');
    num2.forEach((el) => el.removeAttribute('style'));
  }
});

// Обработчик на изменение цвета выходных дней Мужа
colorHusband.addEventListener('input', () => {
  num2.forEach((el) => (el.style.backgroundColor = colorHusband.value));
});

// Обработчик слайдера3
// Если слайдер 3 включается, то подсвечиваются дни Общие
slider3.addEventListener('click', () => {
  if (slider3.checked) {
    console.log('Слайдер включён');
    console.log(commonDates);
    addDateColorV2(commonDates, 'match-num');
    matchNum = document.querySelectorAll('.match-num');
    matchNum.forEach((el) => (el.style.backgroundColor = colorCommon.value));
  } else {
    console.log('Слайдер выключен');
    delDateColor(commonDates, 'match-num');
    matchNum.forEach((el) => el.removeAttribute('style'));
  }
});

// Обработчик события на открытие модального окна
modalMenu.addEventListener('click', () => {
  modalWindowContainer.style.display = 'flex';
  savedTextContainer.style.display = 'block';
});

// Обработчик события на закрытие модального окна при нажатии на затемнённую область
modalWindowContainer.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    modalWindowContainer.style.display = 'none';
  }
});

// Обработчик сохранённого значения. При нажатии вводится в инпут
savedTextContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('save-1')) {
    input1.value = event.target.innerText.replace('Жена: ', '');
    modalWindowContainer.style.display = 'none';
  }
});
savedTextContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('save-2')) {
    input2.value = event.target.innerText.replace('Муж: ', '');
    modalWindowContainer.style.display = 'none';
  }
});
