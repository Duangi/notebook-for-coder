import React, {Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route,Switch, Link } from 'react-router-dom';
import './css/App.css'

const Todos = lazy(() => import('./components/Todos'));
const DH_Input = lazy(() => import('./components/Second'));
const Editor = lazy(()=> import('./components/Editor'))
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
          <Link to="/second">second</Link>
        </li>
        <li>
            <Link to="/editor">editor</Link>
        </li>
      </ul>
      <hr />
      <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/todos" component={Todos}/>
        <Route path="/second" component={DH_Input}/>
        <Route path="/editor" component={Editor}/>
      </Switch>
    </Suspense>
    </div>   
  </Router>
  );
}

function Home() {
  return(
    <div className="home-content">
      <h3> 看啥呢？动手啊！</h3>
    </div>
  )
}

export default App;
