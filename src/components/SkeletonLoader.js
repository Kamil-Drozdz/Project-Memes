import React from "react"
import ContentLoader from "react-content-loader"

const SkeletonLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={400}
    height={460}
    viewBox="0 0 400 460"
    backgroundColor="#f2eeee"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="534" y="517" rx="2" ry="2" width="140" height="10" /> 
    <rect x="534" y="533" rx="2" ry="2" width="140" height="10" /> 
    <rect x="1" y="9" rx="2" ry="2" width="400" height="400" /> 
    <rect x="484" y="529" rx="0" ry="0" width="33" height="27" /> 
    <rect x="545" y="527" rx="0" ry="0" width="39" height="27" /> 
    <rect x="516" y="526" rx="0" ry="0" width="151" height="27" /> 
    <rect x="555" y="537" rx="0" ry="0" width="39" height="27" /> 
    <rect x="1" y="416" rx="0" ry="0" width="40" height="40" /> 
    <rect x="114" y="456" rx="0" ry="0" width="2" height="1" /> 
    <rect x="571" y="518" rx="0" ry="0" width="40" height="40" /> 
    <rect x="45" y="416" rx="0" ry="0" width="40" height="40" /> 
    <rect x="89" y="416" rx="0" ry="0" width="40" height="40" /> 
    <rect x="133" y="416" rx="0" ry="0" width="40" height="40" />
  </ContentLoader>
)

export default SkeletonLoader
