import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'health_tracker',
});

//mengetes koneksi ke database
db.connect((err) => {
  if (err) {
    console.error('Koneksi ke database gagal:', err);
  } else {
    console.log('Terhubung ke databse');
  }
});

// Ekspor koneksi supaya bisa digunakan di file lain
export default db;
