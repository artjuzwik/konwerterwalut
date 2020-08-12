import React from 'react';

import './warning.scss'



class Warning extends React.Component {
    constructor(props){
        super()
    }
    render(){
        let cssClasses = this.props.isError ? 'warning--wrapper active' : 'warning--wrapper'
        return(
            <div className={cssClasses}>
                <div className="warning--container">
                    <div className="warning--box">
                        <div className="warning--boxWrapper">
                            <h3>Komunikat błędu</h3>
                            <p>Nie udało się wykonać żądanej operacji, ponieważ nie znaleziono zasobu powiązanego z żądaniem.</p>
                            <button 
                                type="button" 
                                className="close" 
                                aria-label="Close"
                                onClick={() => {
                                    this.props.updateContainerState('isError', false)
                                }}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Warning