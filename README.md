# URL Shortener(Türkçe Açıklama Aşağıda Mevcut)

---
![image](https://github.com/user-attachments/assets/8638c456-9795-4be0-a16e-beaeab37f4b1)
---


## Project Description

This project is a **URL Shortener Web Application** that enables users to convert long URLs into shorter, more shareable links. Developed using Node.js and Express.js for the backend, it utilizes SQLite for data storage.

## Features

- **URL Shortening:** Users can input long URLs to receive shortened versions.
- **Redirection:** Accessing a shortened URL redirects the user to the original long URL.
- **Simple Interface:** Provides a clean and user-friendly web interface.

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** SQLite
- **Frontend:** HTML, CSS, JavaScript

## Installation and Running

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/metabtw/URL-Kisaltici-URL-Shortener.git
   cd URL-Kisaltici-URL-Shortener
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Start the Application:**

   ```bash
   node server.js
   ```

   The application will run by default at `http://localhost:3000`.

## Project Structure

The project directory is organized as follows:

```
URL-Kisaltici-URL-Shortener/
├── node_modules/
├── public/
│   ├── index.html
│   └── ...
├── static/
│   ├── css/
│   └── js/
├── server.js
├── package.json
├── package-lock.json
└── urls.db
```

- **`public/`**: Contains the main HTML file.
- **`static/`**: Holds CSS and JavaScript assets.
- **`server.js`**: The main server file managing routing and logic.
- **`urls.db`**: SQLite database file storing URL mappings.

---

# URL Kısaltıcı (URL Shortener)

## Proje Açıklaması

Bu proje, kullanıcıların uzun URL'leri daha kısa ve paylaşımı kolay bağlantılara dönüştürebileceği bir **URL Kısaltıcı Web Uygulaması**dır. Node.js ve Express.js kullanılarak geliştirilmiş olup, verileri SQLite veritabanında saklamaktadır.

## Özellikler

- **URL Kısaltma:** Kullanıcılar, uzun URL'leri kısaltarak daha kısa bağlantılar elde edebilir.
- **Yönlendirme:** Kısaltılmış URL'ler ziyaret edildiğinde, orijinal uzun URL'ye yönlendirme yapılır.
- **Basit Arayüz:** Kullanıcı dostu ve sade bir web arayüzü sunar.

## Kullanılan Teknolojiler

- **Backend:** Node.js, Express.js
- **Veritabanı:** SQLite
- **Frontend:** HTML, CSS, JavaScript

## Kurulum ve Çalıştırma

1. **Depoyu Klonlayın:**

   ```bash
   git clone https://github.com/metabtw/URL-Kisaltici-URL-Shortener.git
   cd URL-Kisaltici-URL-Shortener
   ```

2. **Gerekli Paketleri Yükleyin:**

   ```bash
   npm install
   ```

3. **Uygulamayı Başlatın:**

   ```bash
   node server.js
   ```

   Uygulama varsayılan olarak `http://localhost:3000` adresinde çalışacaktır.

## Proje Yapısı

Proje dosya yapısı aşağıdaki gibidir:

```
URL-Kisaltici-URL-Shortener/
├── node_modules/
├── public/
│   ├── index.html
│   └── ...
├── static/
│   ├── css/
│   └── js/
├── server.js
├── package.json
├── package-lock.json
└── urls.db
```

- **`public/`**: Ana HTML dosyasını içerir.
- **`static/`**: CSS ve JavaScript dosyalarını içerir.
- **`server.js`**: Sunucu ve yönlendirme işlemlerini yöneten ana dosya.
- **`urls.db`**: SQLite veritabanı dosyası.
