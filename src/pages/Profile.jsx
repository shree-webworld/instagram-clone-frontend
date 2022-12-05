import { Avatar, Container, HStack, Text, Center, Heading, VStack, Divider } from '@chakra-ui/react';
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import axios from "axios";
import ProfileFollowers from "../components/ProfileFollowers";
import ProfileFollowing from "../components/ProfileFollowing";
import {useTitle} from "../utils/GeneralFunctions";
import {useAuthContext} from "../context/AuthContext";
import {useEffect, useState} from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

export default function Profile()
{
  useTitle("Profile • Photogram");
  let {user, getAuthUser} = useAuthContext();
  let [postCount, setPostCount] = useState([]);
  const base_url = import.meta.env.VITE_BASE_URL;


  let handlePostCount = async () =>{
                                  try
                                  {
                                    let res = await axios.get(`${base_url}/api/mypost`, {headers : {"Authorization" : `Bearer ${localStorage.getItem("jwt")}`} });
                                    console.log("for post count",res.data.myPostDetails);
                                    setPostCount(res.data.myPostDetails.length);
                                  }catch (e)
                                   {
                                      console.log(e);
                                   }
                                }


  useEffect( ()=>{
                    getAuthUser();
                    handlePostCount();
                  },[]);


  return(<>
              <Navbar />
              <Container maxW="7xl" mt="2rem" centerContent  style={{fontFamily: "'Inter', sans-serif"}}>
                <HStack spacing="10rem">
                  <Avatar name={user?.uname} src={user?.profile_pic} size="2xl" />
                    <VStack>
                      <Heading size="xl" mb="0.5rem" className="capitalize">
                          {user?.uname}
                      </Heading>
                      <Text as="i" fontSize="lg" mb="1rem">
                          {user?.email}
                      </Text>
                      <HStack spacing="3rem">
                        <Text fontSize="md">{postCount} posts</Text>
                        <Text fontSize="md">{user?user.followers.length:"0"} followers</Text>
                        <Text fontSize="md">{user?user.following.length:"0"} following</Text>
                      </HStack>
                  </VStack>
                </HStack>
              </Container>


            <Tabs variant='solid-rounded' size="lg" isFitted mt="3rem" style={{fontFamily: "'Inter', sans-serif"}}>
              <TabList>
                <Tab _selected={{ color: 'white', bg: 'blue.500' }} color="blue.500" bg="gray.200">View Posts</Tab>
                <Tab _selected={{ color: 'white', bg: 'blue.500' }} color="blue.500" bg="gray.200">Followers</Tab>
                <Tab _selected={{ color: 'white', bg: 'blue.500' }} color="blue.500" bg="gray.200">Following</Tab>
              </TabList>
              <TabPanels>
                  <TabPanel>
                    <PostCard />
                  </TabPanel>
                  <TabPanel>
                    <ProfileFollowers />
                  </TabPanel>
                  <TabPanel>
                    <ProfileFollowing />
                  </TabPanel>
                </TabPanels>
            </Tabs>

        </>);
}
