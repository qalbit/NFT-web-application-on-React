import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createStore } from "redux";
import './App.css';
import Main from "./pages/Main";
import NoMatch from './partials/NoMatch';
import allReducres from "./reducers";
const store = createStore(
  allReducres,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);



function App() {
  


  return (
    <Provider store={store}>
      
      <Router>
        {/* <Test/> */}
        <Switch >
          
          
          <Route exact path={["/", "/submit-nft", "/upcomming-nft", "/contact-us", "/compare-nft"]}>
            <Main/> 
          </Route>
          <Route path="*">
              <NoMatch />
          </Route>

        </Switch >


      </Router>
    </Provider>
  );
}

export default App;
