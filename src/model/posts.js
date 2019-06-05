const fs = require('fs');
const uuid = require('uuid/v4');
//const moment = require('moment');

function list(category = '') {
    return new Promise((resolve, reject) => {
        if(!fs.existsSync('data-todolist.json')) {
            fs.writeFileSync('data-todolist.json', '');
        }
        fs.readFile('data-todolist.json', 'utf8', (err, data) => {
            if(err) reject(err);
            let posts = data ? JSON.parse(data) : {};
            if(category === 'all') resolve(posts);
            posts = posts[category];
            if(!posts) reject('No Such Category');
            resolve(posts);
        });
    });
}

function getKeys() {
    return new Promise((resolve, reject) => {
        list('all').then(data => {
            var keys = Object.keys(data);
            resolve(keys);
        }).catch(err => {
            reject(err);
        });
    });
}

function createCategory(name) {
    return new Promise((resolve, reject) => {
        list('all').then(data => {
            var posts = {...data};
            posts[name] = [];
            fs.writeFile('data-todolist.json', JSON.stringify(posts), err => {
                if(err) reject(err);
                resolve(posts);
            });
        }).catch(err => {
            reject(err);
        });
    });
}

function addTodo(category, title, description = '', deadline = '', remark = '', important = false) {
    return new Promise((resolve, reject) => {
        let todoItem = {
            Id: uuid(),
            Title: title,
            Description: description,
            Deadline: deadline,
            Remark: remark,
            CreateDate: new Date(),
            Important: important,
            Done: false
        };
        list('all').then(data => {
            var posts = {...data};
            if(!posts[category]) reject('No Such Category');
            posts[category].push(todoItem);
            fs.writeFile('data-todolist.json', JSON.stringify(posts), err => {
                if(err) reject(err);
                resolve(posts);
            });
        }).catch(err => {
            reject(err);
        });
    });
}

module.exports = {
    list,
    getKeys,
    createCategory,
    addTodo
};
