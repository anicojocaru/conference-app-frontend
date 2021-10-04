import React from 'react'
import {RegularCard} from '@bit/totalsoft_oss.react-mui.regular-card'
import PropTypes from 'prop-types'
import { find } from 'ramda'
import ConferenceContent from './ConferenceContent'
import ConferenceSubtitle from './ConferenceSubtitle'

const ConferenceItem=({ conference, onAttend})  => {
    const { name, speakers, location } = conference
    const speaker=find(speaker => speaker.isMainSpeaker, speakers)

    return (<RegularCard cardTitle={name} 
                        cardSubtitle={<ConferenceSubtitle 
                                                        speaker={speaker}
                                                        location={location}/> }
                        content={<ConferenceContent
                        conference={conference} onAttend={onAttend} />}  
            />)

}
ConferenceItem.propTypes ={
    conference: PropTypes.object.isRequired,
    onAttend: PropTypes.func.isRequired
}
export default ConferenceItem