const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodejs"
});

db.connect((err) => {
    console.error(err);
    if (!err) {
        console.log("connected");
    }
});

app.post('/register', (req, res) => {
    const { Username, password } = req.body;
    const checkUser = 'SELECT * FROM login WHERE LOWER(Username) = LOWER(?)'; // Case-insensitive check

    db.query(checkUser, [Username], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.json({ success: false, message: "User already exists" });
        } else {
            const createUser = 'INSERT INTO login (Username, password) VALUES (?, ?)';

            db.query(createUser, [Username, password], (err, result) => {
                if (err) {
                    throw err;
                    res.json({ success: false, data: 'Registration failed' });
                }
                return res.status(200).json({ success: true, data: 'User created successfully' });
            });
        }
    });
});

app.post('/login', (req, res) => {
    const { Username, password } = req.body;
    const query = 'SELECT * FROM login WHERE LOWER(Username) = LOWER(?)';

    db.query(query, [Username], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }

        if (!results || results.length === 0) {
            return res.status(400).json({ success: false, message: 'No account with this username found.' });
        } else {
            if (results[0].password === password) {
                return res.status(200).json({
                    success: true,
                    message: 'Login successful',
                    userInfo: {
                        username: Username
                    }
                });
            } else {
                return res.status(400).json({ success: false, message: 'Invalid Password.' });
            }
        }
    });
});


app.listen(8080, () => {
    console.log('App is listening on port 8080');
});
