// Contains the main-container div that holds the main layout and navigation. 
// This component should also be able to hold sub-components Search and Saved


const React = require("react"); // Include React

// Here we include all of the sub-components
const Query = require("./Query.jsx");
const Search = require("./Search.jsx");
const Saved = require("./Saved.jsx");

// Requiring our helper for making API calls
const helpers = require("../utils/helpers.js");

// Create the Main Component
const Main = React.createClass({

  // Here we set a generic state
  getInitialState: function() {
    return {
      apiResults: [],
      mongoResults: [],
      searchTerms: ["","",""]
    };
  },

  // These functions allow children to update the parent.
  _setSearchFeilds: function(topic, start, end) {
    this.setState({ searchTerms: [topic, start, end] });
  },

  // Allow child to update Mongo data array
  _resetMongoResults: function(newData){
    this.setState({ mongoResults: newData} );
  },

  // After the Main renders, collect the saved articles from the API endpoint
  componentDidMount: function() {

    // Hit the Mongo API to get saved articles
    helpers.apiGet().then(function(query){
      this.setState({mongoResults: query.data});
    }.bind(this));

  },

  // If the component changes (i.e. if a search is entered)...
  componentDidUpdate: function(prevProps, prevState) {

    // Only hit the API once; i.e. if the prev state does not equal the current
    if(this.state.searchTerms != prevState.searchTerms){
      // Run the query for the address
      helpers.articleQuery(this.state.searchTerms[0], this.state.searchTerms[1], this.state.searchTerms[2]).then(function(data) {
        //console.log(data);
        this.setState({ apiResults: data });
      }.bind(this));
    }
  },
  // Here we render the function
  render: function() {
    return (

      <div className="container" style={ {backgroundColor: "white", borderStyle: "solid", borderWidth: "1px"} }>

        <div className="page-header">
          <h1 className="text-center"><img style={ {width: "20%"} } src="assets/images/120px-Newspaper.png" alt="New York Times scraper"/></h1>
          <h2 className="text-center" style={ {marginTop: "-12px"} }><b><i>New York Times Article Scraper</i></b></h2>
          <h4 className="text-center">Type in a topic and click on the article to open. Save it for later reference.</h4>
        </div>

        <Query _setSearchFeilds={this._setSearchFeilds} />
        <Search apiResults={this.state.apiResults} _resetMongoResults={this._resetMongoResults} />
        <Saved mongoResults={this.state.mongoResults} _resetMongoResults={this._resetMongoResults} />

      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;