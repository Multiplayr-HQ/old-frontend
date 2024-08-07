import { createContext, useReducer, useEffect, useState } from 'react'
import reducers from './Reducers'
import { getData } from '@utils/fetchData'


export const DataContext = createContext()


export const DataProvider = ({children}) => {
    const initialState = { 
        notify: {}, auth: {}, cart: [], modal: [], orders: [], users: [], categories: [],
    }
    const [loader,setLoader]=useState(false);
    const [state, dispatch] = useReducer(reducers, initialState)
    const { cart, auth } = state

    useEffect(() => {
        const firstLogin = localStorage.getItem("firstLogin");
        console.log(firstLogin);
        if(firstLogin){
            getData('auth/accessToken').then(res => {
                if(res.err) return localStorage.removeItem("firstLogin")
                dispatch({ 
                    type: "AUTH",
                    payload: {
                        token: res.access_token,
                        user: res.user
                    }
                })
            })
        } else {
            console.log('First login is null and auth is not set.. check')
        }

        getData('categories').then(res => {
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})

            dispatch({ 
                type: "ADD_CATEGORIES",
                payload: res.categories
            })
        })
        
    },[])

    useEffect(() => {
        const ecommerce_next = JSON.parse(localStorage.getItem('ecommerce_next'))

        if(ecommerce_next) dispatch({ type: 'ADD_CART', payload: ecommerce_next })
    }, [])

    useEffect(() => {
        localStorage.setItem('ecommerce_next', JSON.stringify(cart))
    }, [cart])

    useEffect(() => {
        console.log('******** AUTH in GlobalState *************** ')
        console.log(auth)

        if(auth.token){
            getData('order', auth.token)
            .then(res => {
                if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
                
                dispatch({type: 'ADD_ORDERS', payload: res.orders})
            })

            if(auth.user.role === 'admin'){
                getData('user', auth.token)
                .then(res => {
                    if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
                
                    dispatch({type: 'ADD_USERS', payload: res.users})
                })
            }
        }else{
            dispatch({type: 'ADD_ORDERS', payload: []})
            dispatch({type: 'ADD_USERS', payload: []})
        }
    },[auth.token])

    return(
        <DataContext.Provider value={{state, dispatch,loader,setLoader}}>
            {children}
        </DataContext.Provider>
    )
}