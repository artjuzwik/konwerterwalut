import React from 'react';
import { Field } from 'react-final-form'



class TextInput extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            numberError:false,
        }
        this.validateNumbers = this.validateNumbers.bind(this)
        this.updateValues = this.updateValues.bind(this)
        this.rerunValidation = this.rerunValidation.bind(this)
    }
    validateNumbers(value){
        let targetValue = isNaN(value.trim());

        if(targetValue === false ){
            this.setState(state =>({
                numberError:false
            }))
            return true; 
        }else{
            this.setState(state =>({
                numberError:true
            }))
            return false
        }
    }

    updateValues(val,bool){
        if(bool){
            this.props.updateContainerState('amountFrom',val)
            this.props.updateContainerState('isValidNumbers',true)
        }else{
            this.props.updateContainerState('isValidNumbers',false)
        }
    }
    rerunValidation(){
        let currentTextValue = this.props.name === 'amount' ? this.props.amountFrom : this.props.amountTo
        currentTextValue = currentTextValue + ''
        if(this.props.name === 'amount'){
            this.props.updateContainerState('isValidNumbers',this.validateNumbers(currentTextValue))
            this.updateValues(currentTextValue,this.validateNumbers(currentTextValue))
        }
    }
    componentDidMount(){
        this.rerunValidation()
    }
    render(){
        var labelClasses = 'converter__label conventer__label--borderBottom conventer__label--textInputPadding'
        return(
            <label className={this.state.numberError ? (labelClasses + ' error') : (labelClasses)}>
                <Field 
                    className={(this.props.name === 'score' && this.props.amountTo) ? 'converter__textInput wynik' : 'converter__textInput'} 
                    name={this.props.name} 
                    component={this.props.component}
                    disabled={this.props.disabled}
                    placeholder={this.props.name === 'score' ? (this.props.amountTo ? this.props.amountTo : 'wynik') : (this.props.amountFrom ? this.props.amountFrom : 'Wpisz kwotę') }
                    onKeyDown={e => {
                        console.log(e.keyCode,'kicode',e.charCode,e.target.value)
                    }}
                    onInput={(e)=>{
                        
                        this.updateValues(e.target.value,this.validateNumbers(e.target.value))    
                    }} 
                />
                <div className="converter__miniCurrency d-flex align-items-center">
                        <span>{this.props.name === 'amount' ? this.props.currencyFrom : this.props.currencyTo}</span>    
                </div>
                {
                    this.state.numberError ? 
                    (
                        <div className="converter__errorField">
                            <p>Nieprawidłowa wartość</p>
                        </div> 
                    )
                    : 
                    null 
                }
            </label>
        )
    }
}
export default TextInput