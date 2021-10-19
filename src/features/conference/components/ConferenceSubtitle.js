import React from 'react'
import PropTypes from 'prop-types'
// import { props } from 'ramda'
import { useTranslation } from 'react-i18next'
import { Grid, Typography } from '@material-ui/core'
import PermIdentityIcon from '@material-ui/icons/PermIdentity'
import RoomIcon from '@material-ui/icons/Room'

const ConferenceSubtitle = props => {
  const { speaker, location } = props
  const { t } = useTranslation()

  return (
    <Grid container spacing={2}>
      <Grid item lg={2}>
        <PermIdentityIcon />
      </Grid>
      <Grid item lg={10}>
        <Typography variant={'caption'}>{t('Conferences.Speaker')}</Typography>
        <Typography variant={'caption'}>{speaker?.name}</Typography>
      </Grid>
      <Grid item lg={2}>
        <RoomIcon />
      </Grid>
      <Grid item lg={10}>
        <Typography variant={'caption'}>{`${location?.city.name}, ${location?.county.name}, ${location?.country.name}`}</Typography>
      </Grid>
    </Grid>
  )
}

ConferenceSubtitle.propTypes = {
  speaker: PropTypes.object,
  location: PropTypes.object.isRequired
}

export default ConferenceSubtitle
