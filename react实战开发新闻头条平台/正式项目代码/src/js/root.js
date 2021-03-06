import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route, hashHistory} from 'react-router';
import 'antd/dist/antd.css';
import PCIndex from './components/pc_index.js';
import PCNewsDetails from './components/pc_news_details.js'
import PCUserCenter from './components/pc_user_center.js'
import MobileIndex from './components/mobile_index.js'
import MobileNewsDetails from './components/mobile_news_details.js'
import MobileUserCenter from './components/mobile_user_center.js'
import MediaQuery from 'react-responsive';

class Root extends React.Component {
  render(){
    return (
      <div>
        <MediaQuery query="(min-device-width: 1224px)">
          <Router history={hashHistory}>
            <Route path="/" component={PCIndex}></Route>
            <Route path="/details/:uniquekey" component={PCNewsDetails}></Route>
            <Route path="/usercenter" component={PCUserCenter}></Route>
        </Router>
        </MediaQuery>
        <MediaQuery query="(max-device-width: 1224px)">
          <Router history={hashHistory}>
            <Route path="/" component={MobileIndex}></Route>
            <Route path="/details/:uniquekey" component={MobileNewsDetails}></Route>
            <Route path="/usercenter" component={MobileUserCenter}></Route>
        </Router>
        </MediaQuery>
      </div>
    )
  }
}


ReactDOM.render(<Root/>, document.getElementById('mainContainer'));
