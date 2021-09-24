import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Grid, Typography } from '@material-ui/core'
import  PermIdentityIcon from '@material-ui/icons/PermIdentity'
import RoomIcon from '@material-ui/icons/Room'


const ConferenceSubtitle=(props) =>{
    const {speaker,location}=props
    const{t}=useTranslation()

    return(
        <Grid container item lg={12}>
            <Grid item xs={1}>
                <PermIdentityIcon/>
            </Grid>
            <Grid item lg={11}>
                <Typography>{t('Conferences.Speaker')}</Typography>
                <Typography>{speaker?.name}</Typography>
            </Grid>
            <Grid item lg={1}>
                <RoomIcon />
            </Grid>
            <Grid item lg={11}>
                {`${location?.city?.name}, ${location?.county?.name}, ${location?.county?.name}`}
            </Grid>
        </Grid>
    )
}

ConferenceSubtitle.propTypes={
    speaker: PropTypes.object,
    location: PropTypes.object.isRequired
}

export default ConferenceSubtitle