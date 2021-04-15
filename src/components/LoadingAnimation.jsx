import React from 'react';
import PropTypes from 'prop-types';
import './LoadingAnimation.css';
import { useStoreState } from 'easy-peasy';

const LoadingAnimation = ({ size }) => {

    const darkmode = useStoreState((state) => state.darkmode);

    return (
        <div className="ball-pulse smallBall text-center">
            <div style={{ width: size, height: size, backgroundColor: !darkmode ? 'white' : 'black' }} />
            <div style={{ width: size, height: size, backgroundColor: !darkmode ? 'white' : 'black' }} />
            <div style={{ width: size, height: size, backgroundColor: !darkmode ? 'white' : 'black' }} />
        </div>
    )
};

LoadingAnimation.defaultProps = {
    size: '15px'
};

LoadingAnimation.propTypes = {
    size: PropTypes.string
};

export default LoadingAnimation;
