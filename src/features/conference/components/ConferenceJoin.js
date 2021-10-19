import React from "react"

import { useTranslation } from "react-i18next"

import PropTypes from 'prop-types'

import { Grid } from "@material-ui/core"

import { useQueryWithErrorHandling } from "hooks/errorHandling"

import JOINED_ATTENDEES from "features/conference/gql/queries/JoinAttendees"

import { useRouteMatch } from "react-router"

import { LoadingFakeText, Typography } from '@bit/totalsoft_oss.react-mui.kit.core'

function ConferenceJoin() {

    const { t } = useTranslation()

    const match = useRouteMatch()
    const conferenceId = match.params.id
    const { data, loading } = useQueryWithErrorHandling(JOINED_ATTENDEES, {

        variables: { id: conferenceId }

    })
    if (loading) {
        return <LoadingFakeText lines={10} />
      }
    return data.joinedAttendees.map(user =>
        <Typography key={data.joinedAttendees.indexOf(user)} variant={'subtitle1'}>{user.attendeeEmail}
        </Typography>)
}
export default ConferenceJoin