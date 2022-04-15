import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Game, GameStep } from '../data/Game'
import { toHomePage, toGamePage } from '../data/Navigate'

import Header from './Header'
import Footer from './Footer'

interface Props {
    children: any
    onNext?: () => void
}

const Page = ( props: Props ) => {
    const { children, onNext } = props
    
    return (
        <div className={`page`}>
            <Header onNext={onNext}/>
            {children}
            <Footer />
        </div>
    )
}

export default Page