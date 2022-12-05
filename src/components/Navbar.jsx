import {Flex, Box, Heading, Button, ButtonGroup, Spacer, Text, Avatar, Tooltip} from "@chakra-ui/react";
import {NavLink, useNavigate} from "react-router-dom";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react';
import {useEffect} from "react";
import {useAuthContext} from "../context/AuthContext";

export default function Navbar()
{
  let {user, getAuthUser} = useAuthContext();

  useEffect( ()=>{
                    getAuthUser();
                  },[]
          );

  const navigate = useNavigate();
  const logOut = () => {
                          localStorage.removeItem("user");
                          localStorage.removeItem("jwt");
                          navigate("/");
                        }


  return(<>
            <Flex  gap='1' px="2.5rem" className="shadow-lg shadow-gray-300 ">
              <Box p='2'>
                <Text fontSize='5xl' style={{fontFamily: "'Grand Hotel', cursive"}}>
                  Photogram
                </Text>
              </Box>
              <Spacer />
              <ButtonGroup gap='1' mt="1.5rem" style={{fontFamily: "'Inter', sans-serif"}}>
                <Button as={NavLink} to="/profile_home" bg="white" _hover={{ bg: 'white' }}>
                  <i className="bi bi-house-door text-3xl text-gray-900"></i>
                </Button>

                <Tooltip hasArrow label='Search Profile' bg='gray.100' color="gray.900" p="4" fontSize="md" borderRadius='lg'>
                  <Button as={NavLink} to="/search_profile" bg="white" _hover={{ bg: 'white' }}>
                    <i className="bi bi-search text-3xl"></i>
                  </Button>
                </Tooltip>

                <Tooltip hasArrow label='Create Post' bg='gray.100' color="gray.900" p="4" fontSize="md" borderRadius='lg'>
                  <Button as={NavLink} to="/create_post" bg="white" _hover={{ bg: 'white' }}>
                    <i className="bi bi-plus-circle text-3xl text-gray-900"></i>
                  </Button>
                </Tooltip>

                <Menu>
                  <MenuButton as={Button} bg="white" _hover={{ bg: 'white' }}>
                    <Avatar name={user?.uname} src={user?.profile_pic} size="sm" />
                  </MenuButton>
                  <MenuList>
                   <MenuGroup letterSpacing="2px" title={"Welcome "+user?.uname}>
                   <NavLink to="/profile">
                    <MenuItem icon={<i className="bi bi-person-circle text-xl"></i>} fontSize="lg">
                        View Profile
                    </MenuItem>
                   </NavLink>
                    <MenuItem icon={<i className="bi bi-box-arrow-right text-xl"></i>} fontSize="lg" onClick={logOut}>
                        LogOut
                    </MenuItem>
                  </MenuGroup>
                  </MenuList>
                </Menu>
              </ButtonGroup>
            </Flex>
        </>);
}
