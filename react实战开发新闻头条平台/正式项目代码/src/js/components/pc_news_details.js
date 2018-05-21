import React from 'react';
import {Row, Col, BackTop} from 'antd';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCNewsImageBlock from './pc_news_image_block.js'
import CommonComments from './common_comments.js'

export default class PCNewsDetails extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      newsItem: ''
    }
    this.createMarkup = this.createMarkup.bind(this);
  }
  componentDidMount(){
    console.log(this.props.params.uniquekey);
    const myFetchOptions = {
      method: "GET"
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
      //设置详情页面的标题
      document.title = this.state.newsItem.title + "- React News | React 驱动的新闻平台";
    })
  }
  createMarkup(){
    return {__html: this.state.newsItem.pagecontent}
  }
  render(){
    return (
      <div>
        <PCHeader></PCHeader>
        <Row>
          <Col span={2}></Col>
          <Col span={14} className="container">
            <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
            <hr/>
            <CommonComments uniquekey={this.props.params.uniquekey} />
        </Col>
          <Col span={6}>
            <PCNewsImageBlock type="top" count={20} cartTitle="头条新闻" width="350px" imageWidth="150px" />
          </Col>
          <Col span={2}></Col>
        </Row>
        <PCFooter></PCFooter>
        <BackTop/>
      </div>
    )
  }
}
