import Navbar from "../components/Navbar";
import { Container, Box, Input, InputGroup, InputRightElement, Button, Link, Text, Center, useToast } from '@chakra-ui/react';
import {useForm} from 'react-hook-form';
import {useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {useTitle} from "../utils/GeneralFunctions";
import axios from "axios";


export default function CreatePost()
{
  useTitle("Create Post • Photogram");
  const { register, handleSubmit, reset, setFocus, setError, getValues, setValue, formState: {errors}  } = useForm();
  const base_url = import.meta.env.VITE_BASE_URL;
  const cloudinary_url = import.meta.env.VITE_CLOUDINARY_URL;

  const navigate = useNavigate();
  const toast = useToast();

  const [title,setTitle] = useState("");
  const [body,setBody] = useState("");
  const [url,setUrl] = useState("");


  let postDetails = async (image) =>{
                                  try
                                  {
                                    const data = new FormData();
                                    data.append("file",image);
                                    data.append("upload_preset","photogram");
                                    data.append("cloud_name","shreeproject");
                                    let res = await axios.post(`${cloudinary_url}`,data);
                                    console.log(res);
                                    return res.data.secure_url;

                                  }catch (e)
                                    {
                                      console.log(e);
                                    }
                               }

  let onSubmit = async (val) =>{
                                  try
                                  {
                                    toast({
                                              title: 'Please Wait ',
                                              description: "Don't Refresh page or Click Back Button",
                                              status: 'info',
                                              duration: 3000,
                                              position: "top",
                                              isClosable: true,
                                          });

                                    let {post_title, post_body, pic} = val;
                                    let post_pic_url = await postDetails(pic[0]);
                                    console.log("url - ", post_pic_url);
                                    let res2 = await axios.post(`${base_url}/api/createpost`, {post_title, post_body, post_pic_url}, {headers : {"Authorization" : `Bearer ${localStorage.getItem("jwt")}`} });
                                    console.log(res2);
                                    if(res2.status === 201)
                                    {
                                      toast({
                                                title: 'Successfull',
                                                description: "Posted successfully",
                                                status: 'success',
                                                duration: 3000,
                                                position: "top",
                                                isClosable: true,
                                            });
                                      navigate("/profile");
                                    }

                                  }catch (e)
                                    {
                                        console.log(e);
                                        toast({
                                                  title: 'Failed',
                                                  description: e.response.data.error,
                                                  status: 'error',
                                                  duration: 3000,
                                                  position: "top",
                                                  isClosable: true,
                                              });
                                    }
                      }



  return(<>
            <Navbar />

              <Container centerContent bg="#FAFAFA" maxW='xl' my="5rem" className="border border-gray-500 rounded-lg" style={{fontFamily: "'Inter', sans-serif"}}>
                <Box my="2rem" px="5rem">
                  <p className="text-3xl font-medium text-gray-900 pt-5">
                    Create Post
                  </p>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Input type="text" {...register("post_title")} autoComplete="off" placeholder='Title' variant='flushed' color="gray.900" fontSize="1rem" _placeholder={{color: 'gray.500' }} my="1.5rem"
                          className="capitalize"/>
                    <Input type="text" {...register("post_body")} autoComplete="off" placeholder='Add post comments' variant='flushed' color="gray.900" fontSize="1rem" _placeholder={{color: 'gray.500' }}
                            className="capitalize"/>
                    <Input type="file" {...register("pic")} autoComplete="off" variant='flushed' color="gray.900" fontSize="1rem"  mt="2rem"/>

                    <Button type="submit" colorScheme='messenger' px="10rem" my="2rem" fontSize="lg" borderRadius='full'>
                      Share <i className="bi bi-send-fill mx-2"></i>
                    </Button>
                  </form>

                </Box>
              </Container>

        </>);
}
