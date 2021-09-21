/* eslint-disable react/jsx-no-bind */
import React from 'react'
import { Switch, Redirect } from 'react-router-dom'

import CustomRoute from '../components/routing/CustomRoute'

import Dashboard from 'features/dashboard/Dashboard'
import Settings from 'features/settings/Settings'
import { Forbidden, NotFound } from '@bit/totalsoft_oss.react-mui.kit.core'

import helloWorld from 'features/helloWorld/helloWorld'
export default function AppRoutes() {
  return (
    <Switch>
      <CustomRoute isPrivate={false} exact path='/dashboard' component={Dashboard} />
      <CustomRoute exact path='/settings' component={Settings} />
      <CustomRoute isPrivate={false} exact path="/helloWorld" component={helloWorld} />
      <Redirect exact from='/' to='/dashboard' />
      <CustomRoute isPrivate={false} exact path='/forbidden' component={Forbidden} />
      <CustomRoute isPrivate={false} render={() => <NotFound title='PageNotFound'></NotFound>} />
   
    </Switch>
  )
}
