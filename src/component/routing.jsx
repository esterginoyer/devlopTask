import React, { useEffect, useState } from 'react';
import NewClient from './ClientComponent';
import ClientList from './clientList';
import { actions } from '../redux/actions.js';
import { connect } from 'react-redux';
import getBanks from '../services/user.service';
import clientList from '../clientList.json';
import { Container, Row, Col } from 'react-bootstrap'
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
function Routing(props) {

    useEffect(() => {
        getBanks().then(async (response) => {
            props.setBankList(response)
            await props.saveCities(response.Data.Cities)
            props.setCityList()
        });
        props.setClientList(clientList)

    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NewClient />} />
                <Route path="/ClientList" element={<ClientList />} />
            </Routes>
        </BrowserRouter>

    )
} export default connect(
    (state) => {
        return {

        }
    },
    (dispatch) => {
        return {
            setBankList: (response) => dispatch(actions.setBankList(response)),
            setClientList: (response) => dispatch(actions.setClientList(response)),
            saveCities:(response) => dispatch(actions.saveCities(response)),
            setCityList: () => dispatch(actions.setCityList()),
        }
    }
)(Routing);

