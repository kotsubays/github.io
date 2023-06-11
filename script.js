document.addEventListener('DOMContentLoaded', function() {
  const lessons = document.querySelectorAll('.lesson');
  const questions = document.querySelectorAll('.question');

  // Добавляем нумерацию перед каждым вопросом
  questions.forEach(function(question, index) {
    const questionNumber = index + 1;
    const questionTitle = document.createElement('h3');
    questionTitle.textContent = `Питання ${questionNumber}:`;
    questionTitle.classList.add('question-title');
    question.insertBefore(questionTitle, question.firstChild);
  });

  const checkButton = document.querySelector('.check-button');
  const resetButton = document.querySelector('.reset-button');
  const okButton = document.querySelector('.ok-button');
  const retryButton = document.querySelector('.retry-button');

  checkButton.addEventListener('click', checkAnswers);
  resetButton.addEventListener('click', resetQuiz);
  okButton.addEventListener('click', closeModal);
  retryButton.addEventListener('click', retryQuiz);

  function checkAnswers() {
    let score = 0;

    questions.forEach((question) => {
      const inputs = question.querySelectorAll('input');
      let isAnswerCorrect = false;

      inputs.forEach((input) => {
        if (input.checked && input.value === 'h1') {
          isAnswerCorrect = true;
        }
      });
      

      const result = question.querySelector('.result');
      if (result) {
        result.remove();
      }

      const newResult = document.createElement('p');
      if (isAnswerCorrect) {
        newResult.textContent = 'Правильно';
        newResult.classList.add('result', 'correct');
        score++;
      } else {
        newResult.textContent = 'Помилка';
        newResult.classList.add('result', 'incorrect');
      }
      question.appendChild(newResult);
    });

    const totalScore = document.querySelector('#exercises .result');
    if (totalScore) {
      totalScore.remove();
    }

    const scoreElement = document.createElement('p');
    scoreElement.textContent = `Ваш бал: ${score} / ${questions.length}`;
    scoreElement.classList.add('result');
    document.querySelector('#exercises').appendChild(scoreElement);

    checkButton.disabled = true;
    resetButton.disabled = false;
  }

  function resetQuiz() {
    const results = document.querySelectorAll('.result');
    results.forEach((result) => {
      result.remove();
    });

    questions.forEach((question) => {
      const inputs = question.querySelectorAll('input');
      inputs.forEach((input) => {
        input.checked = false;
      });
    });

    resetButton.disabled = true;
    checkButton.disabled = false;
  }

  function showResults() {
    let score = 0;

    questions.forEach((question) => {
      const inputs = question.querySelectorAll('input');
      let isAnswerCorrect = false;

      inputs.forEach((input) => {
        if (input.checked && input.value === 'h1') {
          isAnswerCorrect = true;
        }
      });

      if (isAnswerCorrect) {
        score++;
      }
    });

    const percentage = (score / questions.length) * 100;

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

    const modal = document.getElementById('modal');
    modal.style.display = 'block';
  }

  function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
  }

  function retryQuiz() {
    resetQuiz();
    closeModal();
  }

  checkButton.addEventListener('click', showResults);

  const lessonToggles = document.querySelectorAll('.lesson-toggle');

  lessonToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      toggle.parentNode.classList.toggle('active');
    });
  });
});
// JavaScript-код для плавной анимации прокрутки

document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('nav a');

  links.forEach(function(link) {
    link.addEventListener('click', smoothScroll);
  });

  function smoothScroll(event) {
    event.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const targetPosition = targetElement.offsetTop;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1000; // Продолжительность анимации в миллисекундах
      let start = null;

      window.requestAnimationFrame(step);

      function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = Math.min(progress / duration, 1);
        window.scrollTo(0, startPosition + distance * percentage);
        if (progress < duration) {
          window.requestAnimationFrame(step);
        }
      }
    }

    links.forEach(function(link) {
      link.classList.remove('active');
    });
    this.classList.add('active');
  }
});
