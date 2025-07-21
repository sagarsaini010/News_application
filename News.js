import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "india",
    pageSize: 9,
    category: "general",
    apiKey:"",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string.isRequired,
  };
  capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults:0
    };
    document.title = `${this.capitalizeFirstLetter(
      props.category
    )} - BhartaBulletin`;
  }

  async updateNews(props) {
    this.props.setProgress(30)
    const url = `https://newsapi.org/v2/top-headlines?q=${this.props.country}&pageSize=${this.props.pageSize}&page=${this.state.page}&category=${this.props.category}&apiKey=${this.props.apiKey}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.props.setProgress(60)
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100)

  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePreClick = async () => {
    this.setState({ page: this.state.page - 1 }, () => this.updateNews());
    window.scrollTo(0, 0);
  };

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 }, () => this.updateNews());
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  fetchMoreData = async() => {
   this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?q=${this.props.country}&pageSize=${this.props.pageSize}&page=${this.state.page}&category=${this.props.category}&apiKey=${this.props.apiKey}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      // loading: false,
    });


  };

  render() {
    return (
      <>
        <div className="container">
          <h1 className="text-center" style={{ margin: "35px 0px", marginTop: '90px'}}>
            BharatBulletin - Top{" "}
            {this.capitalizeFirstLetter(this.props.category)} Headlines
          </h1>
          {this.state.loading && <Spinner/>}
          <InfiniteScroll style={{height: 'auto',overflow: 'visible'}}
            dataLength={Array.isArray(this.state.articles) ? this.state.articles.length : 0}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader = {<Spinner/>}
          >
            <div className="row">
              {Array.isArray(this.state.articles) &&
                this.state.articles.map((element, index) => {
                  if (!element || !element.title) return null;

                  return (
                    <div className="col-md-4" key={`${element.url}-${index}`}>
                      <NewsItem
                        title={element.title ? element.title : "No title"}
                        description={
                          element.description
                            ? element.description
                            : "No description available"
                        }
                        imageUrl={element.urlToImage}
                        newsUrl={element.url}
                        author={element.author}
                        date={element.publishedAt}
                        source={element.source.name}
                      />
                    </div>
                  );
                })}
            </div>
          </InfiniteScroll>
          {/* <div className="container  d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              onClick={this.handlePreClick}
              className="btn btn-dark mb-4"
            >
              &larr; Previous
            </button>
            <button
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
              type="button"
              onClick={this.handleNextClick}
              className="btn btn-dark mb-4"
            >
              Next &rarr;
            </button>
          </div> */}
        </div>
      </>
    );
  }
}
