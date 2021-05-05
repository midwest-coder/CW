export default {
    login: (user) => {
        return fetch('/user/login', {
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
        return fetch('/user/getUsers').then((res) => {
            if(res.status !== 404)
            return res.json().then((data) => data)
            else
            return { isTaken: false}
        })
    },
    getMatches: () => {
        return fetch('/user/getMatches').then((res) => {
            if(res.status !== 404)
            return res.json().then((data) => data)
            else
            return { isTaken: false}
        })
    },
    register: (user) => {
        return fetch('/user/register', {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json()).then((data) => data)
    },
    updateTokens: (user, amount) => {
        return fetch(`/user/updateTokens/${amount}`, {
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
        return fetch('/user/logout').then((res) => res.json()).then((data) => data)
    },
    isAuthenticated: () => {
        return fetch('/user/authenticated').then((res) => {
            if(res.status !== 401)
            return res.json().then((data) => data)
            else
            return { isAuthenticated: false, user: {username: '', role: '', balance: ''}}
        })
    },
    createTransaction: (user,type, amount) => {
        return fetch(`/user/createTransaction/${type}/${amount}`, {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json()).then((data) => data)
    },
    updateTransaction: (user, id, hash, status) => {
        return fetch(`/user/updateTransaction/${id}/${hash}/${status}`, {
            method: "put",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json()).then((data) => {
            return data
        })
    },
    getTransactions: () => {
        return fetch('/user/getTransaction').then((res) => {
            if(res.status === 200)
                return res.json().then((data) => data)
            else
                return null
        })
    },
    checkUser: (username) => {
        return fetch(`/user/checkUser/${username}`).then((res) => {
            if(res.status !== 404)
            return res.json().then((data) => data)
            else
            return { isTaken: false}
        })
    }
} 