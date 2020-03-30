import React from 'react';
import ReactDOM from 'react-dom';
//import { BrowserRouter } from 'react-router-dom';
//import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
//import Calculator from './classcomponents/calculator.jsx';
// import SimpleComponent from './classcomponents/simplecomponent';
// import ParentComponent from './classcomponents/parentchild';
//import ParentDemoComponent from './classcomponents/parentchilddemo';
//import UncontrolledComponent from './classcomponents/uncontrolledComponent';
 import StudentComponent from './classcomponents/studentComponent/studentComponent';
// import StateHookComponent from './hook/statehook';
// import StudentHookComponent from './hook/objectHook'
// import StudentProjectComponent from './project/studentProjectComponent'
// import { Companies, Stocks } from './modals/constant';
// import CompanyComponent from './hoc/companyComponent';
// import StockComponent from './hoc/stockComponent';
// import HoC from './hoc/hocComponent';
// import ApplicationComponent from './routingdemo/applicationComponent';
import ReduxComponent from './reduxapp/ReduxComponent';
import StudentHookComponent from './projectHook/objecthooks'

// create a store using reducer
//import reducers (note that the exported combineReducer object can be directly instantiated in 'reducer')
import reducer from './reduxapp/reducers/Reducers'
import { createStore } from 'redux';
//the provider will provide 
import { Provider } from 'react-redux';


let store = createStore(reducer);

//returm the CompanyInfoComponent based on Companies data passed to the Comapny Component
//const CompanyInfoComponent = HoC(CompanyComponent,Companies);

//returm the StockInfoComponent based on Stocks data passed to the Comapny Component
//const StockInfoComponent = HoC(StockComponent,Stocks);


// render the App component using the 'render()' method
// and mount it in 'root' DOM element on index.html

//subscribe the store to the redux component using "Provide " component and pass 
//all components inside provider will have access to dispatch method() to the store to dispatch actions those will cause state in store to update . 
// ReactDOM.render(<Provider store={store}>
//     < ReduxComponent/>
//     </Provider>, document.getElementById('root'));


// ReactDOM.render(
//     <BrowserRouter>
//         <ApplicationComponent></ApplicationComponent>
//     </BrowserRouter>
//     ,document.getElementById('root')
// );
ReactDOM.render(<StudentComponent/> ,document.getElementById('root') );
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();