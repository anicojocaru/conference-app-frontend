import { gql } from '@apollo/client'
import conferenceFragment from './fragments'

export const CONFERENCE_LIST_QUERY = gql`
  query conferenceList($pager: PagerInput!, $filters: ConferenceFilterInput, $email: String!) {
    conferenceList(pager: $pager, filters: $filters) {
      values {
        ...conference
        id
        name
        startDate
        endDate
        type {
          id
          name
        }
        category {
          id
          name
        }
        location {
          id
          county {
            id
            name
          }
          country {
            id
            name
          }
          city {
            id
            name
          }
        }
        speakers {
          id
          name
          isMainSpeaker
        }
        status(userEmail: $email) {
          id
          name
        }
      }
    }
  }
  ${conferenceFragment.conference}
`
