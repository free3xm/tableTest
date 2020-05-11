import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { hideAlert } from '../../../store/actions/alert';
import cls from './Alert.module.css';

function Alert({ alert }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(hideAlert());
      clearTimeout(timeout);
    }, 3000);
  }, [dispatch]);
  return (
    <div className={`alert alert-${alert.type} ${cls.customAlert}`}>
      {alert.message}
    </div>
  );
}

Alert.propTypes = {
  alert: PropTypes.shape({
    message: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
};

export default React.memo(Alert);
