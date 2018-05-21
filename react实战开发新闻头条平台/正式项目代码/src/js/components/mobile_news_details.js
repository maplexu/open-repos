import React from 'react';
import {Row, Col} from 'antd';
import MobileHeader from './mobile_header'
import MobileFooter from './mobile_footer'
import CommonComments from './common_comments.js'

export default class MobileNewsDetails extends React.Component {
  constructor(){
    super();
    this.state = {
      newsItem: ''
    }
    this.createMarkup = this.createMarkup.bind(this);
  }
  componentDidMount(){
    const myFetchOptions = {
      method: 'GET'
    }
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?"
    + "action=getnewsitem"
    + "&uniquekey=" + this.props.params.uniquekey
    , myFetchOptions)
    .then(res => res.json())
    .then(json => {
      this.setState({
        newsItem: json
      })

    })
  }
  createMarkup(){
    return {__html: this.state.newsItem.pagecontent}
  }
  render(){
    return (
      <div>
        <MobileHeader />
        <Row>
          <Col span={24}>
            <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
            <hr/>
            <div style={{padding: "0 5px"}}>
              <CommonComments uniquekey={this.props.params.uniquekey} />
            </div>
        </Col>
        </Row>
        <MobileFooter />
      </div>
    )
  }
}
