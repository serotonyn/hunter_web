import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./redux/actions";
import { Masonry, Box, Image, Card, Avatar, Text, Link, Button } from "gestalt";
import Carta from "./Carta";

// class Item extends React.PureComponent {
//   render() {
//     const { data } = this.props;

//     return (
//       <Box
//         maxWidth={236}
//         width={data.width}
//         height={data.height}
//         column={12}
//         margin={2}
//         padding={2}
//         minHeight={300}
//       >
//         <Card
//           image={
//             <Image
//               alt="example.com"
//               color="rgb(111, 91, 77)"
//               naturalHeight={564}
//               naturalWidth={564}
//               src="https://pinterest.github.io/gestalt/static/media/stock1.291c62ad.jpg"
//             />
//           }
//           onMouseEnter={this.handleMouseEnter}
//           onMouseLeave={this.handleMouseLeave}
//         >
//           <Text align="center" bold size="xl">
//             <Link href="https://pinterest.com">
//               <Box paddingX={3} paddingY={2}>
//                 James Jones
//               </Box>
//             </Link>
//           </Text>
//           <Button accessibilityLabel="Follow James Jones" color="red" text="Follow" />
//         </Card>
//       </Box>
//     );
//   }
// }

export class DefaultPage extends Component {
  state = {
    items: [...Object.values(this.props.latest.zines)]
  };

  _setScroll = scroll => {
    this._scroll = scroll;
  };

  _getScroll = () => {
    return this._scroll;
  };

  render() {
    return (
      <div className="latest-default-page">
        <div
          ref={this._setScroll}
          style={{
            height: "100vh",
            width: "100%",
            display: "block",
            overflow: "auto",
            flexDirection: "column",
            padding: "0 60px 0 60px"
          }}
        >
          <Masonry
            minCols={1}
            comp={Carta}
            flexible={false}
            gutterWidth={20}
            virtualize={false}
            columnWidth={250}
            items={this.state.items}
            scrollContainer={this._getScroll}
          />
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    latest: state.latest
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultPage);
