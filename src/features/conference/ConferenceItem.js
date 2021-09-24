import React from 'react'
import RegularCard from '@bit/totalsoft_oss.react-mui.regular-card'
import PropTypes from 'prop-types'
import ConferenceContent from './ConferenceContent'
import ConferenceSubtitle from './ConferenceSubtitle'

const ConferenceItem=(props) => {
    const {conference}=props
    const{name, location, speakers} =conference
    const speaker=speakers.find(item => item.isMainSpeaker)

    return (<RegularCard cardTitle={name} 
                        cardSubtitle={<ConferenceSubtitle 
                                                        speaker={speaker}
                                                        location={location}/> }
                        content={<ConferenceContent
                        conference={conference}/>}  
            />)

}
ConferenceItem.propTypes ={
    conference: PropTypes.object.isRequired
}
export default ConferenceItem