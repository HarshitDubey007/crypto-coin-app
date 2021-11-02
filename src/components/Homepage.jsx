import React from 'react'
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom'
// import millify from 'millify';

import { useGetCryptosQuery } from '../services/cryptoApi';
import { Cryptocurrencies, News } from '.';
const { Title } = Typography

const Homepage = () => {
    const { data, isFeatching } = useGetCryptosQuery(10)
    let globalStates = null;
    if(data){
        globalStates = data.data.stats; 
    }
    if(isFeatching) return 'Loding...'
    return (
    <>
        <Title level={2} className='heading'>Globle Crypto Stats</Title>
        {globalStates != null ? (
            <>
                <Row>
                    <Col span={12}><Statistic title='Total Cryptocurrencies' value={globalStates.total}/></Col>
                    <Col span={12}><Statistic title='Total Exchanges' value={millify(globalStates.totalExchanges)} /></Col>
                    <Col span={12}><Statistic title='Total Market Cap' value={millify(globalStates.totalMarketCap)}/></Col>
                    <Col span={12}><Statistic title='Total 24h volume' value={millify(globalStates.total24hVolume)}/></Col>
                    <Col span={12}><Statistic title='Total Market' value={millify(globalStates.totalMarkets)}/></Col>
                </Row>
            </>
        ) : ''}
        <div className="home-heading-container">
            <Title level={2} className='home-title'>Top 10 Cryptocurrencies in the world</Title>
            <Title level={3} className='sgow-more'> <Link to='/cryptocurrencies'>Show more</Link></Title>
        </div>
        <Cryptocurrencies simplified= { true } />
        <div className="home-heading-container">
            <Title level={2} className='home-title'>Letest crypto News</Title>
            <Title level={3} className='sgow-more'> <Link to='/news'>Show more</Link></Title>
        </div>
        <News simplified= { true } />
    </>
    )
}

export default Homepage
