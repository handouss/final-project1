import {URL, USERS_PRODUCTS} from '../../app/const'
import {useSelector} from "react-redux";

async function productsCreate(data) {
    const url = URL + USERS_PRODUCTS + `/ceate`


    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',  'x-access-token':data.token
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


async function productsGetByUser(data,token) {
    const url = URL + USERS_PRODUCTS + `/findByUserId/${data}`


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

async function productsGetByWish(data,token) {
    const url = URL + USERS_PRODUCTS + `/findByWishId/${data}`


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


async function deleteProductById(data,token) {
    const url = URL + USERS_PRODUCTS + `/${data}`


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


async function updateProductById(data) {
    const url = URL + USERS_PRODUCTS

    const settings = {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',  'x-access-token':data.token
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

export {productsCreate, productsGetByUser, productsGetByWish, deleteProductById, updateProductById}



