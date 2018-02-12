import commonStore from './store/commonStore';
import superagent from 'superagent';

const handleErrors = err => {
    if (err && err.response && err.response.status === 401) {
        //authStore.logout();
    }
    return err;
};

const responseBody = res => res.body;

const tokenPlugin = req => {
    if (commonStore.token) {
        req.set('authorization', `Token ${commonStore.token }`);
    }
};

const requests = {
    del: url => 
        superagent
            .del(url)
           
            .then(responseBody),
    get: url =>
        superagent
            .get(url)
            .then(responseBody),
    put: (url, body) =>
        superagent
            .put(url, body)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
    post: (url, body) =>
        superagent
            .post(url, body)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
};

const Auth = {
    current: () =>
        requests.get('/api/user'),
    login: (email, password) =>
        requests.post('/api/users/login', { user: { email, password } }),
    register: (username, email, password) =>
        requests.post('/api/users', { user: { username, email, password } }),
    save: user =>
        requests.put('/api/user', { user })
};

const Present = {
    all: () => {
        requests.get(`/api/presents/`);
    },
     get: id =>
         requests.get(`/api/presents/${id}`)
};

export default {
    Auth,
    Present
};


 //get: url => {
    //    var xhr = new XMLHttpRequest();
    //    let data = null;
    //    xhr.open("get", url, true);
    //    xhr.onload = function () {
    //        data = JSON.parse(xhr.responseText);

    //    };
    //    xhr.send();

    //    alert(data);
    //},