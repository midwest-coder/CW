export default {
    login: (user) => {
        return fetch('https://cb-b.herokuapp.com/user/login', {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if(res.status !== 401)
            return res.json().then((data) => data)
            else
            return { isAuthenticated: false, user: {username: '', role: '', balance: ''}}
        })
    },
    getUsers: () => {
        return fetch('https://cb-b.herokuapp.com/user/getUsers').then((res) => {
            if(res.status !== 404)
            return res.json().then((data) => data)
            else
            return { isTaken: false}
        })
    },
    getMatches: () => {
        return fetch('https://cb-b.herokuapp.com/user/getMatches').then((res) => {
            if(res.status !== 404)
            return res.json().then((data) => data)
            else
            return { isTaken: false}
        })
    },
    register: (user) => {
        return fetch('https://cb-b.herokuapp.com/user/register', {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json()).then((data) => data)
    },
    updateTokens: (user, amount) => {
        return fetch(`https://cb-b.herokuapp.com/user/updateTokens/${amount}`, {
            method: "put",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json()).then((data) => {
            return data
        })
    },
    logout: () => {
        return fetch('https://cb-b.herokuapp.com/user/logout').then((res) => res.json()).then((data) => data)
    },
    isAuthenticated: () => {
        return fetch('https://cb-b.herokuapp.com/user/authenticated').then((res) => {
            if(res.status !== 401)
            return res.json().then((data) => data)
            else
            return { isAuthenticated: false, user: {username: '', role: '', balance: ''}}
        })
    },
    checkUser: (username) => {
        console.log(username)
        return fetch(`https://cb-b.herokuapp.com/user/checkUser/${username}`).then((res) => {
            if(res.status !== 404)
            return res.json().then((data) => data)
            else
            return { isTaken: false}
        })
    }
} 