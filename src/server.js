const express = require('express');

const postRouter = require('./routers/route.js');

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Access-Token");
    next();
})
app.use(express.static('dist'));
app.use('/api', postRouter);
app.get('/*', (req, res) => res.redirect('/'));

const port = 7070;
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});
