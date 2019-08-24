import React from "react";
import { Link } from "react-router-dom";

import mcLogo from "../../Resources/images/logos/manchester_city_logo.png";

export const CityLogo = props => {
  const template = (
    <div
      className="img_cover"
      style={{
        width: props.width,
        height: props.height,
        color: props.color,
        cursor: props.cursor,
        background: `url(${mcLogo}) no-repeat`
      }}
    />
  );

  if (props.Link) {
    return (
      <Link to={props.linkTo} className="link_logo">
        {template}
      </Link>
    );
  } else {
    return template;
  }
};
