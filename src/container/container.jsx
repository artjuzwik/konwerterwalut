import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
  } from "react-router-dom";

  
import Converter from '../components/converter/converter.jsx';
import History from '../components/history/history.jsx'
import Warning from '../components/warning/warning.jsx'

import Routes from '../routes/routes.js'

import './container.scss'

let isHistoryFlag = window.location.pathname === Routes.history ? true : false


class Container extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            possibleCurrencies:[],
            currenciesReady:false,
            isError:false,
            currencyFrom:'',
            currencyTo:'',
            isSwitched: false,
            isValidNumbers: false,
            amountFrom:'',
            amountTo:'',
            conversions:[],
            conversionsLength:0,
            isHistoryView: isHistoryFlag,
            containerClasses: '',
            prevPath:null
        }
        this.currencySite = 'https://free.currconv.com'
        this.apiToken = '468d72de6a9278c1f1a2'
        // this.apiToken = '710afb60538faa99ed33'
        this.getPossibleCurrenciesToState = this.getPossibleCurrenciesToState.bind(this)
        this.updateContainerState = this.updateContainerState.bind(this)
        this.saveToLocalStorage = this.saveToLocalStorage.bind(this)
        this.loadFromLocalStorage = this.loadFromLocalStorage.bind(this)
        this.getLayoutClasses = this.getLayoutClasses.bind(this)
    }
    updateContainerState(key,value){
        this.setState(state => ({
            [key]:value
        }))
    }
    getPossibleCurrenciesToState(){
        fetch(`${this.currencySite}/api/v7/currencies?apiKey=${this.apiToken}`)
            .then(resp => {
                return resp.json()
            })
            .then(resp=> {
                let options = Object.keys(resp.results)
                this.setState(state => ({
                    possibleCurrencies:resp.results,
                    currenciesReady: true,
                    currencyFrom: options[0],
                    currencyTo: options[0]
                }))
            })
            .catch(err => {
                this.setState(state => ({
                    isError:true
                }))
            })
    }
    saveToLocalStorage(){
        
        let conversionsLengthCached = this.state.conversionsLength;
        let conversionsCurrent = this.state.conversions
        if(conversionsLengthCached !== conversionsCurrent.length){
            window.localStorage.setItem('conversions',JSON.stringify(conversionsCurrent))
            this.setState((state) => ({
                conversionsLength: conversionsCurrent.length
            }))
        }
    }
    loadFromLocalStorage(){
        let storageConversions = window.localStorage.conversions

        if(storageConversions){
            this.setState((state) => ({
                conversions: JSON.parse(storageConversions)
            }))
        }
    }
    getLayoutClasses(){
        if(isHistoryFlag === this.state.isHistoryView){

            isHistoryFlag = !this.state.isHistoryView 
            
            let base = 'main--blueBackground main--boxShadow ';
            
            if(this.state.isHistoryView === false && this.state.prevPath !== null){
                base = base + ' history historyHidden';
                this.setState((state) => ({
                    containerClasses: base 
                }))
                return true
            }
            if(this.state.isHistoryView === false){
                base = base;
                this.setState((state) => ({
                    containerClasses: base 
                }))
                return true
            }
            if(this.state.isHistoryView){
                base = base + ' history';
                this.setState((state) => ({
                    containerClasses: base 
                }))
                return true
            }
        }
    }
    componentDidMount(){
        this.getPossibleCurrenciesToState()
        this.loadFromLocalStorage()
        this.getLayoutClasses()
    }
    componentDidUpdate(){
        this.getLayoutClasses()
        this.saveToLocalStorage()
    }

    render(){
        
        return(
            <div className='container main d-flex align-content-center justify-content-center'>
                <div className={(this.state.containerClasses)}>
                    <Router>
                        <Switch>
                            <Route path={Routes.converter}>
                                <div className="d-flex align-content-center justify-content-center" style={{position:'relative', height: '100%'}}>
                                    <Converter 
                                        currencies={this.state.possibleCurrencies}
                                        updateContainerState={this.updateContainerState}
                                        currenciesReady={this.state.currenciesReady}
                                        currencyFrom={this.state.currencyFrom}
                                        currencyTo={this.state.currencyTo}
                                        isSwitched={this.state.isSwitched}
                                        currencySite={this.currencySite}
                                        apiToken={this.apiToken}
                                        isValidNumbers={this.state.isValidNumbers}
                                        conversions={this.state.conversions}
                                        amountFrom={this.state.amountFrom}
                                        amountTo={this.state.amountTo}
                                    />
                                    <nav className="main__nav">
                                        <ul>
                                            <li>
                                                <span 
                                                    className="mainNav__title"
                                                    onClick={() => {
                                                        let isHistoryView = !this.props.isHistoryView
                                                        this.setState((state) => ({
                                                            isHistoryView: isHistoryView,
                                                            prevPath:window.location.pathName
                                                        }))
                                                    }}
                                                >
                                                    <Link to={{pathname: Routes.history}}>Historia</Link>
                                                </span>          
                                            </li>                                    
                                        </ul>
                                    </nav>
                                </div>
                            </Route>
                            <Route path={Routes.history}>
                            <Converter 
                                currencies={this.state.possibleCurrencies}
                                updateContainerState={this.updateContainerState}
                                currenciesReady={this.state.currenciesReady}
                                currencyFrom={this.state.currencyFrom}
                                currencyTo={this.state.currencyTo}
                                isSwitched={this.state.isSwitched}
                                currencySite={this.currencySite}
                                apiToken={this.apiToken}
                                isValidNumbers={this.state.isValidNumbers}
                                conversions={this.state.conversions}
                                amountFrom={this.state.amountFrom}
                                amountTo={this.state.amountTo}
                            />
                                <History 
                                    conversions={this.state.conversions}
                                    updateContainerState={this.updateContainerState}
                                    isHistoryView={this.state.isHistoryView}/>
                            </Route>
                        </Switch>
                        <Warning 
                            isError={this.state.isError}
                            updateContainerState={this.updateContainerState}                        
                        />
                    </Router>
                </div>    
            </div>    
        )
    }
}

export default Container;
