import React, { Component } from "react";
import Cell from "./Cell";
import "./styles.css";
import { Grid } from "mauerwerk";
import { Box, Button } from "gestalt";

import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const allCardsQuery = gql`
  query AllCardsQuery($limit: Int, $offset: Int) {
    cards(limit: $limit, offset: $offset) {
      id
      name
      description
      css
      feed_image_url
      feed_image_height
      feed_image_width
      image_url
      image_height
      image_width
    }
  }
`;

class App extends Component {
  render() {
    return (
      <Query query={allCardsQuery}>
        {({ data, loading, fetchMore }) => {
          if (loading) return null;
          if (!data.cards) return null;
          // const test = data.cards.slice(0, 10);
          // console.log(test);

          return (
            <React.Fragment>
              <Grid
                className="grid"
                // Arbitrary data, should contain keys, possibly heights, etc.
                data={data.cards}
                // Key accessor, instructs grid on how to fet individual keys from the data set
                keys={d => d.id}
                // Can be a fixed value or an individual data accessor
                // heights={this.state.height ? d => d.height : 200}
                heights={d => d.feed_image_height}
                // Number of columns
                columns={4}
                // Space between elements
                margin={34}
                // Removes the possibility to scroll away from a maximized element
                lockScroll={true}
                // Delay when active elements (blown up) are minimized again
                // closeDelay={400}
                // style={{ overflow: "visible" }}
              >
                {(data, maximized, toggle) => (
                  <Cell {...data} maximized={maximized} toggle={toggle} />
                )}
              </Grid>
              <Box padding={2} position="absolute">
                <Button
                  text="load more"
                  inline
                  onClick={() =>
                    fetchMore({
                      variables: {
                        limit: 10,
                        offset: data.cards.length
                      },
                      updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult) return prev;
                        return {
                          ...prev,
                          cards: [...prev.cards, ...fetchMoreResult.cards]
                        };
                      }
                    })
                  }
                />
              </Box>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default App;
