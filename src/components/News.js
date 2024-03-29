import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types';

export class News extends Component {
  
static defaultProps={
    country:'in',
    pageSize:8,
    category:'general'

}
    static defaultProps={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string

}
    constructor() {
        super();
        this.state = {
            articles:[],
            loading: false,
            page:1,
            totalResults:[]
        }
    }
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apikey=787729d5b0aa4d969eda83e50f98fffc&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles,totalResults:parsedData.totalResults,loading:false});
    }
    handlePrevClick=async()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apikey=787729d5b0aa4d969eda83e50f98fffc&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({  page:this.state.page -1, articles: parsedData.articles,totalResults:parsedData.totalResults,loading:false});
    }
    handleNextClick=async()=>{
        if(!this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)){}
       
            let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apikey=787729d5b0aa4d969eda83e50f98fffc&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true})
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                page:this.state.page +1,
                articles: parsedData.articles,
                totalResults:parsedData.totalResults,
                loading:false
            })
        
      
    }
    render() {
        return (
            <div className="container my-4 ">
                <h2 className="text-center">NewsBook-Top Headlines</h2>
                {this.state.loading &&<Spinner/>}
                <div className="row my-4">
                    {!this.state.loading&&this.state.articles.map((element) => {
                        return <div className="col-md-3" key={element.url}>
                            <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/></div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1}type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button  disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>

        )
    }
}

export default News
