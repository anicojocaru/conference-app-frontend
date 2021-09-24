import React from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import MyConferenceItem from './MyConferenceItem'


const MyConferenceList = props => { 
    const {conferences} =props
   

        return (
        <Grid container spacing={2}>
            {conferences.map((conference) => ( 
            <Grid item lg={4} key={conference.id}>
               <MyConferenceItem conference={conference} key ={conference.id} />
            </Grid>
        ))}
        </Grid>
    )
}
MyConferenceList.propTypes={
    conferences: PropTypes.array
}

export default MyConferenceList