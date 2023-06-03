import React, { Fragment, useEffect, useState } from 'react'
import Loader from '../layout/Loader/loader'
import { Route } from 'react-router-dom'

const ProtectedRoute = ({component: Component, ...rest}) => {

    const [isLoading,setLoading] = useState(true)

    useEffect(async()=>{
        await new Promise((resolve)=>setTimeout(resolve,2000))
        setLoading(false)
    })

 if(isLoading){
    return <Loader/>
 }

  return (
      <Fragment>
          <Route
              {...rest}
              render={(props) => {
                  return <Component {...props} />
              }
              } />

      </Fragment>
  )
}

export default ProtectedRoute