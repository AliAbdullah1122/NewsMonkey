import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log("data", parsedData);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title= `${capitalizeFirstLetter
        ( props.category)} - NewsMonkey` 
    updateNews();
    
  }, []);

  const handleNextClick = async () => {
    console.log("handle nenxt click");
    // if (
    //   !(
    //     this.state.page + 1 >
    //     Math.ceil(this.state.totalResults / props.pageSize)
    //   )
    // ) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${
    //     props.country
    //   }&category=${props.category}&apiKey=e0635fdb64e0452081e87e015fabf505&page=${
    //     this.state.page + 1
    //   }&pageSize=${props.pageSize}`;
    //   this.setState({ loading: true });
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   console.log("data", parsedData);

    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false,
    //   });
    // }

    setPage(page + 1);
    updateNews();
  };
  const handlePrevClick = async () => {
    console.log("handle previus click");
    // let url = `https://newsapi.org/v2/top-headlines?country=${
    //   props.country
    // }&category=${props.category}&apiKey=e0635fdb64e0452081e87e015fabf505&page=${
    //   this.state.page - 1
    // }&pageSize=${props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log("data", parsedData);
    // //   this.setState({ articles: parsedData.articles });

    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false,
    // });

    setPage(page - 1);
    updateNews();
  };

  ///////// APIN KEY e0635fdb64e0452081e87e015fabf505 /////////////
  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log("data", parsedData);

    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <>
      <h1
        className="text-center"
        style={{ margin: "20px 0px", marginTop: "80px" }}
      >
        NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines{" "}
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {
              //   !this.state.loading &&
              articles.map((element, index) => {
                return (
                  <div className="col-md-3" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      source={element.source.name ? element.source.name : "0++"}
                      author={element.author ? element.author : "Unknown"}
                      date={
                        new Date(element.publishedAt).toGMTString()
                          ? new Date(element.publishedAt).toGMTString()
                          : ""
                      }
                      imageUrl={
                        element?.urlToImage
                          ? element.urlToImage
                          : "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg"
                      }
                      newsUrl={element.url}
                    />
                  </div>
                );
              })
            }
          </div>
        </div>
      </InfiniteScroll>
      {/* <div className="container d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-dark"
              onClick={this.handlePrevClick}
              disabled={this.state.page <= 1}
            >
              &larr; Previous
            </button>
            <button
              type="button"
              className="btn btn-dark"
              onClick={this.handleNextClick}
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / props.pageSize)
              }
            >
              Next &rarr;
            </button>
          </div> */}
      {/* </div> */}
    </>
  );
};

News.defaultProps = {
  country: "us",
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
