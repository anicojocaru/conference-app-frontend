import IconCard from '@bit/totalsoft_oss.react-mui.icon-card'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Search from '@material-ui/icons/Search'
import { Grid } from '@material-ui/core'
import DateTime from '@bit/totalsoft_oss.react-mui.date-time'
import Button from '@bit/totalsoft_oss.react-mui.button'
import PropTypes from 'prop-types'
import { generateDefaultFilters } from 'utils/functions'

const ConferenceFilters = props => {
  const { t } = useTranslation()
  const { filters, onApplyFilters } = props
  const [startDate, setStartDate] = useState(filters.startDate)
  const [endDate, setEndDate] = useState(filters.endDate)

  const handleApplyClick = useCallback(() => onApplyFilters({ startDate, endDate }), [onApplyFilters, endDate, startDate])
  const handleKeyPressed = useCallback(({ keyCode }) => keyCode === 13 && handleApplyClick(), [handleApplyClick])
  const handleResetClick = useCallback(() => {
    const defaultFilters = generateDefaultFilters()
    setStartDate(defaultFilters.startDate)
    setEndDate(defaultFilters.endDate)
  }, [])
  return (
    <>
      <IconCard
        icon={Search}
        iconColor='theme'
        content={
          <Grid container spacing={2} onKeyDown={handleKeyPressed}>
            <Grid item xs={12} lg={3}>
              <DateTime label={t('Conferences.Filters.StartDate')} value={startDate} onChange={setStartDate} clearable />
            </Grid>
            <Grid item xs={12} lg={3} >
              <DateTime label={t('Conferences.Filters.EndDate')} value={endDate} onChange={setEndDate} clearable/>
            </Grid>
          </Grid>
        }
      />
      <Grid container spacing={4} justifyContent='flex-end'>
        <Button size={'sm'} color={'theme'} right={true} onClick={handleResetClick}>
          {t('General.Buttons.ResetFilters')}
        </Button>
        <Button size={'sm'} color={'theme'} right={true} onClick={handleApplyClick}>
          {t('General.Buttons.ApplyFilters')}
        </Button>
      </Grid>
    </>
  )
}
ConferenceFilters.propTypes = {
  filters: PropTypes.object,
  onApplyFilters: PropTypes.func
}

export default ConferenceFilters
