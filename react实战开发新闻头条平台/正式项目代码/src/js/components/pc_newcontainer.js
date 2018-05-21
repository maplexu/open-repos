import React from 'react';
import {Row, Col} from 'antd';
import {Tabs, Carousel} from 'antd';
const TabPane = Tabs.TabPane;
import PCNewsBlock from './pc_news_block.js'
import PCNewsImageBlock from './pc_news_image_block.js'
import PCProduct from './pc_product.js'

export default class PCNewsContainer extends React.Component {
  render(){
    const carouselSetting = {
      autoplay: true
    };
    return (
      <div>
        <Row>
          <Col span={2}></Col>
          <Col span={20} className="container">
            <div className="leftContainer">
              <div className="carousel">
                <Carousel {...carouselSetting}>
                  <div><img src='./src/images/carousel_1.jpg' /></div>
                  <div><img src='./src/images/carousel_2.jpg' /></div>
                  <div><img src='./src/images/carousel_3.jpg' /></div>
                  <div><img src='./src/images/carousel_4.jpg' /></div>
                </Carousel>
              </div>
              {/*在这里插入PCNewsImageBlock组件使用*/}
              <PCNewsImageBlock type="guoji" count={6} width="400px" imageWidth="112px" cartTitle="国际头条" />
            </div>

            {/*PCNewsBlock组件放置在tab中*/}
            <Tabs className="tab_news">
              <TabPane tab="新闻头条" key="1">
                <PCNewsBlock count={22} type="top" width="100%" bordered="false" />
              </TabPane>
              <TabPane tab="国际" key="2">
                <PCNewsBlock count={22} type="guoji" width="100%" bordered="false" />
              </TabPane>
            </Tabs>
            <Tabs className="tab_product"> 
              <TabPane tab="ReactNews 产品" key="1">
                <PCProduct />
              </TabPane>
            </Tabs>
            <div>
              {/*在这里插入PCNewsImageBlock组件使用*/}
              <PCNewsImageBlock count={8} type="guonei" width="100%" cartTitle="国内新闻" imageWidth="132px" />
              <PCNewsImageBlock count={16} type="yule" width="100%" cartTitle="娱乐新闻" imageWidth="132px" />
            </div>
          </Col>
          <Col span={2}></Col>
        </Row>
      </div>
    )
  }
}
