import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MyGroupSlider = ({ groups }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (!groups || groups.length === 0) {
    return <p>참여한 그룹이 없습니다.</p>;
  }

  return (
<Slider {...settings}>
  {groups.map((group) => (
    <div key={group.id}>
      <div className="group-card">
        <div className="group-avatar">
          <img src={group.imageUrl || "/default.png"} alt="Group Avatar" />
        </div>
        <div className="group-info">
          <div className="group-name">{group.name}</div>
          <div className="group-count">멤버 {group.memberCount ?? 0}명</div>
        </div>
      </div>
    </div>
  ))}
</Slider>
  );
};

export default MyGroupSlider;
