
const AuthReducer = (state, action) =>{
                                            switch (action.type)
                                            {
                                              case "GET_AUTH_USER":{
                                                                    return {
                                                                              ...state,
                                                                              user : action.payload.user
                                                                           };
                                                                  }

                                              break;
                                              case "UPDATE":{
                                                                console.log("UPDATE action "+action.payload);
                                                                return{
                                                                        ...state,
                                                                        following:action.payload.following,
                                                                        followers:action.payload.followers
                                                                      }
                                                            }
                                              break;
                                              default:
                                                        return state;

                                            }
                                       }


export default AuthReducer;
