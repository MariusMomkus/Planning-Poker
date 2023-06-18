// import LiveRoom from "../liveRoom/LiveRoom";
import "./Header.css";
const Header = () => {
  return (
    <div className="header">
      <img src="./appIcon.png" alt="App logo" />
      <a href="#default" className="logo">
        Ace Planning Poker
      </a>
      <div className="header-right">
        <a className="active" href="#new-room">
          Create Room
          {/* new websocket room goes here */}
          {/* <LiveRoom /> */}
        </a>
        <a className="active" href="#invite">
          Invite Players
        </a>
      </div>
    </div>
  );
};
export default Header;