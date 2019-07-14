# denominasi-rupiah

A simple application for denominate Indonesian Rupiah currency fraction.

DEMO LINK : https://denominasi-rupiah.herokuapp.com/

## Installation

Untuk melakukan setup pertama kali pada project ini. Silahkan install semua dependencies dan dev-dependencies dengan menggunakan NPM (Node Package Manager):

```bash
npm install
```

## Development

Project ini dilengkapi dengan module webpack-dev-server yang telah di setting pada package.json untuk mempermudah proses Development. Untuk mengakses project dalam mode Development, silahkan gunakan NPM berikut:

```bash
npm run start:dev
```

## Production

Untuk production setup pada project ini, gunakan NPM berikut ini:

```bash
npm run build
```

Direktori output production telah di atur pada konfigurasi webpack. File yang digunakan sebagai container untuk aplikasi ini adalah index.html. File ini terletak di direktori utama, sedangkan untuk file Javascript,CSS, Images dan Static assets lainnya ada di direktori /assets

## Run Application

Untuk menjalankan aplikasi setelah setup production selesai, gunakan NPM berikut:

```bash
npm start
```

Aplikasi dapat diakses di http://localhost:3000
Server akan berjalan pada port 3000. Pastikan port 3000 tidak terpakai. Untuk mengubah port, silahkan atur di file server.js

Catatan: untuk menghentikan server, cukup gunakan keyboard shortcut CTRL+C pada terminal atau metode lainnya disesuaikan dengan platform yang digunakan.

## Disclaimer

Aplikasi ini hanya sebagai percobaan. Untuk memenuhi peryaratan proses rekrutmen karyawan baru.
Apabila ada pertanyaan, silahkan hubungi saya melalui email berikut: rifki.fahrurozi@gmail.com
