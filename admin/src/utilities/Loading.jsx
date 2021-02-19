import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import '../css/welcome.css';

const Loading = () => {
    return (
        <div className="loadingFull">
            <FontAwesomeIcon icon={faCoffee} size="lg" pulse />
        </div>
    )
}

export default Loading
