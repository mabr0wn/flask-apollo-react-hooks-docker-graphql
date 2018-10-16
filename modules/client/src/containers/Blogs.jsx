// React
import * as React from 'react';
import { Component } from 'react';
// eslint-disable-next-line
import { connect } from 'react-redux';

/**
 * This is container class which will do all the heavy lifting,
 * will import this into our presentational component App.js
 */
class Blogs extends Component {
    // eslint-disable-next-line
    constructor() {
      super();

  }
    render() {
        return (
            <div></div>
        )
    }
}

// eslint-disable-next-line
const mapStateToProps = state => {
    return {};
}
// eslint-disable-next-line
const mapDispatchToProps = dispatch => {
    return {};
}

export default Blogs;
//export default connect(mapStateToProps, mapDispatchToProps)(Blogs)