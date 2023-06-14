// Код, выполняющийся после полной загрузки DOM-дерева
document.addEventListener('DOMContentLoaded', function() {
  
  // Получаем все элементы с классом 'lesson'
  const lessons = document.querySelectorAll('.lesson');
  
  // Получаем все элементы с классом 'question'
  const questions = document.querySelectorAll('.question');

  // Добавляем нумерацию перед каждым вопросом
  questions.forEach(function(question, index) {
    const questionNumber = index + 1;
    const questionTitle = document.createElement('h3');
    questionTitle.textContent = `Питання ${questionNumber}:`;
    questionTitle.classList.add('question-title');
    question.insertBefore(questionTitle, question.firstChild);
  });

  // Получаем кнопки по их классам
  const checkButton = document.querySelector('.check-button');
  const resetButton = document.querySelector('.reset-button');
  const okButton = document.querySelector('.ok-button');
  const retryButton = document.querySelector('.retry-button');

  // Добавляем обработчики событий для кнопок
  checkButton.addEventListener('click', checkAnswers);
  resetButton.addEventListener('click', resetQuiz);
  okButton.addEventListener('click', closeModal);
  retryButton.addEventListener('click', retryQuiz);

  // Функция для проверки ответов
  function checkAnswers() {
    let score = 0;

    // Проверяем каждый вопрос
    questions.forEach((question) => {
      const inputs = question.querySelectorAll('input');
      let isAnswerCorrect = false;

      // Проверяем каждый вариант ответа
      inputs.forEach((input) => {
        if (input.checked && input.value === 'h1') {
          isAnswerCorrect = true;
        }
      });

      // Удаляем предыдущий результат проверки
      const result = question.querySelector('.result');
      if (result) {
        result.remove();
      }

      // Создаем новый элемент для отображения результата проверки
      const newResult = document.createElement('p');
      if (isAnswerCorrect) {
        newResult.textContent = 'Правильно';
        newResult.classList.add('result', 'correct');
        score++;
      } else {
        newResult.textContent = 'Помилка';
        newResult.classList.add('result', 'incorrect');
      }
      
      // Добавляем результат проверки к вопросу
      question.appendChild(newResult);
    });

    // Удаляем предыдущий итоговый результат
    const totalScore = document.querySelector('#exercises .result');
    if (totalScore) {
      totalScore.remove();
    }

    // Создаем новый элемент для отображения итогового результата
    const scoreElement = document.createElement('p');
    scoreElement.textContent = `Ваш бал: ${score} / ${questions.length}`;
    scoreElement.classList.add('result');
    document.querySelector('#exercises').appendChild(scoreElement);

    // Отключаем кнопку проверки, включаем кнопку сброса
    checkButton.disabled = true;
    resetButton.disabled = false;
  }

  // Функция для сброса викторины
  function resetQuiz() {
    // Удаляем все результаты проверки
    const results = document.querySelectorAll('.result');
    results.forEach((result) => {
      result.remove();
    });

    // Сбрасываем все выбранные варианты ответов
    questions.forEach((question) => {
      const inputs = question.querySelectorAll('input');
      inputs.forEach((input) => {
        input.checked = false;
      });
    });

    // Отключаем кнопку сброса, включаем кнопку проверки
    resetButton.disabled = true;
    checkButton.disabled = false;
  }

  // Функция для отображения результатов
  function showResults() {
    let score = 0;

    // Проверяем каждый вопрос
    questions.forEach((question) => {
      const inputs = question.querySelectorAll('input');
      let isAnswerCorrect = false;

      // Проверяем каждый вариант ответа
      inputs.forEach((input) => {
        if (input.checked && input.value === 'h1') {
          isAnswerCorrect = true;
        }
      });

      // Увеличиваем счетчик правильных ответов
      if (isAnswerCorrect) {
        score++;
      }
    });

    // Вычисляем процент правильных ответов
    const percentage = (score / questions.length) * 100;

    // Отображаем общий результат, процент и сообщение
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Бали: ${score} / ${questions.length}`;

    const percentageElement = document.getElementById('percentage');
    percentageElement.textContent = `Відсоток правильних відповідей: ${percentage}%`;

    const messageElement = document.getElementById('message');
    if (percentage === 100) {
      messageElement.textContent = 'Тупо батька (це тіпо дуже круто)';
    } else if (percentage >= 90) {
      messageElement.textContent = 'Молодець!';
    } else if (percentage >= 70) {
      messageElement.textContent = 'Можна краще!';
    } else if (percentage >= 50) {
      messageElement.textContent = 'Непогано!';
    } else {
      messageElement.textContent = 'Спробуй ще раз!';
    }

    // Открываем модальное окно с результатами
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
  }

  // Функция для закрытия модального окна
  function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
  }

  // Функция для перезапуска викторины
  function retryQuiz() {
    resetQuiz();
    closeModal();
  }

  // Добавляем обработчик события для кнопки проверки
  checkButton.addEventListener('click', showResults);

  // Получаем все переключатели уроков
  const lessonToggles = document.querySelectorAll('.lesson-toggle');

  // Добавляем обработчики событий для переключателей уроков
  lessonToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      toggle.parentNode.classList.toggle('active');
    });
  });
});

// JavaScript-код для плавной анимации прокрутки

// Код, выполняющийся после полной загрузки DOM-дерева
document.addEventListener('DOMContentLoaded', function() {
  
  // Получаем все ссылки внутри элемента <nav>
  const links = document.querySelectorAll('nav a');

  // Добавляем обработчик событий для каждой ссылки
  links.forEach(function(link) {
    link.addEventListener('click', smoothScroll);
  });

  // Функция для плавной прокрутки к якорю
  function smoothScroll(event) {
    event.preventDefault();

    // Получаем идентификатор целевого элемента
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    // Если целевой элемент существует
    if (targetElement) {
      // Вычисляем позицию целевого элемента и текущую позицию прокрутки
      const targetPosition = targetElement.offsetTop;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1000; // Продолжительность анимации в миллисекундах
      let start = null;

      // Функция анимации прокрутки
      window.requestAnimationFrame(step);

      function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = Math.min(progress / duration, 1);
        // Прокручиваем страницу до указанной позиции
        window.scrollTo(0, startPosition + distance * percentage);
        if (progress < duration) {
          // Продолжаем анимацию, пока не достигнем конечной позиции
          window.requestAnimationFrame(step);
        }
      }
    }

    // Удаляем класс 'active' у всех ссылок и добавляем его к текущей ссылке
    links.forEach(function(link) {
      link.classList.remove('active');
    });
    this.classList.add('active');
  }
});
