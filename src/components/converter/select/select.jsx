import React from 'react';
import { Field } from 'react-final-form'
import { ChevronDown } from 'react-bootstrap-icons';

let selectOptionFlag = false

class TheSelect extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            selectOptions:null,
        }
        this.buildSelectOptions = this.buildSelectOptions.bind(this)
    }
    buildSelectOptions(values){
        let options = [],
            i = 0;
        for (let key in values){
            options.push(<option key={i} value={key}>{key}</option>)
            i++
        }
        return options
    }
    componentDidUpdate(prevProps){
        if(this.props.currencies !== prevProps.currencies){
            this.setState((state) => ({selectOptions:this.buildSelectOptions(this.props.currencies)}))
            selectOptionFlag = true
        }
    }
    componentDidMount(){
        if(selectOptionFlag){
            this.setState((state) => ({selectOptions:this.buildSelectOptions(this.props.currencies)}))
        }
    }
    render(){
        return(
            <div className="conventer__selectHolder">
                <Field
                    className="converter__select" 
                    name={this.props.name} 
                    component="select"
                    onClick={(e) => {
                        if(e.target.nodeName === "OPTION"){
                            let keyName = this.props.name;
                                this.props.updateContainerState(keyName,e.target.value)
                        }
                    }}
                >
                    {this.state.selectOptions}
                </Field>
                <div className="converter__selectHolder--iconContainer d-flex align-items-center">
                    <ChevronDown />
                </div>
            </div>
        )
    }
}

export default TheSelect