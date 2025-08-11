import { Children, createContext, useEffect, useReducer } from "react";
import { appAuth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

// context 객체 생성
const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'login': //회원가입을 하면 자동으로 로그인 처리하므로 하나로 묶음
            return {...state, user: action.payload }
        case 'logout': 
            return {...state, user: null } 
        case 'isAuthReady':
            return {...state, user: action.payload, isAuthReady: true }
        default:
            return state
    }
}



// context를 구독할 컴포넌트의 묶음 범위 설정
const AuthContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        isAuthReady: false
    })

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(appAuth, (user) => {
            dispatch({ type: 'isAuthReady', payload: user })
        })
        return unsubscribe
    }, [])

    console.log('user state : ', state);
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )

}

export {AuthContext, AuthContextProvider}