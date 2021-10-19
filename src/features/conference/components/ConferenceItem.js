import React from 'react'
import PropTypes from 'prop-types'
import RegularCard from '@bit/totalsoft_oss.react-mui.regular-card'
import ConferenceSubtitle from './ConferenceSubtitle'
import ConferenceContent from './ConferenceContent'

const ConferenceItem = props => {
  const { conference , onAttend , onWithdraw, onJoin} = props
  const { name, speakers, location } = conference
  const speaker = speakers.find(speaker => speaker.isMainSpeaker)
  return (
    <RegularCard
      cardTitle={name}
      cardSubtitle={<ConferenceSubtitle speaker={speaker} location={location} />}
      content={<ConferenceContent conference={conference} onAttend={onAttend} onWithdraw={onWithdraw} onJoin={onJoin}/>}
    />
  )
}

ConferenceItem.propTypes = {
  conference: PropTypes.object.isRequired,
  onAttend: PropTypes.func.isRequired,
  onWithdraw: PropTypes.func.isRequired,
  onJoin:PropTypes.func.isRequired
}

export default ConferenceItem
