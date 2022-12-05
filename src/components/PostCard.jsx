import { Card, CardHeader, CardBody, CardFooter, Image, Heading, Input, Text, VStack, Flex, useToast, Avatar } from '@chakra-ui/react';
import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function PostCard()
{
  const base_url = import.meta.env.VITE_BASE_URL;
  let [data, setData] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();


  const fetchMyPost = async () =>{
                              try
                              {
                                let res = await axios.get(`${base_url}/api/mypost`, {headers : {"Authorization" : `Bearer ${localStorage.getItem("jwt")}`} });
                                console.log(res.data.myPostDetails);
                                setData(res.data.myPostDetails);
                              }catch (e)
                               {
                                  console.log(e);
                                  console.log(e.response.data.error);
                               }
                                  }

  useEffect( () =>{
                      fetchMyPost();
                  },[]);

  const handlePostDelete = async (postId) =>{
                                              try
                                              {
                                                let res = await axios.delete(`${base_url}/api/post/delete/${postId}`, {headers : {"Authorization" : `Bearer ${localStorage.getItem("jwt")}`} });
                                                console.log(res);
                                                toast({
                                                          title: 'Successfull',
                                                          description: "Post deleted successfully",
                                                          status: 'success',
                                                          duration: 3000,
                                                          position: "top",
                                                          isClosable: true,
                                                      });
                                                navigate("/profile_home");
                                              }catch (e)
                                               {
                                                  console.log(e);
                                                  console.log(e.response.data.error);
                                               }
                                             }




  return(<>
    {
      data.map( (currentElement, index) =>{
                                            return(
                                                    <VStack className="bg-gray-100 mt-4" key = {currentElement._id} style={{fontFamily: "'Inter', sans-serif"}}>
                                                      <Card maxW="lg" bgColor="white" my="2rem">
                                                        <CardHeader>
                                                          <Flex spacing='4'>
                                                            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                                              <Avatar name={currentElement.postedBy.uname} src={currentElement.postedBy.profile_pic} size="sm" />
                                                              <Heading size='md' className="capitalize">
                                                                {currentElement.postedBy.uname}
                                                              </Heading>
                                                            </Flex>
                                                            <i className="ri-delete-bin-5-fill text-2xl text-red-500"
                                                               onClick={()=>handlePostDelete(currentElement._id)}
                                                            >
                                                            </i>
                                                          </Flex>
                                                        </CardHeader>
                                                        <CardBody>
                                                          <Image src={currentElement.post_pic_url} boxSize="30rem" alt="post" borderRadius="lg"/>
                                                          <p className="text-xl font-semibold my-3 ml-3 capitalize">
                                                            {currentElement.post_title}
                                                          </p>
                                                          <p className="text-md font-normal ml-3 capitalize">
                                                            {currentElement.post_body}
                                                          </p>
                                                          <Input type="text" placeholder='add comments' variant='flushed' ml="3" size='lg' width="22em" color='gray.900' fontSize='1.2rem'/>
                                                        </CardBody>
                                                      </Card>
                                                    </VStack>
                                                  );
                                            }
              )
    }
        </>);
}
