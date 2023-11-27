import { Button } from 'antd';
import "./OpenButton.less";

function OpenButton() {
  function handleClick() {
    alert("Now visiting this post or comment's page on the Gallery...");
  }

  return (
    <div className="open-button">
      <Button className="open" onClick={handleClick}>Open</Button>
    </div>
  );
}

export default OpenButton;
