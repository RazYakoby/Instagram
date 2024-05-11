import express, {Express, Request, Response} from "express";

const app = express();

app.listen(3000, () => {
    console.log('hi');
});

app.get('/', (req, res) => {
    res.send("hi");
})

