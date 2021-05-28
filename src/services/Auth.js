export default {
    login: (info) => {
        return fetch('/user/login', {
            method: "post",
            body: JSON.stringify(info),
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
    checkPassword: (userInfo) => {
        return fetch('/user/checkPassword', {
            method: "post",
            body: JSON.stringify(userInfo),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if(res.status !== 401)
                return res.json().then((data) => data)
            else
                return { info: null }
        })
    },
    initiatePassReset: (email) => {
        return fetch(`/user/initiatePassReset`, {
            method: "put",
            body: JSON.stringify(email),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json()).then((data) => {
            return data
        })
    },
    updatePassword: (info) => {
        return fetch(`/user/updatePassword`, {
            method: "put",
            body: JSON.stringify(info),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json()).then((data) => {
            return data
        })
    },
    verifyCode: (info) => {
        // console.log(info)
        return fetch(`/user/verifyCode`, {
            method: "put",
            body: JSON.stringify(info),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json()).then((data) => {
            return data
        })
    },
    updateUser: (info) => {
        return fetch(`/user/updateUser`, {
            method: "put",
            body: JSON.stringify(info),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json()).then((data) => {
            return data
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
    getUser: () => {
        return fetch('/user/getUser').then((res) => res.json().then((data) => data))
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
    updateTokens: (amount) => {
        return fetch(`/user/updateTokens`, {
            method: "put",
            body: JSON.stringify(amount),
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
    createTransaction: (info) => {
        return fetch(`/transaction/createTransaction`, {
            method: "post",
            body: JSON.stringify(info),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json()).then((data) => data)
    },
    updateTransaction: (info) => {
        return fetch(`/transaction/updateTransaction`, {
            method: "put",
            body: JSON.stringify(info),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json()).then((data) => {
            return data
        })
    },
    getTransactions: () => {
        return fetch('/transaction/getTransactions').then((res) => {
            if(res.status === 200)
                return res.json().then((data) => data)
            else
                return null
        })
    },
    checkUser: (info) => {
        return fetch(`/user/checkUser`, {
            method: "post",
            body: JSON.stringify(info),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if(res.status !== 404)
            return res.json().then((data) => data)
            else
            return { isTaken: false}
        })
    }
} 