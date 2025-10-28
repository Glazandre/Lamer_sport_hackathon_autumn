// JSON база данных для системы полиатлона
class PolyathlonDatabase {
    constructor() {
        this.storageKey = 'polyathlon_data';
        this.data = this.loadData();
        this.setupImportListener();
    }

    // Загрузка данных из localStorage
    loadData() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                console.log('✅ Данные загружены из localStorage');
                return JSON.parse(saved);
            }
        } catch (error) {
            console.error('❌ Ошибка загрузки данных:', error);
        }

        // Если нет сохраненных данных, создаем демо-данные
        console.log('📝 Создаем демо-данные');
        return this.getDemoData();
    }

    // Сохранение данных в localStorage
    saveData() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.data));
            console.log('💾 Данные сохранены');
            return true;
        } catch (error) {
            console.error('❌ Ошибка сохранения:', error);
            this.showNotification('❌ Ошибка сохранения данных', 'error');
            return false;
        }
    }

    // Демо-данные для начала работы
    getDemoData() {
        return {
            // participants: [
            //     {
            //         id: 1,
            //         number: 101,
            //         full_name: 'Иванов Алексей Петрович',
            //         birth_date: '1995-03-15',
            //         gender: 'male',
            //         category: 'men',
            //         organization: 'СК "Спартак"',
            //         region: 'Москва',
            //         contact_phone: '+7-915-111-11-11',
            //         email: 'ivanov@mail.ru',
            //         created_at: new Date().toISOString()
            //     },
            //     {
            //         id: 2,
            //         number: 102,
            //         full_name: 'Петрова Мария Сергеевна',
            //         birth_date: '1998-07-22',
            //         gender: 'female',
            //         category: 'women',
            //         organization: 'ДЮСШ "Заря"',
            //         region: 'Московская область',
            //         contact_phone: '+7-915-222-22-22',
            //         email: 'petrova@mail.ru',
            //         created_at: new Date().toISOString()
            //     },
            //     {
            //         id: 3,
            //         number: 103,
            //         full_name: 'Сидоров Дмитрий Иванович',
            //         birth_date: '1996-11-30',
            //         gender: 'male',
            //         category: 'men',
            //         organization: 'ЦСП "Олимп"',
            //         region: 'Санкт-Петербург',
            //         contact_phone: '+7-915-333-33-33',
            //         email: 'sidorov@mail.ru',
            //         created_at: new Date().toISOString()
            //     }
            // ],
            results: [
                {
                    id: 1,
                    participant_id: 1,
                    discipline: 'running-100m',
                    result_value: 12.5,
                    result_text: '12.5 сек',
                    points: 85,
                    created_at: new Date().toISOString()
                },
                {
                    id: 2,
                    participant_id: 1,
                    discipline: 'swimming-100m',
                    result_value: 68.2,
                    result_text: '1:08.2',
                    points: 88,
                    created_at: new Date().toISOString()
                },
                {
                    id: 3,
                    participant_id: 2,
                    discipline: 'running-100m',
                    result_value: 13.8,
                    result_text: '13.8 сек',
                    points: 80,
                    created_at: new Date().toISOString()
                },
                {
                    id: 4,
                    participant_id: 2,
                    discipline: 'swimming-100m',
                    result_value: 75.1,
                    result_text: '1:15.1',
                    points: 82,
                    created_at: new Date().toISOString()
                },
                {
                    id: 5,
                    participant_id: 3,
                    discipline: 'running-100m',
                    result_value: 12.8,
                    result_text: '12.8 сек',
                    points: 84,
                    created_at: new Date().toISOString()
                },
                {
                    id: 6,
                    participant_id: 3,
                    discipline: 'swimming-100m',
                    result_value: 70.5,
                    result_text: '1:10.5',
                    points: 86,
                    created_at: new Date().toISOString()
                }
            ],
            disciplines: [
                {
                    id: 1,
                    name: 'Бег 100 м',
                    code: 'running-100m',
                    description: 'Спринтерский бег на 100 метров',
                    measurement_unit: 'секунды',
                    scoring_type: 'time'
                },
                {
                    id: 2,
                    name: 'Бег 1000 м',
                    code: 'running-1000m',
                    description: 'Бег на среднюю дистанцию 1000 метров',
                    measurement_unit: 'секунды',
                    scoring_type: 'time'
                },
                {
                    id: 3,
                    name: 'Плавание 100 м',
                    code: 'swimming-100m',
                    description: 'Плавание вольным стилем на 100 метров',
                    measurement_unit: 'секунды',
                    scoring_type: 'time'
                },
                {
                    id: 4,
                    name: 'Стрельба',
                    code: 'shooting',
                    description: 'Стрельба из пневматической винтовки',
                    measurement_unit: 'очки',
                    scoring_type: 'points'
                },
                {
                    id: 5,
                    name: 'Подтягивания',
                    code: 'pull-ups',
                    description: 'Подтягивания на перекладине',
                    measurement_unit: 'количество',
                    scoring_type: 'points'
                }
            ],
            teams: [
                {
                    id: 1,
                    name: 'Спартак',
                    organization: 'Спортивный клуб "Спартак"',
                    region: 'Москва',
                    coach_name: 'Кузнецов Андрей Сергеевич',
                    contact_phone: '+7-916-123-45-67'
                },
                {
                    id: 2,
                    name: 'Заря',
                    organization: 'ДЮСШ "Заря"',
                    region: 'Московская область',
                    coach_name: 'Петрова Ольга Михайловна',
                    contact_phone: '+7-916-234-56-78'
                }
            ],
            official_documents: [
                {
                    id: 1,
                    title: 'Правила проведения соревнований по полиатлону',
                    description: 'Утверждены конференцией международного союза полиатлона 28 октября 2016 года',
                    file_path: '/documents/rules.pdf',
                    file_type: 'PDF'
                },
                {
                    id: 2,
                    title: 'Регламент соревнований',
                    description: 'Требования к организации и проведению соревнований',
                    file_path: '/documents/regulations.pdf',
                    file_type: 'PDF'
                }
            ],
            lastId: {
                participants: 3,
                results: 6,
                disciplines: 5,
                teams: 2,
                official_documents: 2
            }
        };
    }

    // Участники
    getAllParticipants() {
        return this.data.participants || [];
    }

    addParticipant(participantData) {
        // Убеждаемся, что массив participants существует
        if (!this.data.participants) {
            this.data.participants = [];
        }

        const newId = ++this.data.lastId.participants;
        const participantNumber = 0 + this.data.participants.length + 1;

        const participant = {
            id: newId,
            number: participantNumber,
            ...participantData,
            created_at: new Date().toISOString()
        };

        this.data.participants.push(participant);
        this.saveData();
        return participant;
    }

    deleteParticipant(participantId) {
        this.data.participants = this.data.participants.filter(p => p.id !== participantId);
        // Удаляем связанные результаты
        this.data.results = this.data.results.filter(r => r.participant_id !== participantId);
        this.saveData();
    }

    getParticipant(participantId) {
        return this.data.participants.find(p => p.id === participantId);
    }

    // Результаты
    getAllResults() {
        return this.data.results || [];
    }

    addResult(resultData) {
        // Убеждаемся, что массив results существует
        if (!this.data.results) {
            this.data.results = [];
        }

        const newId = ++this.data.lastId.results;

        const result = {
            id: newId,
            ...resultData,
            created_at: new Date().toISOString()
        };

        this.data.results.push(result);
        this.saveData();
        return result;
    }

    deleteResult(resultId) {
        this.data.results = this.data.results.filter(r => r.id !== resultId);
        this.saveData();
    }

    getResultsByParticipant(participantId) {
        return (this.data.results || []).filter(r => r.participant_id === participantId);
    }

    getResultsByDiscipline(disciplineCode) {
        return (this.data.results || []).filter(r => r.discipline === disciplineCode);
    }

    // Дисциплины
    getAllDisciplines() {
        return this.data.disciplines || [];
    }

    getDiscipline(disciplineCode) {
        return (this.data.disciplines || []).find(d => d.code === disciplineCode);
    }

    // Команды
    getAllTeams() {
        return this.data.teams || [];
    }

    // Документы
    getAllDocuments() {
        return this.data.official_documents || [];
    }

    // Статистика
    getStats() {
        return {
            participants: (this.data.participants || []).length,
            results: (this.data.results || []).length,
            teams: (this.data.teams || []).length,
            disciplines: (this.data.disciplines || []).length
        };
    }

    // Расчет рейтинга
    calculateRating(categoryFilter = 'all') {
        const participants = categoryFilter === 'all'
            ? (this.data.participants || [])
            : (this.data.participants || []).filter(p => p.category === categoryFilter);

        return participants.map(participant => {
            const participantResults = (this.data.results || []).filter(r => r.participant_id === participant.id);
            const totalPoints = participantResults.reduce((sum, result) => sum + (result.points || 0), 0);

            // Получаем результаты по конкретным дисциплинам
            const runningResult = participantResults.find(r => r.discipline === 'running-100m');
            const swimmingResult = participantResults.find(r => r.discipline === 'swimming-100m');
            const shootingResult = participantResults.find(r => r.discipline === 'shooting');
            const pullupsResult = participantResults.find(r => r.discipline === 'pull-ups');

            return {
                participant: participant,
                totalPoints: totalPoints,
                results: {
                    running: runningResult,
                    swimming: swimmingResult,
                    shooting: shootingResult,
                    pullups: pullupsResult
                }
            };
        }).sort((a, b) => b.totalPoints - a.totalPoints);
    }

    // Экспорт данных
    exportData() {
        const dataStr = JSON.stringify(this.data, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `polyathlon_data_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        return true;
    }

    // Импорт данных
    importData(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importedData = JSON.parse(e.target.result);

                    // Базовая валидация структуры
                    if (!importedData.participants) {
                        importedData.participants = [];
                    }
                    if (!importedData.results) {
                        importedData.results = [];
                    }

                    this.data = importedData;
                    this.saveData();
                    resolve(true);
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = () => reject(new Error('Ошибка чтения файла'));
            reader.readAsText(file);
        });
    }

    // Настройка слушателя импорта
    setupImportListener() {
        const importFile = document.getElementById('import-file');
        if (importFile) {
            importFile.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    this.importData(file).then(() => {
                        this.showNotification('✅ Данные успешно импортированы!', 'success');
                        // Перезагружаем приложение
                        setTimeout(() => location.reload(), 1000);
                    }).catch(error => {
                        this.showNotification(`❌ Ошибка импорта: ${error.message}`, 'error');
                    });
                }
            });
        }
    }

    // Сброс к демо-данным
    resetToDemoData() {
        if (confirm('Вы уверены? Все текущие данные будут заменены демо-данными.')) {
            this.data = this.getDemoData();
            this.saveData();
            this.showNotification('✅ Данные сброшены к демо-версии!', 'success');
            setTimeout(() => location.reload(), 1000);
        }
    }

    // Показать уведомление
    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        if (notification) {
            notification.textContent = message;
            notification.className = `notification ${type}`;
            notification.style.display = 'block';

            setTimeout(() => {
                notification.style.display = 'none';
            }, 3000);
        }
    }

    // Метод для генерации полного отчета в CSV с русской кодировкой
    // Метод для генерации красивого отчета в CSV
    generateFullReport() {
        const participants = this.getAllParticipants();
        const results = this.getAllResults();
        const teams = this.getAllTeams();
        const rating = this.calculateRating('all');
        const disciplines = this.getAllDisciplines();

        let csv = '\uFEFF'; // BOM для UTF-8

        // === ЗАГОЛОВОК ОТЧЕТА ===
        csv += 'Международный Союз Полиатлона\n';
        csv += 'ОТЧЕТ главного судьи\n\n';

        csv += 'Наименование соревнования;Полиатлон\n';
        csv += 'Место проведения;Йошкар-Ола, Россия\n';
        csv += 'Даты проведения;28.10.2005\n';
        csv += `Количество команд;${teams.length}\n`;
        csv += `Общее количество участников;${participants.length}\n`;
        csv += `Мужчины;${participants.filter(p => p.gender === 'male').length}\n`;
        csv += `Женщины;${participants.filter(p => p.gender === 'female').length}\n\n\n`;

        // === ИТОГОВЫЙ ПРОТОКОЛ ===
        csv += 'ИТОГОВЫЙ ПРОТОКОЛ СОРЕВНОВАНИЙ\n';
        csv += '№;ФИО;№ участника;Организация;Категория;';

        // Добавляем названия дисциплин в заголовок
        disciplines.forEach(discipline => {
            csv += `${discipline.name};`;
        });
        csv += 'Сумма баллов;Место\n';

        // Данные участников
        rating.forEach((item, index) => {
            const participant = item.participant;

            // Основная информация
            csv += `${index + 1};`;
            csv += `"${participant.full_name}";`;
            csv += `${participant.number};`;
            csv += `"${participant.organization}";`;
            csv += `"${this.getCategoryText(participant.category)}";`;

            // Результаты по дисциплинам
            disciplines.forEach(discipline => {
                const result = item.results[this.getDisciplineField(discipline.code)];
                csv += `${result ? result.result_text : "-"};`;
            });

            // Итоговые баллы и место
            csv += `${item.totalPoints};`;
            csv += `${index + 1}\n`;
        });

        csv += '\n\n';

        // === ДЕТАЛЬНЫЕ РЕЗУЛЬТАТЫ ===
        csv += 'ДЕТАЛЬНЫЕ РЕЗУЛЬТАТЫ ПО ДИСЦИПЛИНАМ\n';
        csv += 'Дисциплина;ФИО участника;№ участника;Результат;Баллы;Дата\n';

        disciplines.forEach(discipline => {
            const disciplineResults = this.getResultsByDiscipline(discipline.code);
            disciplineResults.forEach(result => {
                const participant = this.getParticipant(result.participant_id);
                if (participant) {
                    const date = new Date(result.created_at);
                    const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;

                    csv += `"${discipline.name}";`;
                    csv += `"${participant.full_name}";`;
                    csv += `${participant.number};`;
                    csv += `${result.result_text};`;
                    csv += `${result.points || 0};`;
                    csv += `${formattedDate}\n`;
                }
            });
        });

        csv += '\n\n';

        // === СТАТИСТИКА ===
        csv += 'СТАТИСТИКА СОРЕВНОВАНИЙ\n';
        csv += 'Показатель;Значение\n';
        csv += `Общее количество участников;${participants.length}\n`;
        csv += `Мужчины;${participants.filter(p => p.gender === 'male').length}\n`;
        csv += `Женщины;${participants.filter(p => p.gender === 'female').length}\n`;
        csv += `Юниоры;${participants.filter(p => p.category === 'juniors').length}\n`;
        csv += `Ветераны;${participants.filter(p => p.category === 'veterans').length}\n`;
        csv += `Количество команд;${teams.length}\n`;
        csv += `Количество дисциплин;${disciplines.length}\n`;
        csv += `Всего результатов;${results.length}\n`;

        const avgPoints = rating.length > 0 ?
            Math.round(rating.reduce((sum, item) => sum + item.totalPoints, 0) / rating.length) : 0;
        csv += `Средний балл участника;${avgPoints}\n`;

        const bestResult = rating.length > 0 ? rating[0].totalPoints : 0;
        csv += `Лучший результат;${bestResult}\n`;

        return csv;
    }

    // Вспомогательный метод для получения поля дисциплины
    getDisciplineField(disciplineCode) {
        const fields = {
            'running-100m': 'running',
            'swimming-100m': 'swimming',
            'shooting': 'shooting',
            'pull-ups': 'pullups'
        };
        return fields[disciplineCode] || disciplineCode;
    }

    // Метод для экспорта отчета с улучшенным форматированием
    exportFullReport() {
        try {
            const csvData = this.generateFullReport();

            // Создаем Blob с правильным MIME-type
            const blob = new Blob([csvData], {
                type: 'text/csv;charset=utf-8'
            });

            // Создаем ссылку для скачивания
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Отчет_Полиатлон_Йошкар-Ола_28.10.2005.csv';
            link.style.display = 'none';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Освобождаем память
            setTimeout(() => URL.revokeObjectURL(url), 100);

            return true;
        } catch (error) {
            console.error('Ошибка при экспорте отчета:', error);
            this.showNotification('❌ Ошибка при экспорте отчета', 'error');
            return false;
        }
    }
    // Метод экспорта полного отчета
    exportFullReport() {
        try {
            const csvData = this.generateFullReport();

            // Создаем Blob с правильным MIME-type
            const blob = new Blob([csvData], {
                type: 'text/csv;charset=utf-8'
            });

            // Создаем ссылку для скачивания
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Отчет_Полиатлон_Йошкар-Ола_28.10.2005.csv';
            link.style.display = 'none';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Освобождаем память
            setTimeout(() => URL.revokeObjectURL(url), 100);

            return true;
        } catch (error) {
            console.error('Ошибка при экспорте отчета:', error);
            this.showNotification('❌ Ошибка при экспорте отчета', 'error');
            return false;
        }
    }

    // Вспомогательный метод для получения текста категории
    getCategoryText(category) {
        const categories = {
            'men': 'Мужчины',
            'women': 'Женщины',
            'juniors': 'Юниоры',
            'veterans': 'Ветераны'
        };
        return categories[category] || category;
    }
}

// Создаем глобальный экземпляр базы данных
const database = new PolyathlonDatabase();