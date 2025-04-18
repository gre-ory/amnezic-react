import React from 'react'

import { AdminStep } from '../data/Admin'

import AdminHeader from './AdminHeader'
import AdminFooter from './AdminFooter'

interface Props {
    title?: string
    step: AdminStep
    onBack?: () => void
    children: any
}

const AdminPage = ( props: Props ) => {
    const { title, step, onBack, children } = props
    
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