import React from 'react'
import { NavLink } from 'react-router-dom'
import useSetAccount from '../hooks/useSetAccount'
import {parseAddress} from '../utils/parseAddress'
import { useSelector } from 'react-redux'

function Navbar() {
  const {account} = useSelector(state => state.accounts)
  const {connectAccount} = useSetAccount();

  return (
    <div>
        <div>
            <ul>
                <li><NavLink to="/">HOME</NavLink></li>
                <li><NavLink to="/listeditems">LISTED ITEMS</NavLink></li>
                <li><NavLink to="/myprofile">MY PROFILE</NavLink></li>
            </ul>
        </div>
        <button onClick={() => {connectAccount()}}>{account ? parseAddress(account) : "Connect Wallet"}</button>
    </div>
  )
}

export default Navbar