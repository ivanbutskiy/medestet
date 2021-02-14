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
import ProductDetail from './pages/product-detail';
import Basket from './pages/basket';
import SuccessPaymentPage from './pages/success-payment-page';
import Account from './pages/account';
import NonAuth from './pages/non-auth';
import ChangeUserData from './pages/change-user-data';
import ChangePassword from './pages/change-password';
import Certify from './pages/certify';
import UserCourses from './pages/user-courses';
import WatchCourse from './pages/watch-course';
import UserWebinars from './pages/user-webinars';
import WatchWebinar from './pages/watch-webinar';

import store from './store';

import './App.css';

const App = () => (
  <Provider store={ store }>
    <Router>
      <Hoc>
        <Switch>
          <Route path='/login/' component={ Login } exact />
          <Route path='/register/' component={ Register } exact />
          <Route path='/basket/' component={ Basket } exact />
          <Route path='/non-auth/' component={ NonAuth } exact />
          <Route path='/account/' component={ Account } exact />
          <Route path='/account/profile/' component={ ChangeUserData } exact />
          <Route path='/account/password/' component={ ChangePassword } exact />
          <Route path='/account/certify/' component={ Certify } exact />

          <Route path='/account/courses/' component={ UserCourses } exact />
          <Route path='/account/courses/watch/:slagCourse?/:moduleId?/:lessonId?/' component={ WatchCourse } exact />

          <Route path='/account/webinars/' component={ UserWebinars } exact />
          <Route path='/account/webinars/watch/:slagWebinar/' component={ WatchWebinar } exact />

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

          <Route 
              path='/products/detail/:slug/' 
              render={({match}) => {
              return <ProductDetail slug={ match.params.slug } /> }}
              exact />

          <Route path='/success-payment/' component={ SuccessPaymentPage } exact />

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
