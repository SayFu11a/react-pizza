import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="407" rx="10" ry="10" width="95" height="30" /> 
    <rect x="0" y="281" rx="10" ry="10" width="280" height="23" /> 
    <rect x="0" y="329" rx="5" ry="5" width="280" height="55" /> 
    <circle cx="134" cy="134" r="134" /> 
    <rect x="130" y="400" rx="25" ry="25" width="152" height="42" />
  </ContentLoader>
)

export default Skeleton
