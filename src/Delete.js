import React, { Component } from "react";

import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

import state from "./state3";

const backgrounds = [
  "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)",
  "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
  "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)",
  "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%)",
  "linear-gradient(to top, #d299c2 0%, #fef9d7 100%)",
  "linear-gradient(to top, #ebc0fd 0%, #d9ded8 100%)",
  "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
  "linear-gradient(to top, #96fbc4 0%, #f9f586 100%)",
  "linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%)",
  "linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)",
  "linear-gradient(to top, #c1dfc4 0%, #deecdd 100%)",
  "linear-gradient(-20deg, #ddd6f3 0%, #faaca8 100%, #faaca8 100%)"
];

const createCardMutation = gql`
  mutation CreateCard(
    $name: String
    $description: String
    $css: String
    $feed_image_url: String
    $feed_image_height: Int
    $feed_image_width: Int
    $image_url: String
    $image_height: Int
    $image_width: Int
  ) {
    createCard(
      name: $name
      description: $description
      css: $css
      feed_image_url: $feed_image_url
      feed_image_height: $feed_image_height
      feed_image_width: $feed_image_width
      image_url: $image_url
      image_height: $image_height
      image_width: $image_width
    ) {
      name
      description
      css
      feed_image_url
      feed_image_width
      feed_image_height
      image_url
      image_height
      image_width
    }
  }
`;

export default class Delete extends Component {
  state = {
    name: "name1",
    description: "desc1",
    css: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    feed_image_url:
      "https://cdn1.thehunt.com/app/public/system/zine_images/11599024/zine_view_thumb/1afa463c5e819ac1fc8b75903e056948.jpeg",
    feed_image_width: 290,
    feed_image_height: 290,
    image_url:
      "https://cdn1.thehunt.com/app/public/system/zine_images/11599024/zine_view_thumb/1afa463c5e819ac1fc8b75903e056948.jpeg",
    image_height: 290,
    image_width: 290
  };

  render() {
    return (
      <Mutation mutation={createCardMutation}>
        {mutate => (
          <div>
            <button
              onClick={async () => {
                Object.keys(state).map(async key => {
                  await mutate({
                    variables: {
                      name: state[key].name || "hop",
                      description: state[key].description,
                      css: backgrounds[Math.floor(Math.random() * 12 + 1)],
                      feed_image_url: state[key].feed_image_url,
                      feed_image_height: state[key].feed_image_height,
                      feed_image_width: state[key].feed_image_width,
                      image_url: state[key].image_url,
                      image_height: state[key].image_height,
                      image_width: state[key].image_width
                    }
                  });
                });
              }}
            >
              batch
            </button>
          </div>
        )}
      </Mutation>
    );
  }
}
