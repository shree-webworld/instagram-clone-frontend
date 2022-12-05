import Navbar from "../components/Navbar";
import axios from "axios";
import {useEffect, useState} from "react";
import { Card, CardHeader, CardBody, Image, Heading, Input, Text, VStack, Center, Button, HStack, ButtonGroup, Flex, Avatar } from '@chakra-ui/react';
import {useTitle} from "../utils/GeneralFunctions";
import {useAuthContext} from "../context/AuthContext";
import {NavLink, useNavigate} from "react-router-dom";


export default function Profile_Home()
{
  useTitle("Home • Photogram");

  let navigate = useNavigate();

  let {user, getAuthUser} = useAuthContext();

  const base_url = import.meta.env.VITE_BASE_URL;

  const [data, setData] = useState([]);

  const handlePostLikes = (id) =>{
                                          try
                                          {
                                            axios.put(`${base_url}/api/post/likes`,{postId:id} , {headers : {"Authorization" : `Bearer ${localStorage.getItem("jwt")}`} })
                                            .then(res =>{
                                                          // console.log(res);
                                                          const newData = data.map(currentElement=>{
                                                                                                      if(currentElement._id == res._id)
                                                                                                       {
                                                                                                            return res;
                                                                                                        }else
                                                                                                         {
                                                                                                            return currentElement;
                                                                                                         }
                                                                                                      }
                                                                                      )
                                                          setData(newData);
                                                        }
                                                  ).catch(err=>{
                                                                      console.log(err);
                                                                }
                                                         )
                                            navigate("/profile");
                                          }catch (e)
                                            {
                                                console.log(e);
                                                console.log(e.response.data.error);
                                            }
                                       }

  const handlePostDislikes = (id) =>{
                                            try
                                            {
                                              axios.put(`${base_url}/api/post/dislikes`,{postId:id} , {headers : {"Authorization" : `Bearer ${localStorage.getItem("jwt")}`} })
                                              .then(res =>{
                                                            // console.log(res);
                                                            const newData = data.map(currentElement=>{
                                                                                                        if(currentElement._id == res._id)
                                                                                                         {
                                                                                                              return res;
                                                                                                          }else
                                                                                                           {
                                                                                                              return currentElement;
                                                                                                           }
                                                                                                        }
                                                                                        )
                                                              setData(newData);
                                                          }
                                                      ).catch(err=>{
                                                                        console.log(err);
                                                                      }
                                                              )
                                              navigate("/profile");
                                            }catch (e)
                                             {
                                               console.log(e);
                                               console.log(e.response.data.error);
                                             }
                                        }

  const handlePostComments = (text, postId) =>{
                                          try
                                          {
                                             axios.put(`${base_url}/api/post/comments`,{text, postId} , {headers : {"Authorization" : `Bearer ${localStorage.getItem("jwt")}`} })
                                             .then(res =>{
                                                              console.log("handlePostComments res ", res);
                                                              const newData = data.map(currentElement=>{
                                                                                                          if(currentElement._id == res._id)
                                                                                                           {
                                                                                                                return res;
                                                                                                            }else
                                                                                                             {
                                                                                                                return currentElement;
                                                                                                             }
                                                                                                          }
                                                                                          )
                                                                setData(newData);
                                                         }
                                                  ).catch(err=>{
                                                                  console.log(err);
                                                                }
                                                          )
                                              navigate("/profile");
                                          }catch (e)
                                           {
                                             console.log(e);
                                           }
                                  }



  const fetchAllPost = async () =>{
                                    try
                                    {
                                      let res = await axios.get(`${base_url}/api/allpost`, {headers : {"Authorization" : `Bearer ${localStorage.getItem("jwt")}`} });
                                      setData(res.data.allPostDetails);
                                    }catch (e)
                                      {
                                        console.log(e);
                                        console.log(e.response.data.error);
                                      }
                                  }

  useEffect( () =>{
                      fetchAllPost();
                      getAuthUser();
                  },[]);



  return(<>
                  <Navbar />
                  {
                    data.map( (currentElement, index) =>{
                                                          return(
                                                                  <VStack className="bg-gray-100 mt-16" key = {currentElement._id} style={{fontFamily: "'Inter', sans-serif"}}>
                                                                    <Card maxW="lg" bgColor="white" my="3rem">
                                                                      <CardHeader>
                                                                        <NavLink to={currentElement.postedBy._id !== user._id? "/profile/found/"+currentElement.postedBy._id : "/profile"}>
                                                                         <HStack spacing="1rem">
                                                                          <Avatar name={currentElement.postedBy.uname} src={currentElement.postedBy.profile_pic} size="sm"/>
                                                                          <Heading size='md' className="capitalize">
                                                                            {currentElement.postedBy.uname}
                                                                          </Heading>
                                                                        </HStack>
                                                                        </NavLink>
                                                                      </CardHeader>
                                                                      <CardBody>
                                                                        <Image src={currentElement.post_pic_url} boxSize="30rem" alt="post" borderRadius="lg" boxShadow='2xl' mb="0.5rem"/>
                                                                        {
                                                                            currentElement.likes.includes(user._id) ?
                                                                              <i className="bi bi-heart-fill text-2xl font-bold text-red-500 ml-2" onClick={()=> handlePostDislikes(currentElement._id)}></i>
                                                                              :
                                                                              <i className="bi bi-heart text-2xl font-bold ml-2" onClick={()=> handlePostLikes(currentElement._id)}></i>

                                                                        }
                                                                        <p className="mt-3 ml-3 font-medium text-sm">{currentElement.likes.length} likes</p>
                                                                        <p className="text-lg font-semibold my-3 ml-3 capitalize">{currentElement.post_title}</p>
                                                                        <p className="text-md font-normal ml-3">{currentElement.post_body}</p>
                                                                        {
                                                                          currentElement.comments.map((curr,index)=>{
                                                                                                                      return (<>
                                                                                                                               <HStack key={index}>
                                                                                                                                <h1 className="font-bold text-md ml-2">
                                                                                                                                    {curr.postedBy.uname}
                                                                                                                                </h1>
                                                                                                                                <h2 className="font-medium text-sm">
                                                                                                                                  {curr.text}
                                                                                                                                </h2>
                                                                                                                               </HStack>
                                                                                                                             </>)
                                                                                                                    }
                                                                                                     )
                                                                        }

                                                                        <form onSubmit={(e) =>{
                                                                                                  e.preventDefault();
                                                                                                  handlePostComments(e.target[0].value, currentElement._id);
                                                                                              }
                                                                                       }
                                                                        >
                                                                          <Input type="text" name="text" placeholder='add comments' variant='flushed' ml="3" size='lg' width="22em" color='gray.900' fontSize='1.2rem'
                                                                                  autoComplete="off"/>
                                                                        </form>
                                                                      </CardBody>
                                                                    </Card>
                                                                  </VStack>
                                                                );
                                                          }
                            )
                  }

        </>);
}

// <NavLink to={"/profile/found/"+currentElement.postedBy._id}></NavLink>
