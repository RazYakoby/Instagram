// src/server.ts
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Middleware to log incoming requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] New request from ${req.ip}`);
    next();
});

// Multiplication route
app.post('/multiply', (req: Request, res: Response) => {
    const { num1, num2 } = req.body;
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
        return res.status(400).json({ error: 'Both numbers must be provided as numeric values.' });
    }

    const result = num1 * num2;
    res.json({ result });
});

// Hello route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript!');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


