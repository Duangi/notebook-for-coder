// import React, {Suspense } from 'react';
// import { BrowserRouter as Router, Route,Switch, Link } from 'react-router-dom';
import './css/App.css'
import React from 'react'
// import Todos from './components/Todos';
// import DH_Input from './components/Second';
// import Cover from './components/Cover';
// import Paragraph from './containers/paragraph';
import Editor from './containers/editor';

function App() {
  return (
//     <Router>
//       <div>
//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/todos">first</Link>
//         </li>
//         <li>
//           <Link to="/second">second</Link>
//         </li>
//       </ul>
//       <hr />
//         <Suspense fallback={<div>Loading...</div>}>
//         <Switch>
//             <Route exact path="/" component={Cover}/>
//             <Route path="/todos" component={Todos}/>
//             <Route path="/second" component={Editor}/>
//         </Switch>
//     </Suspense>
//     </div>
//   </Router>
    <Editor>

    </Editor>
  );
}

export default App;
