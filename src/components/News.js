import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component"; /// buttom loading auto come imagenews

export class News extends Component {
  /*articles = [
    {
      source: {
        id: null,
        name: "Gizmodo.com",
      },
      author: "Dua Rashid",
      title:
        "You'll Soon Have to Pay $20 a Month to Access Copilot's Coolest Features",
      description:
        "My colleague Maxwell Zeff once described Microsoft Copilot as “if Clippy went to get his MBA.” Microsoft just announced a new premium subscription to its Copilot AI, which can be analogous to Clippy getting a PhD. Read more...",
      url: "https://gizmodo.com/copilot-pro-20-a-month-microsoft-1851163966",
      urlToImage:
        "https://i.kinja-img.com/image/upload/c_fill,h_675,pg_1,q_80,w_1200/5f2cac9be2feeb29bba93091157f9427.png",
      publishedAt: "2024-01-16T07:00:00Z",
      content:
        "My colleague Maxwell Zeff once described Microsoft Copilot as if Clippy went to get his MBA. Microsoft just announced a new premium subscription to its Copilot AI, which can be analogous to Clippy ge… [+1503 chars]",
    },
    {
      source: {
        id: null,
        name: "MacRumors",
      },
      author: "Tim Hardwick",
      title:
        "OLED iPad Pro Displays Now in Production, Devices to Ship in April",
      description:
        "OLED displays for both of Apple's next-generation iPad Pro models will have entered the production phase by this week in time for device shipments to begin in April, claims a new report by The Elec.\n\n\n\n\n\nAccording to the Korean-language outlet, LG Display rec…",
      url: "https://www.macrumors.com/2024/01/16/oled-ipad-displays-enter-production/",
      urlToImage:
        "https://images.macrumors.com/t/YHinPljAgi01dOuDZYQNlBwzGVo=/2500x/article-new/2022/07/iPad-Pro-OLED-Feature-2.jpg",
      publishedAt: "2024-01-16T08:01:47Z",
      content:
        "OLED displays for both of Apple's next-generation iPad Pro models will have entered the production phase by this week in time for device shipments to begin in April, claims a new report by The Elec.\r… [+2315 chars]",
    },
    {
      source: {
        id: "business-insider",
        name: "Business Insider",
      },
      author: "Sarah Jackson",
      title:
        "Apple plans to drop blood oxygen feature on smartwatches to get around import ban",
      description:
        "Apple says the Series 9 and Ultra 2 are still available with blood oxygen functionality, the subject of its patent dispute with Masimo, for now.",
      url: "https://www.businessinsider.com/apple-drop-blood-oxygen-feature-avoid-watch-import-ban-2024-1",
      urlToImage:
        "https://i.insider.com/65a59e136979d73718235347?width=1200&format=jpeg",
      publishedAt: "2024-01-16T00:25:07Z",
      content:
        "Apple reportedly has a plan to get around the Apple Watch import ban, the latest development in its ongoing legal battle with medical device maker Masimo.Michael M. Santiago/Getty Images\r\n<ul><li>App… [+1850 chars]",
    },
    {
      source: {
        id: "time",
        name: "Time",
      },
      author: "Melissa Locker",
      title: "The Best and Worst Moments of the 2024 Emmy Awards",
      description:
        "Here are the highlights from the 75th Primetime Emmy Awards, from a slew of classic cast reunions to wins for 'Beef' and 'The Bear.'",
      url: "https://time.com/6554466/emmys-recap-2024/",
      urlToImage:
        "https://api.time.com/wp-content/uploads/2024/01/the-2024-emmys-01.jpg?quality=85",
      publishedAt: "2024-01-16T02:32:55Z",
      content:
        "Now that Hollywood is back in action after both the writers' strike and the actors strike came to a resolution late last year, the much delayed and much anticipated 75th Annual Emmy Awards are finall… [+11430 chars]",
    },
  ];*/
  static defaultProps = {
    ///deafaultProps
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    ///if we write props in construction then we need to write props  document.title
    super(props);
    // console.log("hello guys  ");
    this.state = {
      articles: [], //this.articles,
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsJAT`; //top title came eg:--- Science NewsJAT---
  }
  ////yo 33 episode ma updatenews() haleko for easy to understand code or not rewrite same code
  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`; ///copy fron newsapi get link 33including&page=1--to this -> &page=${this.state.page}
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
    // // console.log("cmd");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`; ///copy fron newsapi get link
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // //console.log("parsedData");
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false,
    // });
    this.updateNews();
  }
  handleprevClick = async () => {
    //console.log("previous");
    // let url = `https://newsapi.org/v2/top-headlines?country=${
    //   this.props.country
    // }&category=${
    //   this.props.category
    // }&apiKey=${this.props.apiKey}&page=${
    //   this.state.page - 1
    // }&pageSize=${this.props.pageSize}`; ///copy fron newsapi get link
    // this.setState({ loading: true }); ////spinner
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log("parsedData");
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false,})

    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };
  handlenextClick = async () => {
    // if (
    //   !(
    //     this.state.page + 1 >
    //     Math.ceil(this.state.totalResults / this.props.pageSize)
    //   ) ////!
    // ) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${
    //     this.props.country
    //   }&category=${
    //     this.props.category
    //   }&apiKey=${this.props.apiKey}&page=${
    //     this.state.page + 1
    //   }&pageSize=${this.props.pageSize}`; ///copy fron newsapi get link and props.pagesize give in app nos ////--! yo spinner ko lagiee
    //   this.setState({ loading: true }); ////spinner
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   console.log("parsedData");
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false,
    //   });
    // }
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`; ///copy fron newsapi get link 33including&page=1--to this -> &page=${this.state.page}
    //this.setState({ loading: true });
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
        <h1 className="text-center" style={{ margin: "35px" }}>
          NewsJAT -Top {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines
        </h1>
        {/*} {this.state.loading && <Spinner />}*/}
        {/*id this.state.loading is true vayo vaney dekhau &&spinner */}
        {/*<div className="row"> <!this.state.loading &&
            this.state.articles.map((element) => {..pahila yesto thikyo for snipper ko lagi...*/}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.lenght !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                ////!spinner ko lagi
                // console.log(element);
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : ""} ///if statement diyeko ho
                      description={
                        element.description ? element.description : "" //element.description.slice(0, 88)
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
          </div>
        </InfiniteScroll>
        {/*</div>/// <div className="d-flex container justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark "
            onClick={this.handleprevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark "
            onClick={this.handlenextClick}
          >
            Next &rarr;
          </button>
          </div>*/}
      </>
    );
  }
}

export default News;
