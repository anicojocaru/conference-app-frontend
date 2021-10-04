import React, { useCallback, useEffect, useState } from 'react'
import ConferenceFilters from './ConferenceFilters'
import ConferenceCodeModal from './ConferenceCodeModal'
//import conferences from 'utils/mocks/mocks'
import ConferenceList from './ConferenceList'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text'
import { useQueryWithErrorHandling } from 'hooks/errorHandling'
import { CONFERENCE_LIST_QUERY } from './graphql/queries/ConferenceListQuery'
import { useEmail } from 'hooks/useEmail'
import { useFooter } from 'providers/AreasProvider'
import Pagination from '@bit/totalsoft_oss.react-mui.pagination'
//import { result } from 'lodash'
import { useError } from 'hooks/errorHandling'
import { useMutation } from '@apollo/client'
import ATTEND_CONFERENCE_MUTATION from './graphql/mutations/AttendeeConference'
import DialogDisplay from '@bit/totalsoft_oss.react-mui.dialog-display'
import { useToast } from '@bit/totalsoft_oss.react-mui.kit.core'
import { useTranslation } from 'react-i18next'
import { emptyArray, emptyObject } from 'utils/constants'


const defaultPager = {
    totalCount: 0,
    pageSize: 3,
    page: 0
}
    const ConferenceListContainer = () => {

        const { t } = useTranslation()
        const showError = useError()
        const addToast = useToast()
        const [, setFooter] = useFooter()
        const [pager, setPager] = useState(defaultPager)
        const [filters, setFilters] = useState(emptyObject)
        const [userEmail] = useEmail()
        const [code, setCode] = useState('')
        const [open, setOpenDialog] = useState(false)
        const [suggestedConferences, setSuggestedConferences] = useState(emptyArray)
      
        const [attend] = useMutation(ATTEND_CONFERENCE_MUTATION, {
            onCompleted: data => {
              if (!data) {
                return
              }
              setCode(data?.attend?.code)
              setSuggestedConferences(data?.attend?.suggestedConferences)
              setOpenDialog(true)
              addToast(t('Conferences.SuccessMessage'), 'success')
            },
            onError: showError
          })



    const handleAttend=useCallback(conference => () => {
        const input = {
          attendeeEmail: userEmail,
          conferenceId: conference.id
        }
        attend({ variables: { input } })
      },
      [attend, userEmail]
    )

    
    
    const extractPager = ({ page, pageSize }) => ({ page, pageSize })

    const [email] = useEmail()

    useEffect(() => () => setFooter(null), [])  // eslint-disable-next-line react-hooks/exhaustive-deps

    const {data,loading, refetch}= useQueryWithErrorHandling(CONFERENCE_LIST_QUERY, 
        {variables: {pager: extractPager(pager), filters: filters, email:email} ,
        onCompleted: (result)=>{
            const totalCount = result?.conferenceList?.pagination?.totalCount
            setPager(state => ({...state, totalCount}))
        }
    })

    const handleRowsPerChange = useCallback((pageSize) => {
        setPager(state => ({ ...state, pageSize:parseInt(pageSize) }))
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
        <ConferenceFilters filters={filters} onApplyFilters={handleApplyFilters} />
        <ConferenceList conferences={data?.conferenceList?.values} onAttend={handleAttend}  />
        <DialogDisplay
          id='showQRCode'
          open={open}
          title={t('General.Congratulations')}
          content={
            <ConferenceCodeModal
              code={code}
              suggestedConferences={suggestedConferences}
              onAttend={handleAttend}
            />
          }
          
        />
      </>
    )
}


export default ConferenceListContainer