import React from 'react'
import { useNavigate } from 'react-router-dom'

import { AdminStep } from '../data/Admin'
import { toHomePage, toGamePage } from '../data/Navigate'

import AdminHeader from './AdminHeader'
import AdminFooter from './AdminFooter'
import { DEBUG } from '../data/Constants'

interface Props {
    title?: string
    step: AdminStep
    children: any
}

const AdminPage = ( props: Props ) => {
    const { title, step, children } = props

    const navigate = useNavigate()
    
    return (
        <>
            <div className={`admin-page step-${step.toLowerCase()}`}>
                <AdminHeader title={title} step={step}/>
                {children}
                <AdminFooter />
            </div>
        </>
    )
}

export default AdminPage