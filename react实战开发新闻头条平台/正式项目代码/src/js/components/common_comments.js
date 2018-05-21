import React from 'react';
import {Row, Col, notification} from 'antd';
import {Menu,Icon,Tabs,message,Form,Input,Button,CheckBox,Modal,Card} from 'antd';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const TabPane = Tabs.TabPane;

class CommonComments extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      comments: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addUserCollection = this.addUserCollection.bind(this);
  }
  componentDidMount(){
    let myFetchOptions = {
      method: 'GET'
    }
    //加载评论列表接口
    fetch('http://newsapi.gugujiankong.com/Handler.ashx?'
    + "action=getcomments"
    + "&uniquekey=" + this.props.uniquekey
    , myFetchOptions)
    .then(res => res.json())
    .then(json => {
      this.setState({
        comments: json
      })
    })
  }
  handleSubmit(e){
    e.preventDefault();
    const formData = this.props.form.getFieldsValue();
    let myFetchOptions = {
      method: 'GET'
    }
    //提交评论接口
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?"
    + "action=comment"
    + "&userid=" + localStorage.userid
    + "&uniquekey=" + this.props.uniquekey
    + "&comment=" +  formData.remark
    , myFetchOptions)
    .then(res => res.json())
    .then(json => {
      this.componentDidMount();
    })
  }
  addUserCollection(){
    let myFetchOptions = {
      method: 'GET'
    }
    //收藏新闻接口：
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?"
    + "action=uc"
    + "&userid=" + localStorage.userid
    + "&uniquekey=" + this.props.uniquekey
    , myFetchOptions)
    .then(res => res.json())
    .then(json => {
      notification.success({
        message: 'ReactNews提醒',
        description: '该新闻收藏成功',
        duration: 2
      });
    })
  }

  render(){
    let { getFieldProps } = this.props.form;
    const { comments } = this.state;
    const commentList = comments.length ?
      comments.map((comment, index) => (
        <Card key={index} title={comment.UserName} extra={<a href="##">发布于 {comment.datetime}</a>}>
          <p>{comment.Comments}</p>
        </Card>
      ))
      :
      '没有加载到任何的评论';
    return (
      <div className="comment">
        <Row>
          <Col span={24}>
            { commentList }
            <Form onSubmit={this.handleSubmit}>
              <FormItem label="您的评论">
                <TextArea placeholder="随便写点内容" {...getFieldProps('remark', {initialValue: ''})} />
              </FormItem>
              <Button type="primary" htmlType="submit">提交评论</Button>
              &nbsp;&nbsp;
              <Button type="primary" htmlType="button" onClick={this.addUserCollection}>收藏该新闻</Button>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}
export default CommonComments = Form.create({})(CommonComments);
