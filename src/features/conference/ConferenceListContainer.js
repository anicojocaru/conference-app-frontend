import React, { useCallback, useEffect, useState } from 'react'
import ConferenceFilters from './ConferenceFilters'
//import conferences from 'utils/mocks/mocks'
import ConferenceList from './ConferenceList'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text'
import { generateDefaultFilters } from 'utils/functions'
import { useQueryWithErrorHandling } from 'hooks/errorHandling'
import { CONFERENCE_LIST_QUERY } from './graphql/queries/ConferenceListQuery'
import { useEmail } from 'hooks/useEmail'
import { useFooter } from 'providers/AreasProvider'
import Pagination from '@bit/totalsoft_oss.react-mui.pagination'
//import { result } from 'lodash'


const extractPager = ({ page, pageSize }) => ({ page, pageSize })
function ConferenceListContainer(){
    const[filters, setFilters] =useState(generateDefaultFilters())
    const [pager, setPager] = useState({totalCount:0, page:0, pageSize:3})

    const [email] = useEmail()
    const[,setFooter]=useFooter()
    useEffect(() => () => setFooter(null), [])  // eslint-disable-next-line react-hooks/exhaustive-deps

    const {data,loading, refetch}= useQueryWithErrorHandling(CONFERENCE_LIST_QUERY, 
        {variables: {pager: extractPager(pager), filters: filters, email:email} ,
        onCompleted: (result)=>{
            const totalCount = result?.conferenceList?.pagination?.totalCount
            setPager(state => ({...state, totalCount}))
        }
    })

    const handleRowsPerChange = useCallback((pageSize) => {
        setPager(state => ({ ...pager, pageSize:parseInt(pageSize) }))
    },[])

    const handleChangePage = useCallback((page) => {
        setPager(state => ({...state,page }))
    }, [])

    useEffect(() =>{
        setFooter(<Pagination
            totalCount={pager.totalCount}
            page={pager.page}
            pageSize={pager.pageSize}
            rowsPerPageOptions={[3,6,12,24,100]}
            onRowsPerPageChange={handleRowsPerChange}
            onPageChange={handleChangePage}
            onRefresh={refetch}
            />)
    }, [setFooter, refetch, handleRowsPerChange, handleChangePage, pager.totalCount, pager.pageSize, pager.page])

   
    const handleApplyFilters=useCallback(value => {setFilters(value)}, [])

    if(loading || !data) return <LoadingFakeText lines={10} />
    return (
        <>
        <ConferenceFilters filters={filters} onApplyFilters={handleApplyFilters}/>
        <ConferenceList conferences={data?.conferenceList?.values} />
        </>
    )
}

export default ConferenceListContainer