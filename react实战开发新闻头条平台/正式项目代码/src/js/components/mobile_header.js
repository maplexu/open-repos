import React from 'react';
import {
  Menu,
  Icon,
  Tabs,
  message,
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

class MobileHeader extends React.Component {
  constructor(){
    super();
    this.state = {
      current: 'top',
      modalVisible: false,
      hasLogined: false,
      userNickName: '',
      userid: '',
      action: 'login'
    }
    this.handleClick = this.handleClick.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeTabAction = this.changeTabAction.bind(this);
  }

  //通过钩子函数在组件初始化时从localStorage中获取到用户状态
  componentWillMount(){
    if(localStorage.userid !== ''){
      this.setState({
        hasLogined: true,
        userNickName: localStorage.userNickName,
        userid: localStorage.userid
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
  login(){
    this.setModalVisible(true);
  }
  logout(){
    localStorage.userid = '';
    localStorage.userNickName = '';
    this.setState({hasLogined: false});
    message.success('退出登录成功！');
  }
  handleSubmit(e){
    e.preventDefault();

    //页面开始向API进行数据提交
    const formData = this.props.form.getFieldsValue();    //获取表单中的数据
    console.log(formData);
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
        })
        localStorage.userNickName = json.NickUserName;
        localStorage.userid = json.UserId;
        message.success('登录成功！');
      }else{
        message.success('注册成功！');
      }
      this.setModalVisible(false);
    })
  }
  changeTabAction(key){
    console.log(key);
    if(key == 1){
      this.setState({action: 'login'})
    }else{
      this.setState({action: 'register'})
    }
  }

  render(){
    const { getFieldProps } = this.props.form;
    //用户位置显示的内容（根据是否登录来显示内容）
    const userShow = this.state.hasLogined ?
      <Link to="/usercenter">
        <Icon type="inbox" />
      </Link>
      :
      <Icon type="setting" onClick={this.login}></Icon>;

    return (
      <div id="mobileHeader">
        <header>
          <a href="#">
            <img src="./src/images/logo.png" alt="logo" />
            <span>ReactNews</span>
          </a>
          {userShow}
        </header>

        {/*注册弹窗：*/}
        <Modal
          title = "用户中心"
          wrapClassName = "vertical-center-modal"
          visible = { this.state.modalVisible }
          onCancel = { ()=> this.setModalVisible(false) }
          onOk = { ()=> this.setModalVisible(false) }
          okText = "关闭"
        >
          <Tabs type="card" onChange={this.changeTabAction}>
            <TabPane tab="登录" key="1">
              <Form onSubmit={this.handleSubmit}>
                <FormItem label="账号">
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
                  <Input placeholder="请输入您的账户" {...getFieldProps('r_username')} />
                </FormItem>
                <FormItem label="密码">
                  <Input type="password" placeholder="请输入您的账户" {...getFieldProps('r_password')} />
                </FormItem>
                <FormItem label="确认密码">
                  <Input type="password" placeholder="请输入您的账户" {...getFieldProps('r_confirmPassword')} />
                </FormItem>
                <Button type="primary" htmlType="submit">注册</Button>
              </Form>
            </TabPane>
          </Tabs>
        </Modal>
      </div>
    )
  }
}

export default MobileHeader = Form.create({})(MobileHeader)
