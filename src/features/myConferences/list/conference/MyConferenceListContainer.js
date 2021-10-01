import MyConferenceFilters from './MyConferenceFilters'
import MyConferenceList from './MyConferenceList'
import React, { useCallback, useEffect, useState } from 'react'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text'
import { generateDefaultFilters } from 'utils/functions'
import { useFooter, useHeader } from 'providers/AreasProvider'
import MyConferenceHeader from './MyConferenceHeader'
import AddButton from '@bit/totalsoft_oss.react-mui.add-button'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import { useQueryWithErrorHandling } from 'hooks/errorHandling'
import { CONFERENCE_LIST_QUERY } from 'features/conference/graphql/queries/ConferenceListQuery'
import { useEmail } from 'hooks/useEmail'
import Pagination from '@bit/totalsoft_oss.react-mui.pagination'
 
const ConferenceListContainer = () => {

    const extractPager = ({ page, pageSize }) => ({ page, pageSize })
    const history = useHistory()
    const { t } = useTranslation()
    const [filters, setFilters] = useState(generateDefaultFilters())
    const [, setHeader] = useHeader()
    const[,setFooter]= useFooter()
    const [email]=useEmail()
    const [pager, setPager] = useState({ totalCount: 0, page: 0, pageSize: 5 })

    const handleRowsPerPageChange = useCallback((pageSize) => {
        setPager((state) => ({ ...state, pageSize: parseInt(pageSize) }))
    }, [])
    const handlePageChange = useCallback((page) => {
        setPager((state) => ({ ...state, page }))
    }, [])

    const { data, loading, refetch } = useQueryWithErrorHandling(CONFERENCE_LIST_QUERY, {
        variables: { 
            pager: extractPager(pager),
             filters, 
             email }, 
        onCompleted:(result)=>{
            const totalCount = result?.conferenceList?.pagination?.totalCount
            setPager(state=>({...state, totalCount}))
        }
    })
 



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
 
    useEffect(()=>{
        //did mount
        return ()=>{
            //will unmount
            setHeader(null)
            setFooter(null)
        }
    }, [])
 
    useEffect(() => {
        setHeader(<MyConferenceHeader actions={<AddButton title={t("General.Buttons.Add")} onClick={handleAddConference} />} />)
    }, [setHeader, t, handleAddConference])
 
    useEffect(()=>{
        setFooter(<Pagination
            totalCount={pager.totalCount}
            page={pager.page}
            pageSize={pager.pageSize}
            rowsPerPageOptions={[3,6,12,24,100]}
            onRowsPerPageChange={handleRowsPerPageChange}
            onPageChange={handlePageChange}
            onRefresh={refetch}/>)
    }, [pager.page, pager.totalCount, setFooter])
 
    if (loading || !data) {
        return <LoadingFakeText lines={10} />
    }
    return (
        <>
            <MyConferenceFilters filters={filters} onApplyFilters={handleApplyFilters} />
            <MyConferenceList conferences={data?.conferenceList?.values} />
        </>
    )
}
 
export default ConferenceListContainer;