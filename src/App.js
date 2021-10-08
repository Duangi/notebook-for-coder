import React, {Suspense } from 'react';
import { BrowserRouter as Router, Route,Switch, Link } from 'react-router-dom';
import './css/App.css'

// const Todos = lazy(() => import('./components/Todos'));
// const Cover = lazy(() => import('./components/Cover'));
import Todos from './components/Todos'
import Cover from './components/Cover'
import Editor from './components/Editor'

function App() {
  return (
    <Router>
      <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/todos">first</Link>
        </li>
        <li>
          <Link to="/index">second</Link>
        </li>
      </ul>
      <hr />
      <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Cover}/>
        <Route path="/todos" component={Todos}/>
        <Route path="/index" component={Editor}/>
      </Switch>
    </Suspense>
    </div>   
  </Router>
  );
}

// function Home() {
//   return(
//     <div className="home-content">
//       <h3> 看啥呢？动手啊！</h3>
//     </div>
//   )
// }

export default App;
