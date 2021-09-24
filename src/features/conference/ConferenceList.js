import React from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import ConferenceItem from './ConferenceItem'

const ConferenceList = props => { 
    const {conferences} =props

        return (
        <Grid container spacing={2}>
            {conferences.map((conference) => ( 
            <Grid item lg={4} key={conference.id}>
               <ConferenceItem conference={conference} key ={conference.id} />
            </Grid>
        ))}
        </Grid>
    )
}
ConferenceList.propTypes={
    conferences: PropTypes.array
}

export default ConferenceList