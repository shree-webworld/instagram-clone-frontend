import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import Profile_Home from "./pages/Profile_Home";
import CreatePost from "./pages/CreatePost";
import SearchProfile from "./pages/SearchProfile";
import FoundProfile from "./pages/FoundProfile";
import {Routes, Route, Navigate, useParams } from "react-router-dom";
import {ProtectedRoutes, CheckRoutes} from "./utils/AuthRoutes";




export default function App()
{

  return(<>

            <Routes>
              <Route element={<CheckRoutes />}>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<Signin />} />
              </Route>

              <Route element={ <ProtectedRoutes /> }>
                <Route path="/profile" element={<Profile />} />
                <Route path="/search_profile" element={<SearchProfile />} />
                <Route path="/profile_home" element={<Profile_Home />} />
                <Route path="/create_post" element={<CreatePost />} />
              </Route>

              <Route path="/profile/found/:userid" element={<FoundProfile />} />


              <Route path='/*' element={<Navigate to="/" />} />
            </Routes>

        </>);
}
