import {useTitle} from "../utils/GeneralFunctions";
import Navbar from "../components/Navbar";
import {useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import { Avatar, Container, HStack, Text, Center, Heading, VStack, Divider, Image, Button } from '@chakra-ui/react';
import {useAuthContext} from "../context/AuthContext";

export default function FoundProfile()
{
  useTitle("Search Profile Result • Photogram");
  const base_url = import.meta.env.VITE_BASE_URL;
  let {userid} = useParams();
  let {updateFollowUnfollow, user, getAuthUser} = useAuthContext();

  let [userProfile, setUserProfile] = useState(null);
  let [showFollowButton, setShowFollowButton] = useState(user?!user.following.includes(userid):true);

  let handleProfileFound = async () =>{
                                  try
                                  {
                                    let res = await axios.get(`${base_url}/api/profile/search/${userid}`, {headers : {"Authorization" : `Bearer ${localStorage.getItem("jwt")}`} });
                                    console.log(res.data);
                                    setUserProfile(res.data);

                                  }catch (e)
                                    {
                                        console.log(e);
                                        console.log(e.response.data.error);
                                    }
                                }

  let followProfile = async () =>{
                              try
                              {
                                let res = await axios.put(`${base_url}/api/profile/followers`,{ followId:userid }, {headers : {"Authorization" : `Bearer ${localStorage.getItem("jwt")}`} });
                                console.log(res);
                                // localStorage.setItem("user",JSON.stringify(res.data));
                                let following = res.data.following;
                                let followers = res.data.followers;
                                console.log(`${following} and ${followers}`);
                                 await updateFollowUnfollow( following, followers);
                                localStorage.setItem("user",JSON.stringify(res.data));

                                setUserProfile( (prevState)=>{
                                                                return{
                                                                        ...prevState,
                                                                        profile_exists:{
                                                                                ...prevState.profile_exists,
                                                                                followers:[...prevState.profile_exists.followers, res.data._id]
                                                                             }
                                                                      }
                                                             }
                                              )
                                setShowFollowButton(false);

                              }catch (e)
                                {
                                  console.log(e);
                                }
                           }


                      let unfollowProfile = async () =>{
                                                       try
                                                       {
                                                         let res = await axios.put(`${base_url}/api/profile/unfollowers`,{ unfollowId : userid }, {headers : {"Authorization" : `Bearer ${localStorage.getItem("jwt")}`} });
                                                         console.log(res);

                                                         let following = res.data.following;
                                                         let followers = res.data.followers;
                                                         console.log(`${following} and ${followers}`);
                                                          await updateFollowUnfollow( following, followers);
                                                         localStorage.setItem("user",JSON.stringify(res.data));

                                                         setUserProfile( (prevState)=>{
                                                                                        const newFollower = prevState.profile_exists.followers.filter(item=>item != res.data._id );
                                                                                         return{
                                                                                                 ...prevState,
                                                                                                 profile_exists:{
                                                                                                         ...prevState.profile_exists,
                                                                                                         followers:newFollower
                                                                                                      }
                                                                                               }
                                                                                      }
                                                                       );
                                                          setShowFollowButton(true);

                                                       }catch (e)
                                                         {
                                                           console.log(e);
                                                         }
                                                    }

  useEffect( () =>{
                    handleProfileFound();
                    getAuthUser();
                  },[]);

  return(<>
              <Navbar />
              {
                userProfile &&

                <Container maxW="7xl" mt="2rem" centerContent style={{fontFamily: "'Inter', sans-serif"}}>
                  <HStack spacing="10rem">
                    <Avatar name={userProfile?.profile_exists.uname} src={userProfile?.profile_exists.profile_pic} size="2xl" />
                      <VStack>
                        <Heading size="xl" mb="1rem" className="capitalize">
                            {userProfile?.profile_exists.uname}
                        </Heading>
                        <HStack spacing="3rem">
                          <Text fontSize="md">{userProfile?.post_exists.length} posts</Text>
                          <Text fontSize="md">{userProfile?.profile_exists.followers.length} followers</Text>
                          <Text fontSize="md">{userProfile?.profile_exists.following.length} following</Text>
                        </HStack>
                        {
                          showFollowButton ?
                          <Button colorScheme='messenger' px="3rem" size="lg" onClick={followProfile}>
                            Follow
                          </Button>
                          :
                          <Button colorScheme='messenger' px="3rem" size="lg" onClick={unfollowProfile}>
                            Unfollow
                          </Button>
                        }
                    </VStack>
                  </HStack>
                  <Divider orientation='horizontal' mt="4rem" />
                </Container>
              }
              {
                userProfile &&

                userProfile?.post_exists.map(curr =>{
                                                      return (
                                                                <VStack spacing="4rem" my="2rem" key={curr._id} style={{fontFamily: "'Inter', sans-serif"}}>
                                                                  <Image src={curr.post_pic_url} boxSize="20rem" alt="post" borderRadius="lg" boxShadow="dark-lg"/>
                                                                </VStack>
                                                              )
                                                  }
                                           )

              }

        </>);
}
