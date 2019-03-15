
import React, { Component } from "react"
import Svg from 'react-native-svg';

import projections from "./projections"
import defaultProjectionConfig from "./projectionConfig"

class ComposableMap extends Component {
  constructor() {
    super()
    this.projection = this.projection.bind(this)
  }
  projection() {
    const {
      projection,
      projectionConfig,
      width,
      height
    } = this.props

    return typeof projection !== "function" ?
      projections(width, height, projectionConfig, projection) :
      projection(width, height, projectionConfig)
  }
  render() {

    const {
      width,
      height,
      style,
      className,
      showCenter,
      children,
      aspectRatio,
      viewBox,
      defs
    } = this.props

    return (
      <Svg width={ width }
           height={ height }
           viewBox={ viewBox ? viewBox : `0 0 ${width} ${height}` }
           className={ `rsm-svg ${className || ''}` }
           style={ style }
           preserveAspectRatio={ aspectRatio }>
        {
          defs && (
            <Svg.Defs>
              {defs}
            </Svg.Defs>
          )
        }
        {
          React.cloneElement(this.props.children, {
            projection: this.projection(),
            width,
            height,
          })
        }
        {
          showCenter && (
            <Svg.G>
              <Svg.Rect x={width/2-0.5} y={0} width={ 1 } height={ height } fill="#e91e63" />
              <rect x={0} y={height/2-0.5} width={ width } height={ 1 } fill="#e91e63" />
            </Svg.G>
          )
        }
      </Svg>
    )
  }
}

ComposableMap.defaultProps = {
  width: 800,
  height: 450,
  projection: "times",
  projectionConfig: defaultProjectionConfig,
  aspectRatio: "xMidYMid",
  viewBox: null
}

export default ComposableMap
