import './style.css';

document.addEventListener('DOMContentLoaded', () => {
    // получаю элементы из DOM
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const resultsContainer = document.getElementById('resultsContainer');

    // функция для обработки события поиска
    const searchHandler = () => {
        // получаю текст из поля ввода и привожу его к нижнему регистру
        const searchTerm = searchInput.value.trim().toLowerCase();
        // получаю все ячейки таблицы
        const tableCells = document.querySelectorAll('.table-content div');

        // проходжу по каждой ячейке и устанавливаю цвет фона в зависимости от наличия совпадения
        tableCells.forEach((cell) => {
            const cellContent = cell.textContent.toLowerCase();
            const hasMatch = searchTerm !== '' && cellContent.includes(searchTerm);
            cell.style.backgroundColor = hasMatch ? 'red' : '';
        });

        // подсчитываю количество совпадений
        const matchCount = countMatches(tableCells, searchTerm);

        // вывожу результаты поиска
        resultsContainer.textContent = searchTerm !== ''
            ? (matchCount > 0 ? `Найдено совпадений: ${matchCount}` : 'Ничего не найдено')
            : 'Введите поисковый запрос';
    };

    // функция для подсчета количества совпадений
    const countMatches = (cells, term) => {
        return Array.from(cells).filter((cell) => cell.textContent.toLowerCase().includes(term)).length;
    };

    // обработчик события для кнопки поиска
    searchButton.addEventListener('click', searchHandler);

    // обработчик события для нажатия клавиши Enter в поле ввода
    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            searchHandler();
        }
    });
});
