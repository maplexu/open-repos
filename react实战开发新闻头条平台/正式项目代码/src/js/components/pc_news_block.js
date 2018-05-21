/*
  * @description：新闻列表组件
  * @author: maplexu
  * @props：
    1. type: 请求的新闻的类型
    2. account: 请求的新闻的数量


*/

import React from 'react';
import {Card} from 'antd';
import {Router, Route, Link , browserHistory, hashHistory } from 'react-router';

export default class PCNewsBlock extends React.Component {
  constructor(){
    super();
    this.state = {
      news: ''        //获取到的新闻列表数据
    }
  }
  componentWillMount(){
    const myFetchOptions = {
      method: 'GET'
    }
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?"
    + "action=getnews"
    + "&type=" + this.props.type
    + "&count=" + this.props.count
    , myFetchOptions)
    .then(res => res.json())
    .then(json => {
      this.setState({
        news: json
      })
    })
  }
  render(){
    const {news} = this.state;
    const newsList = news.length ?
      news.map((newsItem, index) => (
        <li key={index}>
          <Link to={`details/${newsItem.uniquekey}`} target="_blank">
            {newsItem.title}
          </Link>
        </li>
      ))
      :
      '没有加载到任何的新闻';

    return (
      <div className="topNewsList">
        <Card hoverable= {true}>
          <ul>
            {newsList}
          </ul>
        </Card>
      </div>
    )
  }
}
