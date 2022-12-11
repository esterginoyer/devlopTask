import axios from 'axios'

export default function getBanks() {
    return fetch(`https://www.xnes.co.il/ClosedSystemMiddlewareApi/api/generalinformation`, {})
        .then((response) => {
            console.log(response.body);
            return response.json();
        })
}
export function saveClientDB(data) {
    const URL = 'http://localhost:54613/api/Client/SaveClient';
    return axios.post(URL, data).then(res => {
        console.log(res.data);
        return 'saved succsesful'
    })
}
export function saveCitiesDB(data) {
    const URL = 'http://localhost:54613/api/Client/SaveAllCities';
    axios.post(URL, data).then(res => {
        console.log(res.data);
    })

}
export function setClientListDB() {
    const URL = 'http://localhost:54613/api/Client/GetAllClient';
    return axios.get(URL).then(res => {
        console.log(res.data);
        return res.data.json();
    })
}
export function setCityListDB() {
    const URL = 'http://localhost:54613/api/Client/GetAllCity';
    return axios.get(URL).then(res => {
        console.log(res.data);
        return res.data.json();
    })
}