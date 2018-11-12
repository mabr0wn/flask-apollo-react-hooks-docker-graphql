// React
import React from 'react';
import { 
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
// Apollo
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
// Redux
import { Provider } from 'react-redux';
// Local
import Routes from '../Routes.jsx';
import store from '../store/store';

const GET_USERS = gql`
  query {
  allUsers {
    edges {
      node {
        username
      }
    }
  }
}
`
/*
 * =======================================================
 * Presentational React functional Component, will not worry about
 * how the applications works, but only care about how
 * our application will looks.
 * =======================================================
 */ 
const App = ()  => {
    return (
        <Provider store={store}>
                <div>
                    <Router>
                        <div>
	                    <Route component={Routes} />
                        <Query query={GET_USERS}>
                        {({ loading, error, data }) => {
                          if (loading) return <div>Loading...</div>
                          if (error) return <div>THERE WAS AN ERROR</div>
                          console.log(data)
                          return <div>{data.allUsers.edges[0].node.username}</div>
                        }}
                        </Query>
                        </div>
                    </Router>
                </div>
        </Provider>
    );
}

export default App;