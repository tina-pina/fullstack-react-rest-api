// import React from "react";
// import { Redirect, Route } from "react-router-dom"


// class PrivateRoute extends React.Component {

//     render() {
//         const { component: Component, ...rest } = this.props;

//         return (
//             <Route
//                 {...rest}
//                 render={props => this.props.isAuthenticated ? (
//                     <Component {...props} />
//                 ) : (
//                         <Redirect
//                             to={{
//                                 pathname: '/',
//                                 state: { from: this.props.location },
//                             }}
//                         />
//                     )}
//             />
//         )
//     }
// }

// // function mapStateToProps(state) {
// //     return {
// //         loggedIn: state.loggedIn
// //     }
// // }

// export default PrivateRoute
