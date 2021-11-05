import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
        <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
// const value = '```html\n<div id="app">\n\t<!-- bind to a data property named `code` -->\n\t<highlightjs autodetect :code="code" />\n\t<!-- or literal code works as well -->\n\t<highlightjs language="javascript" code="var x = 5;" />\n</div>\n```'
const value = '```javascript\n\n```'
document.getElementById('input').value = value
// window.originContent = value
