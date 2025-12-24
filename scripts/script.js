// TODO Добавить легенду цветов
// TODO Сохранение данных за месяц по нажатии на кнопку

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
const submitBtn = document.querySelector('.input-btn'); // Кнопка подтвердить
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

//
//
// Функция, которая показывает какой цвет у мужа и жены
const colorHighlighted = () => {};

//
//
// Функция, которая показывает совпадения выходных
// const matchDate = (arr1, arr2) => {
//   const matches = [];
//   for (let i = 0; i < arr1.length; i++) {
//     for (let j = 0; j < arr2.length; j++) {
//       if (arr1[i] === arr2[j]) {
//         matches.push(arr1[i]);
//       }
//     }
//   }
//   return matches;
// };

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
// Булка
// 1 2 5 6 10 11 15 16 19 24 26 27 30 31
// Я
// 1 4 5 8 9 12 13 16 17 20 21 24 25 26 27 28 29

//
//
//
//
// Если слайдер 1 включается, то подсвечиваются дни Жены
// Обработчик слайдера1
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

colorWife.addEventListener('input', () => {
  num1.forEach((el) => (el.style.backgroundColor = colorWife.value));
});

// Если слайдер 2 включается, то подсвечиваются дни Мужа
// Обработчик слайдера2
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

colorHusband.addEventListener('input', () => {
  num2.forEach((el) => (el.style.backgroundColor = colorHusband.value));
});

// Если слайдер 3 включается, то подсвечиваются дни Общие
// Обработчик слайдера3
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
