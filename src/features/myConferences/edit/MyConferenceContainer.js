import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { LoadingFakeText} from '@bit/totalsoft_oss.react-mui.kit.core';
import { types, categories, countries, counties, cities } from 'utils/mocks/conferenceDictionaries';
import SaveButton from '@bit/totalsoft_oss.react-mui.save-button'
import { useHeader } from 'providers/AreasProvider';
import MyConferenceHeader from '../list/conference/MyConferenceHeader';
import MyConference from './MyConference';

const MyConferenceContainer = () => {
    const { t } = useTranslation()

    const [, setHeader] = useHeader()

    useEffect(() => () => setHeader(null), [setHeader])
    useEffect(() => {
        setHeader(<MyConferenceHeader actions={<SaveButton title={t("General.Buttons.Save")} />} />)
    }, [setHeader, t])

    
    const { loading, data } = {
        loading: false,
        data: {
            typeList: types,
            categoryList: categories,
            countryList: countries,
            countyList: counties,
            cityList: cities
        }
    }

    if (loading) {
        return <LoadingFakeText lines={10} />
    }

    return <MyConference
        types={data?.typeList}
        categories={data?.categoryList}
        countries={data?.countryList}
        counties={data?.countyList}
        cities={data?.cityList}
    />
}

export default MyConferenceContainer