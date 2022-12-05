import {createContext, useEffect, useState, useContext, useReducer} from "react";
import reducer from "../reducer/AuthReducer";

const AuthContext = createContext();


const INITIALSTATE = {
                        user : ""
                      };



export const AuthProvider = ({children}) =>{
                                              const [state, dispatch] = useReducer(reducer, INITIALSTATE);

                                              const getAuthUser = () =>{
                                                                          return dispatch({ type : "GET_AUTH_USER", payload : { user  : JSON.parse(localStorage.getItem("user"))}  });
                                                                        };

                                              let updateFollowUnfollow = (following, followers) =>{
                                                                                  return dispatch({type : "UPDATE", payload: {following, followers} });
                                                                              }

                                                return (
                                                          <AuthContext.Provider value={ {...state, getAuthUser, updateFollowUnfollow} }>
                                                            {children}
                                                          </AuthContext.Provider>
                                                        );
                                            }



export const useAuthContext = () => {
                                        return useContext(AuthContext);
                                    }
