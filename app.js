// Основное приложение полиатлона
class PolyathlonApp {
    constructor() {
        this.db = database;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateDisplay();
        this.updateStats();

        console.log('🚀 Приложение полиатлона запущено!');
        this.showNotification('✅ Система готова к работе!', 'success');
    }

    setupEventListeners() {
        // Форма регистрации участника
        document.getElementById('registration-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.registerParticipant();
        });

        // Форма ввода результатов
        document.getElementById('results-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveResult();
        });

        // Обновление рейтинга
        document.getElementById('refresh-rating').addEventListener('click', () => {
            this.updateRating();
        });

        // Фильтр категории в рейтинге
        document.getElementById('category-filter').addEventListener('change', () => {
            this.updateRating();
        });

        // Навигация
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = e.target.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
            });
        });
    }

    // Регистрация нового участника
    registerParticipant() {
        const formData = {
            full_name: document.getElementById('full-name').value.trim(),
            birth_date: document.getElementById('birth-date').value,
            gender: document.getElementById('gender').value,
            category: document.getElementById('category').value,
            organization: document.getElementById('organization').value.trim(),
            contact_phone: document.getElementById('phone').value.trim(),
            email: document.getElementById('email').value.trim()
        };

        // Валидация
        if (!formData.full_name || !formData.birth_date || !formData.gender || !formData.category || !formData.organization) {
            this.showNotification('❌ Заполните все обязательные поля!', 'error');
            return;
        }

        try {
            const newParticipant = this.db.addParticipant(formData);
            this.showNotification(`✅ Участник ${newParticipant.full_name} зарегистрирован под номером ${newParticipant.number}!`, 'success');

            // Очистка формы
            document.getElementById('registration-form').reset();

            // Обновление интерфейса
            this.updateDisplay();
            this.updateStats();

        } catch (error) {
            this.showNotification(`❌ Ошибка регистрации: ${error.message}`, 'error');
        }
    }

    // Сохранение результата
    saveResult() {
        const participantId = parseInt(document.getElementById('participant-select').value);
        const discipline = document.getElementById('discipline').value;
        const resultText = document.getElementById('result').value.trim();
        const points = parseInt(document.getElementById('points').value) || 0;

        if (!participantId || !discipline || !resultText) {
            this.showNotification('❌ Заполните все обязательные поля!', 'error');
            return;
        }

        // Парсим числовое значение из текста результата
        const resultValue = this.parseResultValue(resultText, discipline);

        const resultData = {
            participant_id: participantId,
            discipline: discipline,
            result_value: resultValue,
            result_text: resultText,
            points: points
        };

        try {
            const newResult = this.db.addResult(resultData);
            this.showNotification('✅ Результат успешно сохранен!', 'success');

            // Очистка формы
            document.getElementById('results-form').reset();

            // Обновление интерфейса
            this.updateDisplay();
            this.updateStats();

        } catch (error) {
            this.showNotification(`❌ Ошибка сохранения: ${error.message}`, 'error');
        }
    }

    // Парсинг числового значения из текста результата
    parseResultValue(resultText, discipline) {
        // Убираем все нечисловые символы кроме точки и двоеточия
        const cleanText = resultText.replace(/[^\d.:]/g, '');

        if (discipline === 'running-100m' || discipline === 'swimming-100m') {
            // Для времени: "12.5" -> 12.5, "1:08.2" -> 68.2
            if (cleanText.includes(':')) {
                const [minutes, seconds] = cleanText.split(':');
                return parseFloat(minutes) * 60 + parseFloat(seconds);
            }
            return parseFloat(cleanText);
        } else if (discipline === 'shooting' || discipline === 'pull-ups') {
            // Для очков и количества: просто число
            return parseInt(cleanText) || 0;
        }

        return 0;
    }

    // Обновление всего интерфейса
    updateDisplay() {
        this.updateParticipantsTable();
        this.updateParticipantSelect();
        this.updateResultsTable();
        this.updateRating();
    }

    // Обновление таблицы участников
    updateParticipantsTable() {
        const participants = this.db.getAllParticipants();
        const tableBody = document.getElementById('participants-table');

        tableBody.innerHTML = '';

        if (participants.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="6" style="text-align: center; color: #666;">Нет зарегистрированных участников</td>`;
            tableBody.appendChild(row);
            return;
        }

        participants.forEach(participant => {
            const row = document.createElement('tr');

            const categoryIcon = participant.gender === 'female' ? '👩' : '👨';
            const categoryText = this.getCategoryText(participant.category);

            row.innerHTML = `
                <td>${participant.number}</td>
                <td>${participant.full_name}</td>
                <td>${participant.organization}</td>
                <td>${categoryIcon} ${categoryText}</td>
                <td>${participant.contact_phone || '-'}</td>
                <td>
                    <button class="btn-secondary" onclick="app.deleteParticipant(${participant.id})" title="Удалить">
                        🗑️
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Обновление выпадающего списка участников
    updateParticipantSelect() {
        const participants = this.db.getAllParticipants();
        const select = document.getElementById('participant-select');

        select.innerHTML = '<option value="">Выберите участника</option>';

        participants.forEach(participant => {
            const option = document.createElement('option');
            option.value = participant.id;
            option.textContent = `#${participant.number} - ${participant.full_name} (${this.getCategoryText(participant.category)})`;
            select.appendChild(option);
        });
    }

    // Обновление таблицы результатов
    updateResultsTable() {
        const results = this.db.getAllResults();
        const participants = this.db.getAllParticipants();
        const tableBody = document.getElementById('results-table');

        tableBody.innerHTML = '';

        if (results.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="6" style="text-align: center; color: #666;">Нет сохраненных результатов</td>`;
            tableBody.appendChild(row);
            return;
        }

        results.forEach(result => {
            const participant = participants.find(p => p.id === result.participant_id);
            const discipline = this.db.getDiscipline(result.discipline);

            if (participant && discipline) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>#${participant.number} ${participant.full_name}</td>
                    <td>${discipline.name}</td>
                    <td>${result.result_text}</td>
                    <td>${result.points || 0}</td>
                    <td>${new Date(result.created_at).toLocaleDateString()}</td>
                    <td>
                        <button class="btn-secondary" onclick="app.deleteResult(${result.id})" title="Удалить">
                            🗑️
                        </button>
                    </td>
                `;
                tableBody.appendChild(row);
            }
        });
    }

    // Обновление рейтинга
    updateRating() {
        const categoryFilter = document.getElementById('category-filter').value;
        const ratingData = this.db.calculateRating(categoryFilter);
        const tableBody = document.getElementById('rating-table');

        tableBody.innerHTML = '';

        if (ratingData.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="8" style="text-align: center; color: #666;">Нет данных для рейтинга</td>`;
            tableBody.appendChild(row);
            return;
        }

        ratingData.forEach((item, index) => {
            const row = document.createElement('tr');

            // Определяем медаль
            let medal = '';
            if (index === 0) medal = '<span class="medal-gold">🥇 1</span>';
            else if (index === 1) medal = '<span class="medal-silver">🥈 2</span>';
            else if (index === 2) medal = '<span class="medal-bronze">🥉 3</span>';
            else medal = (index + 1).toString();

            const participant = item.participant;

            row.innerHTML = `
                <td>${medal}</td>
                <td>#${participant.number} ${participant.full_name}</td>
                <td>${this.getCategoryText(participant.category)}</td>
                <td>${item.results.running ? item.results.running.result_text : '-'}</td>
                <td>${item.results.swimming ? item.results.swimming.result_text : '-'}</td>
                <td>${item.results.shooting ? item.results.shooting.result_text : '-'}</td>
                <td>${item.results.pullups ? item.results.pullups.result_text : '-'}</td>
                <td><strong>${item.totalPoints}</strong></td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Обновление статистики
    updateStats() {
        const stats = this.db.getStats();

        document.getElementById('stat-participants').textContent = stats.participants;
        document.getElementById('stat-results').textContent = stats.results;
        document.getElementById('stat-teams').textContent = stats.teams;
        document.getElementById('stat-disciplines').textContent = stats.disciplines;
    }

    // Удаление участника
    deleteParticipant(participantId) {
        const participant = this.db.getParticipant(participantId);
        if (participant && confirm(`Удалить участника ${participant.full_name}? Все его результаты также будут удалены.`)) {
            this.db.deleteParticipant(participantId);
            this.showNotification('🗑️ Участник удален', 'success');
            this.updateDisplay();
            this.updateStats();
        }
    }

    // Удаление результата
    deleteResult(resultId) {
        if (confirm('Удалить этот результат?')) {
            this.db.deleteResult(resultId);
            this.showNotification('🗑️ Результат удален', 'success');
            this.updateDisplay();
            this.updateStats();
        }
    }

    // Получение текстового представления категории
    getCategoryText(category) {
        const categories = {
            'men': 'Мужчины',
            'women': 'Женщины',
            'juniors': 'Юниоры',
            'veterans': 'Ветераны'
        };
        return categories[category] || category;
    }

    // Прокрутка к секции
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Показать уведомление
    showNotification(message, type = 'success') {
        this.db.showNotification(message, type);
    }

    // Скачивание документа (заглушка)
    downloadDocument(type) {
        const documents = {
            'rules': 'rules.pdf',
            'protocols': 'protocol_forms.zip',
            'judges_guide': 'judges_guide.pdf'
        };

        this.showNotification(`📥 Начато скачивание: ${documents[type]}`, 'success');
    }

    // Экспорт данных
    exportData() {
        if (this.db.exportData()) {
            this.showNotification('📤 Данные успешно экспортированы!', 'success');
        }
    }

    // Сброс к демо-данным
    resetToDemoData() {
        this.db.resetToDemoData();
    }

    // Экспорт полного отчета
    exportFullReport() {
        if (this.db.exportFullReport()) {
            this.showNotification('📊 Полный отчет успешно экспортирован в CSV!', 'success');
        }
    }
}

// Запуск приложения когда страница загрузится
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new PolyathlonApp();
});