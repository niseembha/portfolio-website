import Spline from "@splinetool/react-spline";

const ROBOT_SCENE =
  "https://prod.spline.design/i1ZjmJbYs5IblWsh/scene.splinecode";

export default function HeroRobot() {
  return (
    <div className="hero-robot" aria-hidden="true">
      <Spline scene={ROBOT_SCENE} />
    </div>
  );
}
