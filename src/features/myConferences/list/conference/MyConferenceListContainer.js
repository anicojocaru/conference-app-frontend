import MyConferenceFilters from './MyConferenceFilters'
import conferences from 'utils/mocks/mocks'
import MyConferenceList from './MyConferenceList'
import React, { useCallback, useEffect, useState } from 'react'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text'
import { generateDefaultFilters } from 'utils/functions'
import { useHeader } from 'providers/AreasProvider'
import MyConferenceHeader from './MyConferenceHeader'
import AddButton from '@bit/totalsoft_oss.react-mui.add-button'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
 
const ConferenceListContainer = () => {

    const history = useHistory()
    const { t } = useTranslation()
    const {data, loading} = {data:conferences, loading:false}
    const [filters, setFilters] = useState(generateDefaultFilters())
    const [, setHeader] = useHeader()

    // eslint-disable-next-line no-unused-vars
    const handleFilterChange = useCallback(value => { 
        setFilters(value)
    }, [])
 
    const handleApplyFilters = useCallback((value) => {
        setFilters(value)
    }, [])

    const handleAddConference = useCallback(()=> {
            history.push('myConferences/new')
    }, [history])
 
    useEffect(() => () => setHeader(null), [setHeader])
    useEffect(() => {
        setHeader(<MyConferenceHeader actions={<AddButton title={t("General.Buttons.Add")} onClick={handleAddConference}/>} />)
    }, [setHeader, t, handleAddConference])

    if (loading) {
        return <LoadingFakeText lines={10} />
    }
    return (
    <>
    <MyConferenceFilters filters={filters} onApplyFilters ={handleApplyFilters}/>
    <MyConferenceList conferences = {data} />
    </>
    )
}
 
export default ConferenceListContainer;