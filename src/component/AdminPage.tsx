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
    onBack?: () => void
    children: any
}

const AdminPage = ( props: Props ) => {
    const { title, step, onBack, children } = props

    const navigate = useNavigate()
    
    return (
        <>
            <div className={`admin-page step-${step.toLowerCase()}`}>
                <AdminHeader title={title} step={step} onBack={onBack}/>
                {children}
                <AdminFooter />
            </div>
        </>
    )
}

export default AdminPage