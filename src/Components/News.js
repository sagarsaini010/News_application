import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export default class News extends Component {
  static defaultProps={
    country : "india",
    pageSize: 9,
    category:'genral'
  }
  static propTypes ={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category : PropTypes.string
  }
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page:1
    }
  }

  async componentDidMount(){
 let url = `https://newsapi.org/v2/top-headlines?q=${this.props.country}&pageSize=${this.props.pageSize}&page=${this.state.page}&category=${this.props.category}&apiKey=a08a385ecd9d4758a5f4fdd5ffd4ee9b`;
  this.setState({loading: true})
 let data = await fetch(url);
  let parsedData = await data.json()
this.setState({articles: parsedData.articles,
   totalResults: parsedData.totalResults,
   loading:false
  })
}

handlePreClick =async () =>{


 let url = `https://newsapi.org/v2/top-headlines?q=${this.props.country}&pageSize=${this.props.pageSize}&page=${this.state.page - 1}&category=${this.props.category}&apiKey=a08a385ecd9d4758a5f4fdd5ffd4ee9b`;
 this.setState({loading: true})
 let data = await fetch(url);
  let parsedData = await data.json()
  this.setState({
  page: this.state.page - 1,
  articles: parsedData.articles,
  loading: false
})
window.scrollTo(0, 0);
  
}
handleNextClick =async () =>{


if( !(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
 let url = `https://newsapi.org/v2/top-headlines?q=${this.props.country}&pageSize=${this.props.pageSize}&page=${this.state.page+1}&category=${this.props.category}&apiKey=a08a385ecd9d4758a5f4fdd5ffd4ee9b`;
 this.setState({loading: true})
 let data = await fetch(url);
  let parsedData = await data.json()
  this.setState({
  page: this.state.page + 1,
  articles: parsedData.articles,
  loading: false
})
window.scrollTo({
  top:0,
  behavior: "smooth"
});
}

}

  
  render() {
    return (
      <>
        <div className="container">
          
          <h1 className="text-center" style={{margin: '35px 0px'}}>BharatBulletin - Top newes Headlines</h1>
         {this.state.loading && <Spinner/>}
          <div className="row">
          {!this.state.loading && this.state.articles.map((element)=>{
            return  <div className="col-md-4" key={element.url}>
              <NewsItem
                title={element.title?element.title:""}
                description={element.description?element.description:""}
                imageUrl={
                  element.urlToImage
                }
                newsUrl={element.url}
              />
            </div>
            
            })}
          
            
          </div>
            <div className="container  d-flex justify-content-between">
            <button disabled={this.state.page <=1} type="button" onClick={this.handlePreClick} className="btn btn-dark mb-4">&larr; Pervious</button>
            <button disabled={ this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" onClick={this.handleNextClick} className="btn btn-dark mb-4">Next &rarr;
            </button>
          </div>
        </div>
      </>
    );
  }
}