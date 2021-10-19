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
document.getElementById('input').value = '```html\n<div id="app">\n\t<!-- bind to a data property named `code` -->\n\t<highlightjs autodetect :code="code" />\n\t<!-- or literal code works as well -->\n\t<highlightjs language="javascript" code="var x = 5;" />\n</div>\n```'
document.getElementById('input').value = '```python\nprint(123777)\n```'
