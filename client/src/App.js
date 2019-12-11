import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Route, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { withRouter } from 'react-router';
import { verifyUser } from './services/api-helper';
import Home from './components/Home';
import ChangePasswordForm from './components/ChangePasswordForm';
import ResetPasswordForm from './components/ResetPasswordForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';

const App = (props) => {
  const [currentUser, setcurrentUser] = useState(null);

  const setUser = (user) => {
    setcurrentUser(user);
    props.history.push("/")
  }

  const handleLogout = () => {
    setcurrentUser(null);
    localStorage.removeItem('authToken');
    props.history.push("/login");
  }
  const verify = async () => {
    const currentUser = await verifyUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }
  useEffect(() => {
    verify();
    console.log(props.location.pathname.includes('resetpassword'))
    if (!currentUser && !props.location.pathname.includes('resetpassword'))
      props.history.push("/login");
  }, []);


  return (
    <div className="app" >
      <Header
        currentUser={currentUser}
        handleLogout={handleLogout}
      />
      <main className="main">
        {
          currentUser ?
            <Route exact path="/" render={() => <Home currentUser={currentUser} />} />
            :
            <></>
        }
        <Route path="/login" render={() => (
          <LoginForm
            setUser={setUser} />
        )} />
        <Route path="/register" render={() => (
          <RegisterForm
            setUser={setUser}
          />)} />
        <Route exact path="/changepassword" render={(props) => <ChangePasswordForm setUser={setUser} />} />
        <Route exact path="/resetpassword/:resetToken" render={(props) => <ResetPasswordForm resetToken={props.match.params.resetToken} />} />
        <Route exact path="/forgot" render={(props) => <ForgotPasswordForm />} />
      </main >
      <Footer />
    </div>
  );
}

export default withRouter(App);
