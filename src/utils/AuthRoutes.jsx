

import {Outlet, Navigate} from "react-router-dom";
import {useAuthContext} from "../context/AuthContext";
import {useEffect} from "react";


const ProtectedRoutes = () => {
                                const {user, getAuthUser} = useAuthContext();
                                // console.log(`ProtectedRoutes ${JSON.stringify(user)}`);

                                useEffect( ()=>{
                                                  getAuthUser();
                                                },[]
                                        );


                                return (
                                             user ? <Outlet /> : <Navigate to="/" />
                                        );
                              }


    const CheckRoutes = () => {
                                  const {user, getAuthUser} = useAuthContext();
                                  // console.log(`CheckRoutes ${JSON.stringify(user)}`);

                                  useEffect( ()=>{
                                                    getAuthUser();
                                                  },[]
                                          );

                                  return (
                                             !user ? <Outlet /> : <Navigate to="/profile"/>
                                          );
                              }




export {ProtectedRoutes, CheckRoutes};
