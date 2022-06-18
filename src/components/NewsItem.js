import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let {title,description,imageUrl,newsUrl,author,date}=this.props;
        return (
            <div>
                <div className="card">
                    <img src={!imageUrl?"https://techcrunch.com/wp-content/uploads/2021/09/GettyImages-1162013884.jpg?w=600":imageUrl} className="card-img-top" alt="..."/>
                    <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} target="_blank rel=opener" className="btn  btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
