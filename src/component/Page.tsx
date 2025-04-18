import React from 'react'

import Header from './GameHeader'
import Footer from './GameFooter'

interface Props {
    title?: string
    children: any
    onNext?: () => void
}

const Page = ( props: Props ) => {
    const { title, children, onNext } = props
    
    return (
        <div className={`page`}>
            <Header title={title} onNext={onNext}/>
            {children}
            <Footer />
        </div>
    )
}

export default Page