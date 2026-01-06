// TODO Добавить легенду цветов ✅
// TODO Сохранение данных за месяц по нажатии на кнопку ✅
// TODO скролл к сохранённым данным ✅
// TODO год к сохранённому месяцу ✅
// TODO кнопка, которое открывает и закрывает модальное окно ❌
// TODO доделать бургер ❌
// TODO кнопка очистки воода ✅
// TODO разобраться почему при пустых полях ввода показывается кол-во выходных 1 ✅
// TODO при нажатии на число календаря, добавлять его в поле ввода ✅
// TODO если галочка возле поля ввода Жены, то выбранное число календаря добавляется в него ✅

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
const weekend1 = document.querySelector('.weekends.weekend-1'); // Параграф1 с количеством выходных
const weekend2 = document.querySelector('.weekends.weekend-2'); // Параграф2 с количеством выходных
const allWeekends = document.querySelector('.common-dates');
const colorWife = document.querySelector('.wife-color');
const colorHusband = document.querySelector('.husband-color');
const colorCommon = document.querySelector('.common-color');
const savedTextContainer = document.querySelector('.saved'); // Контейнер в модальном окне для сохранённых данных
const modalWindowContainer = document.querySelector('.modal-window-container'); // Контейнер модального окна
const inputsWrapper = document.querySelector('.inputs');
const inputLabel1 = document.querySelector('.input-1-label');
const inputLabel2 = document.querySelector('.input-2-label');
const clearBtn = document.querySelectorAll('.clear-btn');
const calendarWrapper = document.querySelector('.calendar-wrapper');

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

// В этой функции каждый элемент массива преобразуется из строки в число
const stringToNum = (array) => {
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

const emptyCheck = (input, arr) => {
  if (input.value === '') {
    arr = [];
  } else {
    if (input.value.at(-1) === ' ') {
      arr = input.value.slice(0, -1).split(' ');
    } else {
      arr = input.value.split(' ');
    }
  }
  return arr;
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

const changeText = (newText, oldText) => {
  submitBtn.textContent = newText;

  submitBtn.style.transform = `scaleY(1.2)`;
  submitBtn.style.cursor = 'default';
  submitBtn.setAttribute('readonly', '');

  setTimeout(() => {
    submitBtn.textContent = oldText;
    submitBtn.removeAttribute('style');
  }, 5000);
};

//В инпут вводятся цифры, через запятую, в массив приходят цифры в виде строки, которые разделяются на эелемнты массива через запятую.
function matchWeekends() {
  array1 = emptyCheck(input1, array1);
  array2 = emptyCheck(input2, array2);

  weekend1.textContent = `Количество выходных: ${array1.length}`;
  weekend2.textContent = `Количество выходных: ${array2.length}`;

  stringToNum(array1);
  stringToNum(array2);

  nanCheck(array1, 'в первом поле ввода', input1);
  nanCheck(array2, 'во втором поле ввода', input2);

  inputValue1 = [...array1];
  inputValue2 = [...array2];

  // commonDates = matchDate(inputValue1, inputValue2);
  commonDates = inputValue1.filter((element) => inputValue2.includes(element)); // Заменяет функцию с 167 строки

  changeText(
    'Нажмите на соответствующие переключатели для активации!',
    'Подсветить'
  );

  allWeekends.innerText = `Количество общих выходных: ${commonDates.length}`;
}

// Функция для сохранения чисел массивом
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

// Обработчик на изменение цвета выходных дней Жены
colorWife.addEventListener('input', () => {
  num1.forEach((el) => (el.style.backgroundColor = colorWife.value));
});

// Обработчик на изменение цвета выходных дней Мужа
colorHusband.addEventListener('input', () => {
  num2.forEach((el) => (el.style.backgroundColor = colorHusband.value));
});

// Обработчик события на закрытие модального окна при нажатии на затемнённую область
modalWindowContainer.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    modalWindowContainer.style.display = 'none';
  }
});

// Обработчик сохранённого значения. При нажатии вводится в инпут
savedTextContainer.addEventListener('click', (event) => {
  const target = event.target;

  if (target.classList.contains('save-1')) {
    input1.value = event.target.innerText.replace('Жена: ', '');
    modalWindowContainer.style.display = 'none';
  }
});
savedTextContainer.addEventListener('click', (event) => {
  const target = event.target;

  if (target.classList.contains('save-2')) {
    input2.value = event.target.innerText.replace('Муж: ', '');
    modalWindowContainer.style.display = 'none';
  }
});

inputsWrapper.addEventListener('click', (event) => {
  const target = event.target;

  if (target.classList.contains('clear-btn')) {
    if (target === clearBtn[0]) {
      input1.value = '';
    } else {
      input2.value = '';
    }
    console.log(target); // const clearBtn
  } else if (target.classList.contains('input-1-label')) {
    if (
      inputLabel1.textContent === 'Выходные Жены:' &&
      inputLabel2.textContent === 'Выходные Мужа: ✅'
    ) {
      inputLabel2.textContent = 'Выходные Мужа:';
      inputLabel1.textContent = 'Выходные Жены: ✅';
    }
    console.log(target); // const inputLabel1
  } else if (target.classList.contains('input-2-label')) {
    if (
      inputLabel2.textContent === 'Выходные Мужа:' &&
      inputLabel1.textContent === 'Выходные Жены: ✅'
    ) {
      inputLabel1.textContent = 'Выходные Жены:';
      inputLabel2.textContent = 'Выходные Мужа: ✅';
    }
    console.log(target); //const inputLabel2
  } else if (target.classList.contains('modal-menu')) {
    modalWindowContainer.style.display = 'flex';
    savedTextContainer.style.display = 'block';
    console.log(target); // const savedDataBtn
  } else if (target.classList.contains('slider-1')) {
    if (target.checked) {
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
    console.log(target); //const slider1
  } else if (target.classList.contains('slider-2')) {
    if (target.checked) {
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
    console.log(target); //const slider2
  } else if (target.classList.contains('slider-3')) {
    if (target.checked) {
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
    console.log(target); //const slider3
  }
});

inputsWrapper.addEventListener('pointerover', (event) => {
  const target = event.target;

  if (target.classList.contains('input-1-label')) {
    if (event.pointerType === 'mouse') {
      inputLabel1.style.color = '#a6a6a6';
    }
  } else if (target.classList.contains('input-2-label')) {
    if (event.pointerType === 'mouse') {
      target.style.color = '#a6a6a6';
    }
  }
});

inputsWrapper.addEventListener('pointerout', (event) => {
  const target = event.target;

  if (target.classList.contains('input-1-label')) {
    if (event.pointerType === 'mouse') {
      target.removeAttribute('style');
    }
  } else if (target.classList.contains('input-2-label')) {
    if (event.pointerType === 'mouse') {
      target.removeAttribute('style');
    }
  }
});

calendarWrapper.addEventListener('click', (event) => {
  const target = event.target;

  if (
    target.classList.contains('day-item') &&
    !target.classList.contains('empty')
  ) {
    console.log('Клик по элементу с классом item!');
    if (inputLabel1.textContent === 'Выходные Жены: ✅') {
      input1.value += `${target.innerText} `;
    } else if (inputLabel2.textContent === 'Выходные Мужа: ✅') {
      input2.value += `${target.innerText} `;
    }
  }
});
