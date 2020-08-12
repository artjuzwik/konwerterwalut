import React from 'react';
import { withRouter } from "react-router-dom";
import Routes from '../../routes/routes.js'
import { Scrollbars } from 'react-custom-scrollbars';
import { ArrowRight } from 'react-bootstrap-icons';
import './history.scss';


class History extends React.Component {
    constructor(props){
        super(props)
        this.removeHistory = this.removeHistory.bind(this)
        this.getBack = this.getBack.bind(this)
    }
    removeHistory(){
        window.localStorage.conversions = ''
        this.props.updateContainerState('conversions',[])
        this.props.updateContainerState('conversionsLength',0)
        this.forceUpdate()
    }
    getBack(){
        this.props.updateContainerState('isValidNumbers',false)
        this.props.history.push(Routes.converter)
    }

    render(){
        let conversions = this.props.conversions,
            convToDisplay = null;
        if(conversions.length){
            convToDisplay = conversions.map((elem,i) => {
                return (
                    <div key={i} className="conversions__dataRow">
                        <div className="conversions__date">{elem.date}</div>
                        <div className="conversions__before">{elem.before} {elem.from}<ArrowRight /></div>
                        <div className="conversions__after">{elem.after} {elem.to}</div>
                    </div>
                )
            })
        }else{
            convToDisplay = (
                <div className="conversions__noDataBox">
                    <p>Brak historii konwersji walut</p>
                </div>
            )
        }
        return(
            <div className="container conversions">
                <div
                    className="conversions__container">
                    <div className="conversions__table">
                        <div className="conversions__titleRow">
                            <div className="conversions__date">Data</div>
                            <div className="conversions__before">Przed konwersją</div>
                            <div className="conversions__after">Po konwersji</div>
                        </div>
                        <Scrollbars className="conversions__dataContainer">
                            {convToDisplay}
                        </Scrollbars>
                    </div>
                    <div 
                        className="conversions__removeHistory"
                        onClick={() => {
                            this.removeHistory()
                        }}>
                        <span>Wyczyść historię</span>
                    </div>    
                </div>
                <div 
                    className="conversions__backButton"
                    onClick={() => {
                        this.getBack()
                    }}>
                    <div className="conversions__wrapper">
                        <span>Historia</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(History);
