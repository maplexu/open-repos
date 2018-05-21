import React from 'react'
import {Row, Col} from 'antd';
import {
  Menu,
  Icon,
  Tabs,
  message,        //message是信息弹窗函数
  Form,
  Input,
  Button,
  CheckBox,
  Modal
} from 'antd';
const MenuItem = Menu.Item;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

import {Router, Route, Link, browserHistory, hashHistory} from 'react-router';

class PCHeader extends React.Component {
  constructor(){
    super();
    this.state = {
      current: 'top',
      hasLogined: false,
      userNickName: '',
      userid: 0,
      modalVisible: false,
      action: 'login'
    }
    this.handleClick = this.handleClick.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeTabAction = this.changeTabAction.bind(this);
    this.logout = this.logout.bind(this);
  }
  //通过钩子函数在组件初始化时从localStorage中获取到用户的状态：
  componentWillMount(){
    if(localStorage.userid !== ''){
      this.setState({
        hasLogined: true,
        userid: localStorage.userid,
        userNickName: localStorage.userNickName
      })
    }
  }

  handleClick(e){
    this.setState({
      current: e.key
    })
    if(e.key == "register"){
      this.setModalVisible(true);
    }
  }
  setModalVisible(value){
    this.setState({
      modalVisible: value
    })
  }
  handleSubmit(e){
    e.preventDefault();         //阻止默认事件

    //页面向API调用接口
    const formData = this.props.form.getFieldsValue();    //获取该form中的参数值
    console.log(formData);

    //使用fetch处理数据请求：
    const myFetchOptions = {
      method: 'GET'
    }
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?"
      + "action=" + this.state.action
      + "&username=" + formData.userName
      + "&password=" + formData.password
      + "&r_userName=" + formData.r_userName
      + "&r_password=" + formData.r_password
      + "&r_confirmPassword=" + formData.r_confirmPassword, myFetchOptions)
    .then(res => res.json())
    .then(json => {
      //判断接口的操作类型（登录？注册？）
      if(this.state.action == 'login'){
        this.setState({
          userNickName: json.NickUserName,
          userid: json.UserId,
          hasLogined: true
        });
        localStorage.userid = json.UserId;
        localStorage.userNickName = json.NickUserName;
        message.success('登录成功！');
      }else{
        message.success('注册成功！');
      }
      this.setModalVisible(false);
    })
  }
  logout(){
    localStorage.userid = '';
    localStorage.userNickName = '';
    this.setState({hasLogined: false});
    message.success('退出登录成功！');
  }
  changeTabAction(key){
    //自定义的函数，自动传入key值作为参数
    console.log(key)
    if(key == 1){
      this.setState({action: 'login'});
    }else if(key == 2){
      this.setState({action: 'register'});
    }
  }

  render(){
    let { getFieldProps } = this.props.form;
    //用户位置显示的内容（根据是否登录来显示内容）
    const userShow = this.state.hasLogined ?
      <MenuItem key="logout" className="register">
        <Button type="primary" htmlType="button">{this.state.userNickName}</Button>
        &nbsp;&nbsp;
        <Link target="_blank" to="/usercenter">
          <Button type="dashed" htmlType="button">个人中心</Button>
        </Link>
        &nbsp;&nbsp;
        <Button type="ghost" htmlType="button" onClick={this.logout}>退出</Button>
      </MenuItem>
      :
      <MenuItem key="register" className="register">
        <Icon type="appstore" /> 注册/登录
      </MenuItem>

    return (
      <header>
        <Row>
          <Col span={2}></Col>
          <Col span={4}>
            <a href="#" className="logo">
              <img src="./src/images/logo.png" alt="logo"/>
              <span>ReactNews</span>
            </a>
          </Col>
          <Col span={16}>
            <Menu
              mode="horizontal"
              selectedKeys={[this.state.current]}
              onClick={this.handleClick}
            >
              <MenuItem key="top">
                <Icon type="appstore" />头条
              </MenuItem>
              <MenuItem key="shehui">
                <Icon type="appstore" />社会
              </MenuItem>
              <MenuItem key="guonei">
                <Icon type="appstore" />国内
              </MenuItem>
              <MenuItem key="guoji">
                <Icon type="appstore" />国际
              </MenuItem>
              <MenuItem key="yule">
                <Icon type="appstore" />娱乐
              </MenuItem>
              <MenuItem key="tiyu">
                <Icon type="appstore" />体育
              </MenuItem>
              <MenuItem key="keji">
                <Icon type="appstore" />科技
              </MenuItem>
              <MenuItem key="shishang">
                <Icon type="appstore" />时尚
              </MenuItem>
              {userShow}
            </Menu>

            {/*下面的内容为注册的modal弹窗，因为是position:ficed布局的，因此可以放在任何的地方*/}
            <Modal
              title="用户中心"
              wrapClassName="vertical-center-modal"
              visible={this.state.modalVisible}
              onCancel={()=>this.setModalVisible(false)}
              onOk={()=>this.setModalVisible(false)}
              okText="关闭"
            >
              <Tabs type="card" onChange={this.changeTabAction}>
                <TabPane tab="登录" key="1">
                  <Form onSubmit={this.handleSubmit}>
                    <FormItem label="账户">
                      <Input placeholder="请输入您的账号" {...getFieldProps('userName')} />
                    </FormItem>
                    <FormItem label="密码">
                      <Input type="password" placeholder="请输入您的密码" {...getFieldProps('password')} />
                    </FormItem>
                    <Button type="primary" htmlType="submit">登录</Button>
                  </Form>
                </TabPane>
                <TabPane tab="注册" key="2">
                  <Form onSubmit={this.handleSubmit}>
                    <FormItem label="账户">
                      <Input placeholder="请输入您的账号" {...getFieldProps('r_userName')} />
                    </FormItem>
                    <FormItem label="密码">
                      <Input type="password" placeholder="请输入您的密码"  {...getFieldProps('r_password')}/>
                    </FormItem>
                    <FormItem label="确认密码">
                      <Input type="password" placeholder="请再次输入您的密码" {...getFieldProps('r_confirmPassword')} />
                    </FormItem>
                    <Button type="primary" htmlType="submit">注册</Button>
                  </Form>
                </TabPane>
              </Tabs>
            </Modal>
          </Col>
          <Col span={2}></Col>
        </Row>
      </header>
    )
  }
}
export default PCHeader = Form.create({})(PCHeader);
