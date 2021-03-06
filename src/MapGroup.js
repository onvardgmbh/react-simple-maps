
import React, { Component } from "react"
import Svg from 'react-native-svg';

class MapGroup extends Component {
  render() {

    const {
      children,
      projection,
      style,
      zoom,
      width,
      height,
      groupName,
      itemName,
    } = this.props
    return (
      <Svg.G className={`rsm-${groupName}`} style={ style }>
        {
          !children ?
            null :
            children.length === undefined ?
              React.cloneElement(children, {
                projection,
                zoom,
                width,
                height,
              }) :
              children.map((child, i) =>
                !child ?
                  null :
                  React.cloneElement(child, {
                    key: child.key || `${itemName}-${i}`,
                    projection,
                    zoom,
                    width,
                    height,
                  })
              )
        }
      </Svg.G>
    )
  }
}

MapGroup.defaultProps = {
  componentIdentifier: "Group",
  groupName: "group",
  itemName: "group-item",
}

export default MapGroup
