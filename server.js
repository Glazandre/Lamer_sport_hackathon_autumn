// Простой сервер для работы с файлами
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;
const DATA_FILE = 'data.json';

// Создаем data.json если его нет
if (!fs.existsSync(DATA_FILE)) {
    const demoData = {
        participants: [],
        results: [],
        disciplines: [
            {
                id: 1,
                name: 'Бег 100 м',
                code: 'running-100m',
                description: 'Спринтерский бег на 100 метров',
                measurement_unit: 'секунды',
                scoring_type: 'time'
            },
            // ... остальные дисциплины
        ],
        teams: [],
        official_documents: [],
        lastId: {
            participants: 0,
            results: 0,
            disciplines: 5,
            teams: 0,
            official_documents: 0
        }
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(demoData, null, 2));
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Обслуживание статических файлов
    if (pathname === '/' || pathname === '/index.html') {
        serveStaticFile('index.html', 'text/html', res);
    } else if (pathname === '/style.css') {
        serveStaticFile('style.css', 'text/css', res);
    } else if (pathname === '/app.js') {
        serveStaticFile('app.js', 'application/javascript', res);
    } else if (pathname === '/database.js') {
        serveStaticFile('database.js', 'application/javascript', res);
    }
    // API endpoints
    else if (pathname === '/api/data' && req.method === 'GET') {
        // Получить все данные
        fs.readFile(DATA_FILE, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: 'Ошибка чтения файла' }));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        });
    } else if (pathname === '/api/data' && req.method === 'POST') {
        // Сохранить данные
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), (err) => {
                    if (err) {
                        res.writeHead(500);
                        res.end(JSON.stringify({ error: 'Ошибка сохранения файла' }));
                        return;
                    }
                    res.writeHead(200);
                    res.end(JSON.stringify({ success: true }));
                });
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Неверный JSON' }));
            }
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

function serveStaticFile(filename, contentType, res) {
    fs.readFile(filename, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('File not found');
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
}

server.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
    console.log(`📁 Данные сохраняются в файл: ${DATA_FILE}`);
});