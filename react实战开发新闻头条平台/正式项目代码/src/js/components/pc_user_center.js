import React from 'react';
import {Row, Col, Tabs, Card, Upload, Modal, Icon} from 'antd';
const TabPane = Tabs.TabPane;
import PCHeader from './pc_header';
import PCFooter from './pc_footer';


export default class PCUserCenter extends React.Component {
  constructor(){
    super();
    this.state = {
      usercollection: '',
      usercomments: '',
      previewVisible: false,
      previewImage: ''
    }

    this.handleCancel  = this.handleCancel.bind(this);
  }
  componentDidMount(){
    const myFetchOptions = {
      method: 'GET'
    }
    //拉取收藏列表的接口
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?"
    + "action=getuc"
    + "&userid=" + localStorage.userid
    , myFetchOptions)
    .then(res => res.json())
    .then(json => {
      this.setState({
        usercollection: json
      })
    })
    //拉取评论列表的接口
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?"
    + "action=getusercomments"
    + "&userid=" + localStorage.userid
    , myFetchOptions)
    .then(res => res.json())
    .then(json => {
      this.setState({
        usercomments: json
      })
    })
  }
  handleCancel(){
    this.setState({
      previewVisible: false
    })
  }

  render(){
    //头像上传的配置项：
    const props = {
      action: "http://newsapi.gugujiankong.com/Handler.ashx",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      listType: 'picture-card',
      defaultFileList: [
        {
          uid: -1,
          name: 'xxx.png',
          state: 'done',
          url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
          thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'
        }
      ],
      onPreview: (file) => {
        this.setState({
          previewImage: file.url,
          previewVisible: true
        })
      }
    }
    //收藏列表
    const {usercollection} = this.state;
    const usercollectionList = usercollection.length ?
    usercollection.map((uc, index) => (
      <Card key={index} title={uc.uniquekey} extra={<a target="_blank" href={`/#/details/${uc.uniquekey}`}>查看</a>}>
        <p>{uc.Title}</p>
      </Card>
    ))
    :
    '您还没有收藏任何的新闻，快去收藏一些新闻吧。';

    //评论列表
    const { usercomments } = this.state;
    const usercommentsList = usercomments.length ?
      usercomments.map((comment, index) => (
        <Card key={index} title={`于 ${comment.datetime} 评论了 ${comment.uniquekey}`} extra={<a href={`/#/details/${comment.uniquekey}`}>查看</a>}>
          <p>{comment.Comments}</p>
        </Card>
      ))
      :
      '您还没有评论任何的文章，快去评论一些文章吧。';

    return (
      <div>
        <PCHeader/>
        <Row>
          <Col span={2}></Col>
          <Col span={20}>
            <Tabs>
              <TabPane tab="我的收藏列表" key="1">
                { usercollectionList }
              </TabPane>
              <TabPane tab="我的评论列表" key="2">
                { usercommentsList }
              </TabPane>
              <TabPane tab="头像设置" key="3">
                <div className="clearfix">
                  <Upload {...props}>
                    <Icon type="plus" />
                    <div className="ant-upload-text">上传照片</div>
                  </Upload>
                  <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="预览" src={this.state.previewImage} />
                  </Modal>
                </div>
              </TabPane>
            </Tabs>
          </Col>
          <Col span={2}></Col>
        </Row>
        <PCFooter/>
      </div>
    )
  }
}
