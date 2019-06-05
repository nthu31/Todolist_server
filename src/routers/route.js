const express = require('express');
const bodyParser = require('body-parser');

const postModel = require('../model/posts.js');
const checkModel = require('../model/check.js');

const router = express.Router();

router.use(bodyParser.json());

router.get('/lists', function(req, res, next) {
    if(!req.query.category) {
        const err = new Error('Someting wrong with query');
        err.status = 400;
        throw err;
    }
    postModel.list(req.query.category).then(posts => {
        res.json(posts);
    }).catch(next);
});

router.get('/keys', function(req, res, next) {
    postModel.getKeys().then(keys => {
        res.json(keys);
    }).catch(next);
});

router.post('/posts/category/:name', function(req, res, next) {
    if(!req.params.name) {
        const err = new Error('Someting wrong with name param');
        err.status = 400;
        throw err;
    }
    postModel.createCategory(req.params.name).then(posts => {
        res.json(posts);
    }).catch(next);
});

router.post('/posts/todo', function(req, res, next) {
    const {category, title, description, deadline, remark, important} = req.body;
    if(!category || !title) {
        const err = new Error('Someting wrong with body');
        err.status = 400;
        throw err;
    }
    postModel.addTodo(category, title, description, deadline, remark, important).then(posts => {
        res.json(posts);
    }).catch(next);
});

router.post('/posts/check', function(req, res, next) {
    const {category, id} = req.body;
    if(!category || !id) {
        const err = new Error('Someting wrong with body');
        err.status = 400;
        throw err;
    }
    checkModel.checkTodo(category, id).then(posts => {
        res.json(posts);
    }).catch(next);
});

router.post('/posts/important', function(req, res, next) {
    const {category, id} = req.body;
    if(!category || !id) {
        const err = new Error('Someting wrong with body');
        err.status = 400;
        throw err;
    }
    checkModel.checkImportant(category, id).then(posts => {
        res.json(posts);
    }).catch(next);
});

router.post('/posts/delete', function(req, res, next) {
    const {category, id} = req.body;
    if(!category || !id) {
        const err = new Error('Someting wrong with body');
        err.status = 400;
        throw err;
    }
    checkModel.deleteTodo(category, id).then(posts => {
        res.json(posts);
    }).catch(next);
});



module.exports = router;
