import React from 'react';
import {Tabs, Icon, Carousel} from 'antd';
const TabPane = Tabs.TabPane;
import MobileHeader from './mobile_header.js'
import MobileFooter from './mobile_footer.js'
import MobileList from './mobile_list.js'

export default class MobileIndex extends React.Component {
  render() {
    const carouselSettings = {
      autoplay: true
    }

    return (<div>
      <MobileHeader/>
      <Tabs>
        <TabPane tab="头条" key="1">
          <div className="carousel">
            <Carousel {...carouselSettings}>
              <div><img src="./src/images/carousel_1.jpg" /></div>
              <div><img src="./src/images/carousel_1.jpg" /></div>
              <div><img src="./src/images/carousel_1.jpg" /></div>
              <div><img src="./src/images/carousel_1.jpg" /></div>
            </Carousel>
          </div>
          <MobileList type="top" count={20} />
        </TabPane>
        <TabPane tab="社会" key="2">
          <MobileList type="shehui" count={20} />
        </TabPane>
        <TabPane tab="国内" key="3">
          <MobileList type="guonei" count={20} />
        </TabPane>
        <TabPane tab="国际" key="4">
          <MobileList type="guoji" count={20} />
        </TabPane>
        <TabPane tab="娱乐" key="5">
          <MobileList type="yule" count={20} />
        </TabPane>
        <TabPane tab="体育" key="6">
          <MobileList type="tiyu" count={20} />
        </TabPane>
        <TabPane tab="科技" key="7">
          <MobileList type="keji" count={20} />
        </TabPane>
        <TabPane tab="时尚" key="8">
          <MobileList type="shishang" count={20} />
        </TabPane>
      </Tabs>
      <MobileFooter/>
    </div>)
  }
}
