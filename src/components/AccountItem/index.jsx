import React from 'react';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Image from '../Image';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
const AccountItem = ({data}) => {
  const {avatar, full_name,  tick,nickname } = data
  return (
    <Link to={`/@${nickname}`} className={cx('wrapper')}>
      <Image className={cx('avatar')} src={avatar} alt={full_name} />
      <div className={cx('info')}>
        <h4 className={cx('name')}>
          <span>{full_name}</span>
          {tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
        </h4>
        <span className={cx('username')}>{nickname}</span>
      </div>
    </Link>
  );
};

export default AccountItem;
