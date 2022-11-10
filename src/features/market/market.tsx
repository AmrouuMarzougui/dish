import NavBar from '../../sharedComponents/navBar/navBar'
import { useTranslation } from 'react-i18next'
import './market.scss'
import MarketSearchBar from './components/marketSearchBar/marketSearchBar'
import MarketsVerticalPagination from './components/marketsVerticalPagination/marketsVerticalPagination'
import MapCard from './components/map/Map'
import React, { useEffect, useState } from 'react'
import SearchInput from '../../sharedComponents/searchInput/searchInput'
import { Paths } from '../../app/utils/paths'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../app/store/hooks'
import { selectDeviceWidth } from '../../app/store/storeModules/root/root'
import { NavBarRightComp } from '../mainHome/mainHome'
import { getMainHomeList } from '../../app/store/storeModules/announces/announcesService'
import { announcesEndpoints } from '../../app/utils/endpoints'
import MarketMap from './components/map/MarketMap'

const Market = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const deviceWidth = useAppSelector(selectDeviceWidth)
  const [adsList, setAdsList] = useState([])
  const [tabSelected, setTabSelected] = useState('1')
  const getMargin = () => {
    if (tabSelected === '1') return { marginLeft: '0' }
    if (tabSelected === '2') return { marginLeft: '50%' }
  }
  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' })
    getData()
  }, [])
  const getData = (data?: any) => {
    getMainHomeList({ url: announcesEndpoints.search, params: data }).then((res: any) => {
      const factor = window.location.pathname.includes('/market/reserve') ? 'RESERVATION' : window.location.pathname.includes('/market/delivery') ? 'LIVRAISON' : null
      setAdsList(factor ? res.data.filter((item: any) => item?.type === factor) : res.data)
      console.log(factor ? res.data.filter((item: any) => item?.type === factor) : res.data)
    })
  }
  const changedSearchParams = (searchParams: any) => {
    getData(searchParams)
  }


  console.log("adsList", adsList)

  return (
    <div style={{ position: 'relative' }}>
      <NavBar config={{
        isStatic: true,
        rightComponent: <NavBarRightComp disableRestaurantBtn={true} />,
        middleComponent: deviceWidth > 768 ? searchBar : undefined,
      }} />

      <div className='banner'>
        {t('MARKET.BANNER_TITLE')}
      </div>
      <div className='markets'>
        <MarketSearchBar changedSearchParams={changedSearchParams} />
        <div>
          {
            deviceWidth < 1024 && (
              <div className='marketTabsContainer'>
                <div className='tabs'>
                  <div className='cont' style={{ width: '100%' }}>
                    <span onClick={() => setTabSelected('1')}
                          className={tabSelected === '1' ? 'active tab' : 'tab'}
                    >
                      Liste
                    </span>
                    <span onClick={() => setTabSelected('2')}
                          className={tabSelected === '2' ? 'active tab' : 'tab'}
                    >
                      Carte
                    </span>
                  </div>
                </div>
                <div style={getMargin()} className='underline' />
                <div className='horizontalSeparator' />
              </div>
            )
          }
          <div className='paginationAndMapContainer'>
            {tabSelected === '1' && <MarketsVerticalPagination adsList={adsList} />}
            {
              (deviceWidth > 1023 || tabSelected === '2') && 
              
              // <MapCard adsList={adsList} /> 
              <div style={{ width: deviceWidth > 1023 ? '50%' : '100%'}}>

              <div id='googleMap' className='mapCard' >

              <MarketMap
              adsList={adsList}
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyChFyz_IVih4C8GW6YsJGMsxLqU68Dzas4&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
            </div>
            </div>
            }
          </div>
        </div>

      </div>
    </div>
  )
}

export const searchBar = (
  <div style={{ width: '50vw' }}>
    <SearchInput />
  </div>
)


export default Market
