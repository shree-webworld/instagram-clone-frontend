import {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import {useTitle} from "../utils/GeneralFunctions";
import axios from "axios";
import {useAuthContext} from "../context/AuthContext";
import {useForm} from 'react-hook-form';
import { Box, Input, Button,  Text, Center, Avatar, HStack, VStack } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Image } from '@chakra-ui/react';
import {NavLink} from "react-router-dom";

export default function SearchProfile()
{
  useTitle("Search Profile • Photogram");

  let {user, getAuthUser} = useAuthContext();

  const base_url = import.meta.env.VITE_BASE_URL;
  const { register, handleSubmit, reset, setFocus, setError, getValues, setValue, formState: {errors}  } = useForm();

  let [showProfile, setShowProfile] = useState(null);

  let handleSearchProfile = async (val) =>{
                                          try
                                          {
                                            let res = await axios.post(`${base_url}/api/profile/search`, val, {headers : {"Authorization" : `Bearer ${localStorage.getItem("jwt")}`} });
                                            console.log(res);
                                            setShowProfile(res.data);
                                            console.log("showProfile -",showProfile);
                                          }catch (e)
                                          {
                                            console.log(e);
                                            console.log(e.response.data.error);
                                          }
                                        }

  useEffect(()=>{
                  getAuthUser();
                  console.log(user);
                },[]);
  return(<>
              <Navbar />
               <Center style={{fontFamily: "'Inter', sans-serif"}}>
                <form onSubmit={handleSubmit(handleSearchProfile)}>
                  <Input type="text" {...register("uname")} autoComplete="off" placeholder="Enter profile name to search"
                        variant='outline' color="gray.900" fontSize="1rem" _placeholder={{color: 'gray.500' }} my="1.5rem"
                        borderRadius="full" width="25rem" size="lg" mt="3rem"/>
                </form>

              </Center>
                {
                  showProfile &&
                  <Center style={{fontFamily: "'Inter', sans-serif"}}>
                    <NavLink to={showProfile?._id !== user._id? "/profile/found/"+showProfile._id : "/profile"}>
                    <Box borderRadius='full' w="36rem"  bg="gray.100" mt="3rem">
                     <HStack spacing="1rem">
                      <Avatar size="2xl" name={showProfile?.uname} src={showProfile?.profile_pic} />
                       <VStack >
                        <Heading size='lg' color="gray.900">{showProfile?.uname}</Heading>
                        <Text py='2' color="gray.900">
                          {showProfile?.email}
                        </Text>
                      </VStack>
                     </HStack>
                    </Box>
                  </NavLink>
                  </Center>
                }

        </>);
}

// <NavLink to={"/profile/found/"+showProfile?._id}>
