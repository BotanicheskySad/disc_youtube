export const QUESTIONS_DB = {
  beginner: [
    {
      id: 1,
      type: 'multiple-choice',
      title: '📝 Основы JavaScript',
      question: 'Как правильно объявить переменную в JavaScript?',
      options: ['var name = "John"', 'variable name = "John"', 'v name = "John"', 'let = "John"'],
      correct: 'var name = "John"',
      points: 10,
      explanation: 'В JavaScript переменные объявляются с помощью var, let или const',
      ignoreSpaces: true
    },
    {
      id: 2,
      type: 'drag-drop',
      title: '🎯 Собери функцию',
      question: 'Собери правильный синтаксис функции, которая возвращает приветствие',
      availableBlocks: ['function', 'greet', '()', '{}', 'return', '"Hello"', 'console.log', 'if'],
      correct: ['function', 'greet', '()', '{}', 'return', '"Hello"'],
      points: 15,
      explanation: 'Правильная функция: function greet() { return "Hello"; }'
    },
    {
      id: 3,
      type: 'fill-code',
      title: '✏️ Дополни код',
      question: 'Напиши недостающую часть кода:',
      codeSnippet: `function calculateSum(a, b) {\n    return ____;\n}\n\n// Пример вызова:\n// calculateSum(5, 3) должно вернуть 8`,
      correct: 'a + b',
      points: 20,
      explanation: 'Функция должна возвращать сумму двух чисел: a + b',
      ignoreSpaces: true
    },
    {
      id: 4,
      type: 'order-blocks',
      title: '🔄 Расставь в правильном порядке',
      question: 'Расположи строки кода так, чтобы программа вывела в консоль результат умножения',
      blocks: [
        'console.log(result);',
        'const result = multiply(3, 4);',
        'function multiply(x, y) {',
        '  return x * y;',
        '}'
      ],
      correct: [
        'function multiply(x, y) {',
        '  return x * y;',
        '}',
        'const result = multiply(3, 4);',
        'console.log(result);'
      ],
      points: 25,
      explanation: 'Сначала объявляем функцию, потом вызываем её и выводим результат'
    },
    {
      id: 5,
      type: 'fill-code',
      title: '🐍 Python: правильные отступы',
      question: 'Напиши правильный код с отступами (важны пробелы!)',
      codeSnippet: `def check_number(x):\n    if x > 0:\n        ____\n    else:\n        print("negative")`,
      correct: '    print("positive")',
      points: 30,
      explanation: 'В Python отступы определяют блоки кода. Внутри if нужно сделать отступ в 4 пробела',
      ignoreSpaces: false,
      preserveIndent: true
    }
  ]
};