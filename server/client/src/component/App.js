import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignIn from './signin/SignIn'
import Register from './signin/Register'
import Home from './Home'
import RoomChat from './roomchat/RoomChat';

function App() {
  return (
    <>
        <Router>
            <>  
                <Route exact path="/" component={ Home } />
                <Route path="/roomchat" component={ RoomChat } />
                <div className="container">
                  <Route exact path="/register" component={ Register } />
                  <Route exact path="/signin" component={ SignIn } />
                </div>
            </>
          </Router>
    </>
  );
}

export default App;
