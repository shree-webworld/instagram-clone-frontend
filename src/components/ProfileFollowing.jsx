import { Box, Input, Button,  Text, Center, Avatar, HStack, VStack } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Image } from '@chakra-ui/react';
import {NavLink} from "react-router-dom";
import {useAuthContext} from "../context/AuthContext";
import {useEffect, useState} from "react";
import axios from "axios";

export default function ProfileFollowing()
{
  let {user, getAuthUser} = useAuthContext();
  const base_url = import.meta.env.VITE_BASE_URL;
  let [followingData, setFollowingData] = useState([]);


  let handleFollowingList = async () =>{
                                      try
                                      {
                                        let email = user.email;
                                        // console.log("email", email);
                                        let res = await axios.post(`${base_url}/api/profile/following/list`,{email}, {headers : {"Authorization" : `Bearer ${localStorage.getItem("jwt")}`} });
                                        // console.log("followingListDetails ",res.data);
                                        setFollowingData(res.data.followingListDetails.following);
                                      }catch (e)
                                       {
                                         console.log(e);
                                         console.log(e.response.data.error);
                                       }
                                    }

  useEffect( ()=>{
                    handleFollowingList();
                    getAuthUser();
                 },[])

  return(<>
    {
      followingData?.map( (currentElement, index) =>{
                                            return(
                                                      <Center key={currentElement._id} style={{fontFamily: "'Inter', sans-serif"}}>
                                                        <NavLink to={`/profile/found/${currentElement._id}`}>
                                                        <Box borderRadius='full' w="30rem"  bg="gray.100" mt="3rem">
                                                         <HStack spacing="1rem">
                                                          <Avatar size="xl" name={currentElement.uname} src={currentElement.profile_pic} />
                                                           <VStack >
                                                            <Heading size='md' color="gray.900" className="capitalize">
                                                              {currentElement.uname}
                                                            </Heading>
                                                            <Text py='2' color="gray.900">
                                                              {currentElement.email}
                                                            </Text>
                                                          </VStack>
                                                         </HStack>
                                                        </Box>
                                                      </NavLink>
                                                      </Center>
                                                  );
                                            }
              )
    }

        </>);
}
