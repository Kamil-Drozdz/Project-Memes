import React from 'react';
import ContentLoader from 'react-content-loader';

const SkeletonLoader = (props) => (
  <ContentLoader speed={2} viewBox="0 0 400 460" backgroundColor="#5c5c5c" foregroundColor="#ecebeb" {...props}>
    <circle cx="554" cy="531" r="15" />
    <rect x="476" y="514" rx="2" ry="2" width="140" height="10" />
    <rect x="476" y="530" rx="2" ry="2" width="140" height="10" />
    <rect x="9" y="43" rx="6" ry="6" width="380" height="356" />
    <rect x="580" y="511" rx="0" ry="0" width="64" height="35" />
    <circle cx="589" cy="531" r="15" />
    <rect x="575" y="518" rx="0" ry="0" width="27" height="32" />
    <rect x="9" y="409" rx="4" ry="4" width="24" height="24" />
    <rect x="39" y="409" rx="4" ry="4" width="24" height="24" />
    <rect x="69" y="409" rx="4" ry="4" width="24" height="24" />
    <rect x="99" y="409" rx="4" ry="4" width="24" height="24" />
  </ContentLoader>
);

export default SkeletonLoader;
