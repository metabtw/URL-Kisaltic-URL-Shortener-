const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// SQLite veritabanı bağlantısı
const db = new sqlite3.Database('urls.db', (err) => {
    if (err) {
        console.error('Veritabanı bağlantı hatası:', err);
    } else {
        console.log('SQLite veritabanına bağlandı');
        initDb();
    }
});

// Veritabanı tablosunu oluştur
function initDb() {
    db.run(`
        CREATE TABLE IF NOT EXISTS urls (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            long_url TEXT NOT NULL,
            short_code TEXT NOT NULL UNIQUE,
            click_count INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
}

// Rastgele kısa kod oluşturma
function generateShortCode(length = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

// URL doğrulama
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// Ana sayfa
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// URL kısaltma
app.post('/shorten', async (req, res) => {
    try {
        console.log('Gelen istek:', req.body);

        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ error: 'URL gerekli' });
        }

        if (!isValidUrl(url)) {
            return res.status(400).json({ error: 'Geçersiz URL formatı' });
        }

        let shortCode;
        let isUnique = false;
        let attempts = 0;
        const maxAttempts = 10;

        while (!isUnique && attempts < maxAttempts) {
            shortCode = generateShortCode();
            try {
                await new Promise((resolve, reject) => {
                    db.get('SELECT id FROM urls WHERE short_code = ?', [shortCode], (err, row) => {
                        if (err) reject(err);
                        if (!row) isUnique = true;
                        resolve();
                    });
                });
            } catch (error) {
                console.error('Kod kontrolü hatası:', error);
            }
            attempts++;
        }

        if (!isUnique) {
            return res.status(500).json({ error: 'Benzersiz kod oluşturulamadı' });
        }

        await new Promise((resolve, reject) => {
            db.run('INSERT INTO urls (long_url, short_code) VALUES (?, ?)',
                [url, shortCode],
                (err) => {
                    if (err) reject(err);
                    resolve();
                });
        });

        const shortUrl = `${req.protocol}://${req.get('host')}/${shortCode}`;
        console.log('Oluşturulan kısa URL:', shortUrl);

        res.json({
            short_url: shortUrl,
            long_url: url
        });

    } catch (error) {
        console.error('Hata:', error);
        res.status(500).json({ error: 'Sunucu hatası: ' + error.message });
    }
});

// Yönlendirme
app.get('/:shortCode', (req, res) => {
    const { shortCode } = req.params;
    console.log('İstenen kısa kod:', shortCode);

    db.get('SELECT long_url FROM urls WHERE short_code = ?', [shortCode], (err, row) => {
        if (err) {
            console.error('Yönlendirme hatası:', err);
            return res.status(500).send('Sunucu hatası');
        }

        if (!row) {
            console.log('URL bulunamadı:', shortCode);
            return res.status(404).send('URL bulunamadı');
        }

        db.run('UPDATE urls SET click_count = click_count + 1 WHERE short_code = ?', [shortCode]);
        console.log('Yönlendirme:', row.long_url);
        res.redirect(row.long_url);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});

// Uygulama kapatıldığında veritabanı bağlantısını kapat
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Veritabanı kapatma hatası:', err);
        } else {
            console.log('Veritabanı bağlantısı kapatıldı');
        }
        process.exit(0);
    });
}); 