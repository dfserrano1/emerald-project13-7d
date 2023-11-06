import Logo from '../../assets/casmm_logo.png';
import "./PostPreview.less";

function PostPreview() {
  return (
    <div className="post-preview">
      <div className="line">
        <h3>Project Title</h3>
        <h3>Username</h3>
        <h3>5 reports : 50 views</h3>
      </div>
      <div className='line'>
        <img src={Logo} className="project-image" />
        <p>Reports: 5</p>
        <p>Views: 50</p>
      </div>
    </div>
  );
}

export default PostPreview;
