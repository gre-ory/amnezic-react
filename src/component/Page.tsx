import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Game, GameStep } from '../data/Game'
import { toHomePage, toGamePage } from '../data/Navigate'

import Header from './Header'
import Footer from './Footer'

interface Props {
    children: any
}

const Page = ( props: Props ) => {
    const { children } = props
    
    return (
        <div className={`page`}>
            <Header/>
            {children}
            <Footer />
        </div>
    )
}

export default Page