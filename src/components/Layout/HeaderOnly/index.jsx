import Header from '../common/Header';

const HeaderOnly = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="container">{children}</div>
    </div>
  );
};

export default HeaderOnly;
