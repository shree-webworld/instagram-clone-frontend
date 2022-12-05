import { Container, Box, Input, InputGroup, InputRightElement, Button, Link, Text, Center,useToast } from '@chakra-ui/react';
import {useForm} from 'react-hook-form';
import {useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {useTitle} from "../utils/GeneralFunctions";
import axios from "axios";



export default function Signin()
{
  const { register, handleSubmit, reset, setFocus, setError, getValues, setValue, formState: {errors}  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordIcon = () => setShowPassword(!showPassword) ;
  useTitle("Signin • Photogram");
  const toast = useToast();
  const base_url = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();


  let onSubmit = async () =>{
                        try
                        {
                          let val = getValues();
                          // console.log(val);
                          let res = await axios.post(`${base_url}/api/signin_api`,val);
                          console.log("res signin_api ", res);
                          localStorage.setItem("jwt",res.data.token);
                          localStorage.setItem("user",JSON.stringify(res.data.user_exits));
                          navigate("/profile");
                          toast({
                                    title: 'Signin successfully',
                                    description: "Enjoy Photogram App.",
                                    status: 'success',
                                    duration: 4000,
                                    position: "top",
                                    isClosable: true,
                                  });

                        }catch (e)
                          {
                            console.log(e);
                            toast({
                                      title: 'Signin Failed',
                                      description: e.response.data.error,
                                      status: 'error',
                                      duration: 3000,
                                      position: "top",
                                      isClosable: true,
                                    });
                          }
                      }


  return(<>
            <Container centerContent bg="#FAFAFA" maxW='xl' my="5rem" className="border border-gray-500 rounded-lg" >
              <Box my="2rem" px="5rem">
                <Center className="text-6xl font-medium text-gray-900 pt-5" style={{fontFamily: "'Grand Hotel', cursive"}}>
                  Photogram
                </Center>
                <form onSubmit={handleSubmit(onSubmit)} style={{fontFamily: "'Inter', sans-serif"}}>
                  <Input type="email" {...register("email")} autoComplete="off" placeholder='Email' variant='filled' color="gray.900" fontSize="1rem" _placeholder={{color: 'gray.500' }} my="1.5rem"/>
                  <InputGroup>
                    <Input type={showPassword ? 'text' : 'password'} {...register("password")} autoComplete="off" placeholder='Password' variant='filled' color="gray.900" fontSize="1rem" _placeholder={{color: 'gray.500' }}/>
                      <InputRightElement>
                         <Button  size='sm' onClick={handlePasswordIcon}>
                            {showPassword ? <i className="zmdi zmdi-eye-off"></i> : <i className="zmdi zmdi-eye"></i>}
                         </Button>
                      </InputRightElement>
                  </InputGroup>

                  <Button type="submit" colorScheme='messenger' px="10rem" my="2rem" fontSize="lg" borderRadius='full'>
                    Log in
                  </Button>
                </form>
                <Center>
                    <Text my="1rem">
                      Don't have an account?{' '}
                      <Link as={NavLink} to="/" color='blue.500'>
                        Sign up
                      </Link>
                    </Text>
                </Center>

              </Box>
            </Container>
        </>);
}
