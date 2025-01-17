import React  from "react";

const NewsItem = (props) => {

    let { title, description, imageUrl, newsUrl, author, date, source } =
      props;
    return (
      <div className="my-4">
        <div className="card">
            <div style={{
                justifyContent:"flex-end",
                display:"flex",
                position: 'absolute',
                right: '0',
            }}>

        <span className=" badge rounded-pill bg-danger" >
                {source}
              </span>
              </div>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">
              {title}
              
            </h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {author} on {date}
              </small>
            </p>
            <a href={newsUrl} target="-blank" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  
}

export default NewsItem;
