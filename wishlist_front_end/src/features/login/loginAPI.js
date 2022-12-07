import {URL, USERS_PATHS} from '../../app/const'

async function userLogin(data) {
    const url = URL + USERS_PATHS + `/login`

    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',
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




export {userLogin} 