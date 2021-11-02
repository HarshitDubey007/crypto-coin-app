import React from 'react'
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import { Navbar, Homepage, Exchange, Cryptocurrencies, CryptoDetails, News } from './components';
import './App.css'

const App = () => {
    return (
        <div className='app'>
            <div className='Navbar'>
                <Navbar />
            </div>
            <div className='main'>
                <Layout>
                    <div className='routes'>
                        <Switch>
                            <Route exact path="/">
                                <Homepage />
                            </Route>
                            <Route exact path="/exchange">
                                <Exchange />
                            </Route>
                            <Route exact path="/cryptocurrencies">
                                <Cryptocurrencies />
                            </Route>
                            <Route exact path="/crypto/:coinId">
                                <CryptoDetails />
                            </Route>
                            <Route exact path="/news">
                                <News />
                            </Route>
                        </Switch>
                    </div>
                </Layout>
            <div className='footer' >
                <Typography.Title lavel={5} style={{ color: 'white', text:'center '}}>
                    Cryptoverse <br />
                    All rights reversed
                </Typography.Title>
                <Space>
                    <Link to="/">Home</Link>
                    <Link to="/exchange">Exchange</Link>
                    <Link to="/news">News</Link>
                </Space>
            </div>
            </div>
        </div>
    )
}

export default App
   