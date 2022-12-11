import React, { useEffect, useState, useRef } from "react";
import { actions } from '../redux/actions.js';
import { connect } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Container, Row, Col, Navbar, Nav, FormControl, Form, Button } from 'react-bootstrap'
import '../css/main.css'

function NewClientComponent(props) {
    const [newClient, setNewClient] = useState({ fullName: "", englishName: "", DateOfBirth: Date, TZ: "", AccountNumber: "", city: '', bank: '', bankBranches: '' })
    const [validName, setValidName] = useState("");
    const [validEnglishName, setValidEnglishName] = useState("");
    const [validTZ, setValidTZ] = useState("");
    const [validAccountNumber, setValidAccountNumber] = useState("");

   
    function Validation(type, e) {
      const  HebrewChars = new RegExp("^[\u0590-\u05FF]+$");
      const  AlphaNumericChars = new RegExp("^[0-9\-]+$");
      const  EnglishChars = new RegExp("^[a-zA-Z\-]+$");
        if (type === "fullName") {
            if (e.length < 20 && HebrewChars.test(e)) {
                setNewClient({ ...newClient, fullName: e })
                setValidName('')
            }

            else { setValidName("Invalid value should be 20 and HebrewChars"); }
        }
        if (type === "englishName") {
            if (e.length < 15 && EnglishChars.test(e)) {
                setNewClient({ ...newClient, englishName: e })
                setValidEnglishName('')
            }
            else { setValidEnglishName("Invalid value should be 15 and EnglishChars"); }
        }
        if (type == "TZ") {
            if (e.length < 10 && AlphaNumericChars.test(e) ) {
                setNewClient({ ...newClient, TZ: e })
                setValidTZ('')
            }
            else { setValidTZ("Invalid value should be 9"); }
        }
        if (type == "AccountNumber" && AlphaNumericChars.test(e)) {
            if (e.length < 11) {
                setNewClient({ ...newClient, AccountNumber: e })
                setValidAccountNumber('')
            }
            else { setValidAccountNumber("Invalid value should be 10"); }
        }
    }
    function setFilterBankCode(e) {
        let BankCode = e.replace(/\D/g, '');
        props.setFilterByBankCode(BankCode)
    }

    return (
        <div className="client-container">
            <div className="new-client-container">
                <h1 style={{ marginBottom: "20px", textDecoration: "underline" }}>יצירת לקוח חדש</h1>
                <div className="new-client-inputs">
                    <div className="new-client-input">
                        <div>
                            <label>שם מלא</label>
                            <input type="text" value={newClient.fullName} onChange={(e) => Validation("fullName", e.target.value)} />
                        </div>
                        <div style={{ color: "red" }} className="labelName">{validName}</div>
                    </div>
                    <div className="new-client-input">
                        <label>שם מלא באנגלית</label>
                        <input type="text" value={newClient.englishName} onChange={(e) => Validation("englishName", e.target.value)} />
                        <div style={{ color: "red" }} className="labelName">{validEnglishName}</div>
                    </div>
                    <div className="new-client-input">
                        <label>תאריך  לידה</label><br />
                        <input type="date" value={newClient.DateOfBirth} onChange={(e) => (setNewClient({ ...newClient, DateOfBirth: e.target.value }))} />
                    </div>
                    <div className="new-client-input">
                        <label>תעודת זהות</label>
                        <input type="text" value={newClient.TZ} onChange={(e) => Validation("TZ", e.target.value)} />
                        <div className="labelTZ" style={{ color: "red" }}>{validTZ}</div>
                    </div>
                    <div className="new-client-select">
                        <label>עיר</label><br />
                        <select onChange={(e) => { setNewClient({ ...newClient, city: e.target.value }) }}>
                            {props.citiesJson.map((item, index) =>
                                index < 5 && <option key={index}>{item.Description}</option>
                            )}
                        </select>
                    </div>
                    <div className="new-client-input">
                        <div>
                            <label>מספר חשבון</label>
                            <input type="text" value={newClient.AccountNumber} onChange={(e) => Validation("AccountNumber", e.target.value)} />
                        </div>
                        <div className="AccountNumber" style={{ color: "red" }}>{validAccountNumber}</div>
                    </div>
                </div>

                <div className="new-client-select">
                    <label>שם בנק</label><br />
                    <select onChange={(e) => {
                        setNewClient({ ...newClient, bank: e.target.value }); setFilterBankCode(e.target.value)
                    }}>
                        {props.bankJson.map((item, index) =>
                            <option key={index}>{item.Code}-{item.Description}</option>
                        )}
                    </select>
                </div>
                <div className="new-client-select">
                    <label>שם סניף</label><br />
                    <select disable={props.bankCode} onChange={(e) => { setNewClient({ ...newClient, bankBranches: e.target.value }) }}>
                        {props.bankBranchesJson.map((item, index) => (
                            item.BankCode == props.bankCode &&
                            <option key={index} > {item.BankCode} - {item.BranchName}</option>
                        )
                        )}
                    </select>
                </div>
                <div className="new-client-buttons">
                    <button className="button-ok" onClick={() => { props.saveClient(newClient) }}>שמור לקוח</button>
                </div>
                <label>{props.massage}</label>
            </div>
        </div >
    )
} export default connect(
    (state) => {
        return {
            citiesJson: state.clientReducer.citiesJson,
            bankJson: state.clientReducer.bankJson,
            bankBranchesJson: state.clientReducer.bankBranchesJson,
            bankCode: state.clientReducer.bankCode,
            massage: state.clientReducer.massage,

        }
    },
    (dispatch) => {
        return {
            saveClient: (newClient) => dispatch(actions.saveClient(newClient)),
            setFilterByBankCode: (bankCode) => dispatch(actions.setFilterByBankCode(bankCode)),
        }
    }
)(NewClientComponent);
