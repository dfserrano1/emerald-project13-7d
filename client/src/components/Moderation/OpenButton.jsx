import { Button } from 'antd';
import "./OpenButton.less";

function OpenButton({ incident }) {
  function handleClick() {
    let alertText = "Now visiting this " + incident.content_type + "'s page on the Gallery";
    alert(alertText);
  }

  return (
    <div className="open-button">
      <Button className="open" onClick={handleClick}>Open</Button>
    </div>
  );
}

export default OpenButton;
