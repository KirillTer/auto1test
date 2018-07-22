import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://auto1test-8a243.firebaseio.com/'
});

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

// instance.interceptors.request...

export default instance;