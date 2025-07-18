import React, { Component } from "react";
import NewsItem from "./NewsItem";

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page:1
    }
  }

  async componentDidMount(){
 let url = `https://newsapi.org/v2/everything?q=india&pageSize=12&page=${this.state.page}&apiKey=a08a385ecd9d4758a5f4fdd5ffd4ee9b`;
  let data = await fetch(url);
  let parsedData = await data.json()
this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults})
}

handlePreClick =async () =>{


 let url = `https://newsapi.org/v2/everything?q=india&pageSize=12&page=${this.state.page}&apiKey=a08a385ecd9d4758a5f4fdd5ffd4ee9b`;
  let data = await fetch(url);
  let parsedData = await data.json()
  this.setState({
  page: this.state.page - 1,
  articles: parsedData.articles
})
window.scrollTo(0, 0);
  
}
handleNextClick =async () =>{


if( this.state.page + 1 > Math.ceil(this.state.totalResults/12)){}
else{
 let url = `https://newsapi.org/v2/everything?q=india&pageSize=12&page=${this.state.page}&apiKey=a08a385ecd9d4758a5f4fdd5ffd4ee9b`;
  let data = await fetch(url);
  let parsedData = await data.json()
  this.setState({
  page: this.state.page + 1,
  articles: parsedData.articles
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
          <h1>BharatBulletin - Top newes Headlines</h1>
          <div className="row">
          {this.state.articles.map((element)=>{
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
            <button type="button" onClick={this.handleNextClick} className="btn btn-dark mb-4">Next &rarr;
            </button>
          </div>
        </div>
      </>
    );
  }
}