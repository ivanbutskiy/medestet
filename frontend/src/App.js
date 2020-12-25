import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Hoc from './hoc/hoc';
import Login from './pages/login';
import Register from './pages/register'
import Courses from './pages/courses';
import CourseDetail from './pages/course-detail';
import Workshops from './pages/workshops';
import WorkshopDetail from './pages/workshop-detail';
import Webinars from './pages/webinars';
import WebinarDetail from './pages/webinar-detail';
import Shop from './pages/shop';

import store from './store';

import './App.css';

const App = () => (
  <Provider store={ store }>
    <Router>
      <Hoc>
        <Switch>
          <Route path='/login/' component={ Login } exact />
          <Route path='/register/' component={ Register } exact />

          <Route path='/courses/' component={ Courses } exact />
          <Route 
              path='/courses/:slug/' 
              render={({match}) => {
              return <CourseDetail slug={ match.params.slug } /> }}
              exact />

          <Route path='/workshops/' component={ Workshops } exact />
          <Route 
              path='/workshops/:slug/' 
              render={({match}) => {
              return <WorkshopDetail slug={ match.params.slug } /> }}
              exact />

          <Route path='/webinars/' component={ Webinars } exact />
          <Route 
              path='/webinars/:slug/' 
              render={({match}) => {
              return <WebinarDetail slug={ match.params.slug } /> }}
              exact />

          <Route path='/shop/' component={ Shop } exact />
          <Route 
            path='/shop/:page/' 
            component={ Shop }
            exact 
          />

          <Route 
            path='/shop/category/:slug/'
            component={ Shop }
            exact 
          />

          <Route 
            path='/shop/category/:slug/:page/'
            component={ Shop }
            exact 
          />

        </Switch>
      </Hoc>
    </Router>
  </Provider>
);

export default App;
