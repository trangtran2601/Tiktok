import React from 'react';
import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { Wrapper as PopperWrapper } from '../../../Popper';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SearchIcon } from '../../../Icons';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import AccountItem from '../../../AccountItem';
const cx = classNames.bind(styles);
const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    if (!searchValue.trim()) {
      setSearchResult([])
      return;
    }
    setLoading(true);
    fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(searchValue)}&type=less`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        setSearchResult(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [searchValue]);
  const handleClear = () => {
    setSearchValue('');
    setSearchResult([]);
    inputRef.current.focus();
  };
  const handleHideResult = () => {
    setShowResult(false);
  };
  return (
    <HeadlessTippy
      visible={showResult && searchResult.length > 0}
      interactive
      render={(attrs) => (
        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
          <PopperWrapper>
            <h4 className={cx('search-title')}>Accounts</h4>
            {searchResult.map((result) => {
              return <AccountItem key={result.id} data={result} />;
            })}
          </PopperWrapper>
        </div>
      )}
      onClickOutside={handleHideResult}
    >
      <div className={cx('search')}>
        <input
          ref={inputRef}
          value={searchValue}
          placeholder="Search accounts and videos"
          spellCheck={false}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setShowResult(true)}
        />
        {!!searchValue && !loading && (
          <button className={cx('clear')} onClick={handleClear}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        )}
        {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

        <button className={cx('search-btn')}>
          <SearchIcon />
        </button>
      </div>
    </HeadlessTippy>
  );
};

export default Search;
