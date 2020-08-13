import React from 'react';
import { FormSpy } from 'react-final-form'
import { ArrowRight,ArrowLeft } from 'react-bootstrap-icons';



class Switcher extends React.Component {
    constructor(props){
        super()
    }
    
    render(){
        return(
            <div 
                className="conventer__switcher d-flex align-items-center"
                onClick={() => {
                    this.props.updateContainerState('currencyFrom',this.props.currencyTo)
                    this.props.updateContainerState('currencyTo',this.props.currencyFrom)
                }}
            >
                <ArrowLeft className="arrowLeft" />
                <ArrowRight className="arrowRight" />
            </div>
        )
    }
}

export default Switcher