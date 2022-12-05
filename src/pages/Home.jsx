import {useTitle} from "../utils/GeneralFunctions";
import {Image, Input, Button, Text, Link, InputGroup, InputRightElement, useToast, Tooltip, Tag, TagLabel, TagCloseButton } from '@chakra-ui/react';
import {useForm} from 'react-hook-form';
import {NavLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

export default function Home()
{
  useTitle("Photogram");

  const { register, handleSubmit, reset, setFocus, setError, getValues, setValue, formState: {errors}  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);
  const handlePasswordIcon = () => setShowPassword(!showPassword) ;
  const handleConfirmPasswordIcon = () => setConfirmPassword(!showConfirmPassword) ;
  const base_url = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const toast = useToast();


  let profilePicUrl = async (image) =>{
                                  try
                                  {
                                    const data = new FormData();
                                    data.append("file",image);
                                    data.append("upload_preset","photogram");
                                    data.append("cloud_name","shreeproject");
                                    let res = await axios.post("https://api.cloudinary.com/v1_1/shreeproject/image/upload",data);
                                    console.log(res);
                                    return res.data.secure_url;

                                  }catch (e)
                                    {
                                      console.log(e);
                                      console.log(e.response.data.error);
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

                                  let {uname, email, password, confirm_password, pic} = val;
                                  let profile_pic = await profilePicUrl(pic[0]);
                                  console.log("url - ", profile_pic);

                                  let res = await axios.post(`${base_url}/api/signup_api`, {uname, email, password, confirm_password, profile_pic});
                                  console.log("res signup_api ", res);
                                  reset();
                                  navigate("/signin");
                                  toast({
                                            title: 'Signup successfully',
                                            description: "Please Login, now",
                                            status: 'success',
                                            duration: 4000,
                                            position: "top",
                                            isClosable: true,
                                          });

                                }catch (e)
                                  {
                                    console.log(e);
                                    toast({
                                              title: 'Signup Failed',
                                              description: e.response.data.error,
                                              status: 'error',
                                              duration: 3000,
                                              position: "top",
                                              isClosable: true,
                                            });
                                  }
                              }

  return(<>
    <section className="p-6 text-gray-800 bg-[#FAFAFA]" style={{fontFamily: "'Inter', sans-serif"}}>
    	<div className="container grid gap-6 mx-auto text-center lg:grid-cols-2 xl:grid-cols-5">
    		<div className="w-full px-6 py-16 rounded-md border border-gray-500 sm:px-12 md:px-16 xl:col-span-2 bg-[#FFFEFE]">
    			<h1 className="text-6xl font-medium text-gray-900" style={{fontFamily: "'Grand Hotel', cursive"}}>
            Photogram
          </h1>
    			<div className="my-7">
    				<span className="font-medium text-gray-500 text-lg">Sign up to see photos and videos</span>
            <p className="font-medium text-gray-500 text-lg">from your friends.</p>
    			</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input type="text" {...register("uname")} autoComplete="off" placeholder='Name' variant='filled' color="gray.900" fontSize="1rem" _placeholder={{color: 'gray.500' }} className="capitalize"/>
            <Input type="email" {...register("email")} autoComplete="off" placeholder='Email' variant='filled' color="gray.900" fontSize="1rem" _placeholder={{color: 'gray.500' }} my="1.5rem" />
            <InputGroup>
              <Input type={showPassword ? 'text' : 'password'} {...register("password")} autoComplete="off" placeholder='Password' variant='filled' color="gray.900" fontSize="1rem" _placeholder={{color: 'gray.500' }}/>
                <InputRightElement>
                   <Button  size='sm' onClick={handlePasswordIcon}>
                      {showPassword ? <i className="zmdi zmdi-eye-off"></i> : <i className="zmdi zmdi-eye"></i>}
                   </Button>
                </InputRightElement>
            </InputGroup>

            <InputGroup my="1.5rem">
              <Input type={showConfirmPassword ? 'text' : 'password'} {...register("confirm_password")} autoComplete="off" placeholder='Re-enter password' variant='filled' color="gray.900" fontSize="1rem" _placeholder={{color: 'gray.500' }} />
                <InputRightElement>
                   <Button  size='sm' onClick={handleConfirmPasswordIcon}>
                      {showConfirmPassword ? <i className="zmdi zmdi-eye-off"></i> : <i className="zmdi zmdi-eye"></i>}
                   </Button>
                </InputRightElement>
            </InputGroup>

           <Tooltip hasArrow label='Upload profile pic' bg='gray.50' color="gray.900" p="2" placement='top' fontSize="md" borderRadius='lg'>
            <Input type="file" {...register("pic")} autoComplete="off" variant='filled' color="gray.900" fontSize="1rem"/>
           </Tooltip>
            <Button type="submit" colorScheme='messenger' w={{md:"23.5rem", sm:"27rem"}} mt="1.5rem" fontSize="lg" borderRadius='full'>
              Sign up
            </Button>
          </form>
          <Text mt="2rem">
            Have an account?{' '}
            <Link as={NavLink} to="/signin" color='blue.500'>
              Log in
            </Link>
          </Text>
          <Tag mt="2rem" variant="solid" colorScheme="messenger" borderRadius='full' size="sm">
            <TagLabel px="2" py="1" color="white">
              Made with <i className="bi bi-heart-fill text-red-600"></i> by Shreedhar
            </TagLabel>
          </Tag>
    		</div>
        <Image src="https://picsum.photos/2000" alt="Photogram" maxW={{md:"2xl", lg:"3xl"}} objectFit="cover" borderRadius='lg' overflow='hidden'/>
    	</div>
    </section>
        </>);
}
