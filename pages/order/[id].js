import Head from 'next/head'
import { useState, useContext, useEffect } from 'react'
import { DataContext } from '@store/GlobalState'
import { useRouter } from 'next/router'
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import AllScript from '../AllScript';

import OrderDetail from '@components/OrderDetail'


const DetailOrder = ({user}) => {
    const {state, dispatch} = useContext(DataContext)
    const {orders, auth} = state

    const router = useRouter()

    const [orderDetail, setOrderDetail] = useState([])

    useEffect(() => {
        const newArr = orders.filter(order => order._id === router.query.id)
        setOrderDetail(newArr)
    },[orders])
            
    if(!auth.user) return null;
    
    return(

    <>
      <MetaDash />

      <SignedHeader user={user} />

      <LeftNav user={user} />

      <div className="main_middle profile_middle">

            <div className="my-3">
                <Head>
                    <title>Order Details</title>
                </Head>

                <div>
                    <button className="btn btn-info" onClick={() => router.back()}>
                        <i className="fas fa-long-arrow-alt-left"  aria-hidden="true"></i> Go Back
                    </button>
                </div>
                
                <OrderDetail orderDetail={orderDetail} state={state} dispatch={dispatch} />
            
            </div>


      </div>

      <AllScript />
    </>
  


    )
}

export default DetailOrder