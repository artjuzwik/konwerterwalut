import React from 'react';
import TextInput from './textInput/textInput.jsx'
import TheSelect from './select/select.jsx'
import Switcher from './switcher/switcher.jsx'
import { Form } from 'react-final-form';
import { withRouter } from "react-router-dom";
import Routes from '../../routes/routes.js'
import './converter.scss'

let previousPath = null

class Converter extends React.Component {
    constructor(){
        super()
        this.state = {
            exchangeRate:false,
        }

        this.performCounting = this.performCounting.bind(this)
    }

    performCounting(e){
        e.preventDefault();

        let currencyFrom = this.props.currencyFrom,
                currencyTo = this.props.currencyTo;

        let getExchangeRate = () => {
            return fetch(`${this.props.currencySite}/api/v7/convert?q=${currencyFrom}_${currencyTo}&compact=ultra&apiKey=${this.props.apiToken}`)
                .then((resp) => {
                    return resp.json()
                })
                .then((resp) => {
                    if(typeof resp.error === 'string'){
                        this.props.updateContainerState('isError',true)
                        return false
                    }
                    let key = Object.keys(resp)[0]
                    return resp[key]
                })
                .catch(err => {
                    this.props.updateContainerState('isError',true)
                    return false
                })
        }
        let getDate = () => {
            let date = new Date(),
                day = date.getDate(),
                month = date.getUTCMonth() + 1,
                year = date.getUTCFullYear();

                day = day < 10 ? day = '0' + day : day;
                month = month < 10 ? month = '0' + month : day;

                return `${day}.${month}.${year}`
        }

        if(this.props.isValidNumbers){
            getExchangeRate()
                .then(resp => {
                    if(resp === false){
                        return false
                    }
                    let conversions = [...this.props.conversions],
                        actualAmount = parseFloat(this.props.amountFrom).toFixed(2),
                        sum = parseFloat((actualAmount * resp)).toFixed(2),
                        conversionToAdd = {
                            from: currencyFrom,
                            to: currencyTo,
                            date: getDate(),
                            before: actualAmount,
                            after: sum
                        };
                    conversions.push(conversionToAdd) 
                    this.props.updateContainerState('conversions',conversions)
                    this.props.updateContainerState('conversionsLength',conversions.length)
                    this.props.updateContainerState('amountTo',sum)
                    this.props.history.push(Routes.history)
                })
        }else{
            return false;
        }
    }
    componentDidMount(){
        this.props.updateContainerState('prevPath',window.location.pathname)
        this.props.updateContainerState('isHistoryView', window.location.pathname === Routes.history ? true : false)
    }
    
    render(){
        let buttonClasses = 'btn converter_btn';
        return(
            <div className="converter d-flex align-content-center justify-content-center">
                    <Form 
                        onSubmit={(e) => {this.performCounting(e)}}
                        initialValues={{ currencyFrom: this.props.currencyFrom, currencyTo: this.props.currencyTo,amount: this.props.amountFrom }}
                        render={({ handleSubmit, form, values, props }) => (
                            <form 
                                onSubmit={(e) => {this.performCounting(e)}}
                                className="converter__form d-flex flex-column"
                                >
                                <h1 className="converter__title">Konwerter Walut</h1>
                                <TextInput
                                    name={'amount'}
                                    component={'input'}
                                    currencyFrom={this.props.currencyFrom}
                                    amountFrom={this.props.amountFrom}
                                    updateContainerState={this.props.updateContainerState}
                                />
                                <TextInput
                                    name={'score'}
                                    component={'input'}
                                    placeholder={'wynik'}
                                    disabled={true}
                                    currencyTo={this.props.currencyTo}
                                    amountTo={this.props.amountTo}
                                    updateContainerState={this.props.updateContainerState}
                                />
                                <div className="conventer__selectContainer d-flex align-items-center justify-content-between">
                                    <TheSelect 
                                        currencies={this.props.currencies} 
                                        name={'currencyFrom'}
                                        updateContainerState={this.props.updateContainerState}
                                        currencyFrom={this.props.currencyFrom}
                                        currencyTo={this.props.currencyTo}
                                    />    
                                    <Switcher 
                                        updateContainerState={this.props.updateContainerState}
                                        currencyFrom={this.props.currencyFrom}
                                        currencyTo={this.props.currencyTo}/>
                                    <TheSelect 
                                        currencies={this.props.currencies} 
                                        name={'currencyTo'}
                                        updateContainerState={this.props.updateContainerState}
                                        currenciesReady={this.props.currenciesReady}
                                        currencyTo={this.props.currencyTo}
                                    />   
                                </div>
                                <button 
                                    type="submit"
                                    className={this.props.isValidNumbers ? buttonClasses : (buttonClasses + ' unavailable')}
                                >Konwertuj
                                    </button>
                            </form>
                        )}
                    />
            </div>
        )
    }
}
export default withRouter(Converter);
