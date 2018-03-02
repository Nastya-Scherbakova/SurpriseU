import commonStore from './store/commonStore';
import authStore from './stores/authStore';
var Promise = global.Promise = require('promise');
var superagent = require('superagent-promise')(require('superagent'), Promise);

const responseBody = res => res.body;


const tokenPlugin = req => {
    req.set("__RequestVerificationToken", commonStore.token);
};

const requests = {
    del: url => 
        superagent
            .del(url)
            .then(responseBody),
    get: url =>
        superagent
            .get(url)
            .set('Content-type', 'application/json')
            .then(responseBody),
    put: (url, body) =>
        superagent
            .put(url)
            .send(body)
            .set('Content-type', 'application/json')
            .then(responseBody),
    post: (url, body) =>
        superagent
            .post(url)
            .send(body)
            .set('Content-type', 'application/json')
            .then(responseBody),
};

const Auth = {
    current: () =>
        requests.get(''),
    login: (user) =>
        requests.post('/Account/Login', user),
    register: (user) => 
        requests.post('/Account/Register', user),
    logout: () =>
        requests.post('/Account/LogOff'),
};
const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;

const Presents = {
    all: () =>
        requests.get(`/api/Presents?limit=5&offset=3`),
     get: id =>
        requests.get(`/api/Presents/${id}`),
     add: present => 
         requests.post(`/api/Presents`, present),
     del: id =>
         requests.del(`/api/Presents/${id}`),
     edit: present =>
         requests.put(`/api/Presents/${present.id}`, present),
     search: present =>
         requests.post(`/api/Presents/Search`, present),
};

const Tag = {
    all: () =>
        requests.get(`/api/Tags`),
    get: tag =>
        requests.get(`/api/Tags/${tag.id}`),
    add: tag =>
        requests.post(`/api/Tags`, tag),
    del: id =>
        requests.del(`/api/Tags/${id}`),
    edit: tag =>
        requests.put(`/api/Tags/${tag.id}`, tag)

};

export default {
    Auth,
    Presents,
    Tag
};

