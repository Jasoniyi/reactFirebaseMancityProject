import React from "react";
import Zoom from "react-reveal/Zoom";
import Jersey from "../../../Resources/images/jersey.jpg";

const PromotionAnimation = () => {
  return (
    <div className="promotion_animation">
      <Zoom>
        <div className="left">
          <div>
            <span>Win a</span>
            <span>Jersey</span>
          </div>
        </div>
      </Zoom>

      <Zoom>
        <div className="right">
          <div style={{ background: `url(${Jersey})` }} />
        </div>
      </Zoom>
    </div>
  );
};

export default PromotionAnimation;
