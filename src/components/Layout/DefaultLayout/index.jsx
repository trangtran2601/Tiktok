import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss'
import Header from '../common/Header';
import Sidebar from './Sidebar';
import React from 'react';
const cx = classNames.bind(styles)
const DefaultLayout = ({ children }) => {
  return (
    <div className={cx('wrapper')}>
      <Header />
      <div className={cx('container')}>
        <Sidebar />
        <div className={cx('content')}>{children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;
