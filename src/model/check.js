const fs = require('fs');
const postModel = require('./posts.js');

function checkTodo(category, id) {
    return new Promise((resolve, reject) => {
        postModel.list('all').then(data => {
            var posts = {...data};
            //console.log(category);
            if(!posts[category]) reject('No Such Category');
            posts[category] = posts[category].map(todoItem => {
                if(todoItem.Id == id) {
                    return Object.assign({}, todoItem, {
                        Done: true
                    });
                }
                return todoItem;
            });
            fs.writeFile('data-todolist.json', JSON.stringify(posts), err => {
                if(err) reject(err);
                resolve(posts);
            });
        }).catch(err => {
            reject(err);
        });
    });
}

function checkImportant(category, id) {
    return new Promise((resolve, reject) => {
        postModel.list('all').then(data => {
            var posts = {...data};
            if(!posts[category]) reject('No Such Category');
            posts[category] = posts[category].map(todoItem => {
                if(todoItem.Id == id) {
                    return Object.assign({}, todoItem, {
                        Important: !todoItem.Important
                    });
                }
                return todoItem;
            });
            fs.writeFile('data-todolist.json', JSON.stringify(posts), err => {
                if(err) reject(err);
                resolve(posts);
            });
        }).catch(err => {
            reject(err);
        });
    });
}

function deleteTodo(category, id) {
    return new Promise((resolve, reject) => {
        postModel.list('all').then(data => {
            var posts = {...data};
            if(!posts[category]) reject('No Such Category');
            posts[category] = posts[category].filter(todoItem => todoItem.Id != id);
            fs.writeFile('data-todolist.json', JSON.stringify(posts), err => {
                if(err) reject(err);
                resolve(posts);
            });
        }).catch(err => {
            reject(err);
        })
    });
}

module.exports = {
    checkTodo,
    checkImportant,
    deleteTodo
};
