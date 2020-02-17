// 拆分组件
// function Comment(props) {
//   return (
//     <div className="Comment">
//       <div className="UserInfo">
//         <img className="Avatar"
//           src={props.author.avatarUrl}
//           alt={props.author.name}
//         />
//         <div className="UserInfo-name">
//           {props.author.name}
//         </div>
//       </div>
//       <div className="Comment-text">
//         {props.text}
//       </div>
//       <div className="Comment-date">
//         {formatDate(props.date)}
//       </div>
//     </div>
//   );
// }
import React from 'react'

class Comment extends React.Component {
  render() {
    return (
      <div className="Comment">
        {/* <div className="UserInfo">
          <img className="Avatar"
            src={this.props.author.avatarUrl}
            alt={this.props.author.name}
          />
          <div className="UserInfo-name">
            {this.props.author.name}
          </div>
        </div> */}
        <UserInfo user={this.props.author} />
        <div className="Comment-text">
          {this.props.text}
        </div>
        <div className="Comment-date">
          {formatDate(this.props.date)}
        </div>
      </div>
    );
  }
}

class UserInfo extends React.Component {
  render() {
    return (
      <div className="UserInfo">
        <img className="Acatar" 
          src={this.props.user.avatarUrl}
          alt={this.props.user.name}
          />
        <div>
          {this.props.user.name}
        </div>
      </div>
    )
  }
}

function formatDate(props) {
  return props.toLocaleString()
}

export default Comment;