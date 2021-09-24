/* eslint-disable react/jsx-no-bind */
import React from 'react'
import { Switch, Redirect } from 'react-router-dom'

import CustomRoute from '../components/routing/CustomRoute'

import Welcome from 'features/welcome/Welcome'
import Settings from 'features/settings/Settings'
import { Forbidden, NotFound } from '@bit/totalsoft_oss.react-mui.kit.core'
import MyConferenceContainer from 'features/myConferences/edit/MyConferenceContainer'
import helloWorld from 'features/helloWorld/helloWorld'
import { useEmail } from 'hooks/useEmail'
import ConferenceListContainer from 'features/conference/ConferenceListContainer'
import MyConferenceListContainer from 'features/myConferences/list/conference/MyConferenceListContainer'
export default function AppRoutes() {
  const [email]=useEmail()
  if(email) {
  return (
    <Switch>
      <CustomRoute isPrivate={false} exact path="/helloWorld" component={helloWorld} />
      <CustomRoute isPrivate={false} exact path='/welcome' component={Welcome} />
      <CustomRoute exact path='/settings' component={Settings} />
      <CustomRoute isPrivate={false} exact path='/conferences' component={ConferenceListContainer} />
      <CustomRoute isPrivate={false} exact path='/myConferences' component={MyConferenceListContainer} />
      <CustomRoute isPrivate={false} exact path='/myConferences/:id(new)' component={MyConferenceContainer} />
      <Redirect exact from='/' to='/welcome' />
      <CustomRoute isPrivate={false} exact path='/forbidden' component={Forbidden} />
      <CustomRoute isPrivate={false} render={() => <NotFound title='PageNotFound'></NotFound>} />

    </Switch>
  )
  } 
    return( 
    <Switch>
      <CustomRoute isPrivate={false} exact path='/welcome' component={Welcome} />
      <Redirect exact to='/welcome' />
    </Switch>
    )
  
}
