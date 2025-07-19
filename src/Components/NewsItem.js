import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl } = this.props;
    return (
      <>
        <div className="card my-4" >
          <img
            src={
              imageUrl
                ? imageUrl
                : "https://image.cnbcfm.com/api/v1/image/108135129-1745370597959-gettyimages-2198822098-AA_14022025_2081399.jpeg?v=1752733934&w=1920&h=1080"
            }
            className="card-img-top"
            alt={title}
            onError={(e) => {
              e.target.src =
               "https://picsum.photos/300/200";
            }}
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-dark"
            >
              Read more
            </a>
          </div>
        
        </div>
      </>
    );
  }
}
