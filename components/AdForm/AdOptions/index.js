import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SmartAd from './SmartAd';
import AdSense from './AdSense';
import DoubleClick from './DoubleClick';
import SunMedia from './SunMedia';
import {
  SMART_ADSERVER,
  AD_SENSE,
  DOUBLE_CLICK,
  SUN_MEDIA,
} from '../../../constants';

const componentMap = {
  [SMART_ADSERVER]: SmartAd,
  [AD_SENSE]: AdSense,
  [DOUBLE_CLICK]: DoubleClick,
  [SUN_MEDIA]: SunMedia,
};

const AdOptions = ({ member, type }) => {
  const Options = componentMap[type];
  return Options ? (
    <Container>
      <Options member={member} />
    </Container>
  ) : null;
};

AdOptions.propTypes = {
  member: PropTypes.string.isRequired,
  type: PropTypes.oneOf([SMART_ADSERVER, AD_SENSE, DOUBLE_CLICK, SUN_MEDIA])
    .isRequired,
};

export default AdOptions;

const Container = styled.div`
  padding-top: 16px;
  padding-left: 50px;
`;
