import api from "../api"
import { SET_USER, REACT_REDUX_LOCAL } from "../constants"
import { useNavigate } from 'react-router-dom'


function setUserObj(user){
    return{
        type:SET_USER,
        user
    }
}

export function logOut(){
    return dispatch =>{
        dispatch(setUserObj({}))
    }
}

/**
 * Redux异步处理
 */
export function asyncSetUserObj (data) {
    return dispatch => {
        console.log("xxxxxxxxxxxxxxxxx data", data)
        return api.login(data).then((res) => {
            console.log("res", res)
            console.log("res.data.status", res.status)
            console.log("res.data.data.token", res.data.data.token)
            if (res.status === 200) {
                console.log("res.data. === 200", res.data.data.token)
                // redux 存储变成token
                dispatch(setUserObj({
                    token:res.data.data.token,
                    nick:res.data.nick
                }))
                /**
                 * 存入到本地
                 *  Cookie
                 *  LocalStorage
                 */
                localStorage.setItem(REACT_REDUX_LOCAL, JSON.stringify({
                    token: res.data.data.token,
                    // nick: res.data.nick
                }))
            }
            return res
        })
    }
}


