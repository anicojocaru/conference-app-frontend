import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import Autocomplete from '@bit/totalsoft_oss.react-mui.autocomplete'
import CustomTextField from '@bit/totalsoft_oss.react-mui.custom-text-field'
import { useTranslation } from 'react-i18next'
import { onTextBoxChange } from 'utils/propertyChangeAdapters'
import { emptyString } from 'utils/constants'


const MyConferenceLocation = props => {
  const { countries, counties, cities, location, dispatch } = props
  const { t } = useTranslation()
  const { name, address, country, county, city, latitude, longitude } = location
  const handleDispatch = actionType => value => dispatch({ type: actionType, payload: value })

  return (
    <Grid item container lg={12} spacing={3}>
      <Grid item container lg={12} spacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          <CustomTextField
            label={t('Location.Name')}
            fullWidth
            value={name ?? emptyString}
            onChange={onTextBoxChange(handleDispatch('locationName'))}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={6}>
          <CustomTextField
            label={t('Location.Address')}
            fullWidth
            value={address ?? emptyString}
            onChange={onTextBoxChange(handleDispatch('address'))}
          />
        </Grid>
      </Grid>
      <Grid item container lg={12} spacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          <Autocomplete
            label={t('Location.Country')}
            createdLabel='Location.Country'
            fullWidth
            isClearable
            options={countries}
            value={country}
            onChange={handleDispatch('country')}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Autocomplete
            label={t('Location.County')}
            createdLabel='Location.County'
            fullWidth
            isClearable
            options={counties}
            value={county}
            onChange={handleDispatch('county')}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Autocomplete
            label={t('Location.City')}
            createdLabel='Location.City'
            fullWidth
            isClearable
            options={cities}
            value={city}
            onChange={handleDispatch('city')}
          />
        </Grid>
      </Grid>
      <Grid item container lg={12} spacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          <CustomTextField
            label={t('Location.Latitude')}
            fullWidth
            isNumeric
            value={latitude ?? emptyString}
            onChange={handleDispatch('latitude')}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <CustomTextField
            label={t('Location.Longitude')}
            fullWidth
            isNumeric
            value={longitude ?? emptyString}
            onChange={handleDispatch('longitude')}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

MyConferenceLocation.propTypes = {
  countries: PropTypes.array.isRequired,
  counties: PropTypes.array.isRequired,
  cities: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default MyConferenceLocation
