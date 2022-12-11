import React, { useEffect, useState, useRef } from "react";
import { actions } from '../redux/actions.js';
import { connect } from 'react-redux';
import { ListGroup } from 'react-bootstrap'
import Table from 'react-bootstrap/Table';
import '../css/main.css'

function ClientListComponent(props) {

    return (
        <Table striped>
            <thead>
                <tr>
                    <th>fullName</th>
                    <th>englishName</th>
                    <th>DateOfBirth</th>
                    <th>TZ</th>
                    <th>AccountNumber</th>
                    <th>city</th>
                    <th>bank</th>
                    <th>bankBranches</th>
                </tr>
            </thead>
            <tbody>
                {props.clientList.map((client) =>
                    <tr>
                        <td>{client.fullName}</td>
                        <td>{client.englishName}</td>
                        <th>{client.DateOfBirth}</th>
                        <td>{client.TZ}</td>
                        <td>{client.AccountNumber}</td>
                        <td>{client.city}</td>
                        <td>{client.bank}</td>
                        <td>{client.bankBranches}</td>
                    </tr>
                )}
            </tbody>
        </Table>

    );

} export default connect(
    (state, ownProps) => {
        return {
            clientList: state.clientReducer.clientList
        }
    },
    (dispatch) => {
        return {

        }
    }
)(ClientListComponent);
