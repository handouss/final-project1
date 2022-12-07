import {URL, USERS_WISHS} from '../../app/const'

import {useSelector} from "react-redux";
async function wishlistCreate(data,token) {
    const url = URL + USERS_WISHS + `/ceate`


    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',
            'x-access-token':token
        },
        body: JSON.stringify(data),
    }

    try {

        const response = await fetch(url, settings);
        return response.json()

    } catch (error) {
        return console.error(error)
    }
}


async function wishlistGetByUser(data,token) {
    const url = URL + USERS_WISHS + `/findByUserId/${data}`


    const settings = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',  'x-access-token':token
        },
    }

    try {

        const response = await fetch(url, settings);
        return response.json()

    } catch (error) {
        return console.error(error)
    }
}


async function deleteWhishById(data,token) {
    const url = URL + USERS_WISHS + `/${data}`


    const settings = {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',  'x-access-token':token
        },
    }

    try {

        const response = await fetch(url, settings);
        return response.json()

    } catch (error) {
        return console.error(error)
    }
}


async function updateWhishById(data,token) {
    const url = URL + USERS_WISHS


    const settings = {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',  'x-access-token':token
        },
        body: JSON.stringify(data),
    }

    try {

        const response = await fetch(url, settings);
        return response.json()

    } catch (error) {
        return console.error(error)
    }
}

export {wishlistCreate, wishlistGetByUser, deleteWhishById, updateWhishById}



