import React from 'react'
import {connect} from 'react-redux'
import App from '../components/App'

// 引用React.Component的原型
const RCP = React.Component.prototype

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  // 在组件里注入公共方法
  console.info('>>>> Inject dispatch in Component >>>>')
  RCP.dispatch = dispatch
  return {
    dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
