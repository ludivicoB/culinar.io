import React, { useState, useEffect } from "react";
import { Container, Backdrop, CircularProgress } from "@mui/material";
import AvatarComponent from "../components/AvatarComponent";
import PersonalInfoForm from "../components/PersonalInfoForm";
import PasswordUpdateForm from "../components/PasswordUpdateForm";
import axios from "axios";
import PageLoader from "../components/util/PageLoader";

const ProfilePage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);
  
  useEffect(() => {
    console.log(loading)
    window.scrollTo(0,0)
    const fetchProfilePicture = async () => {
      try {
        const response = await axios.get(`${apiUrl}/profile-picture`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.avatar) {
          setAvatar(response.data.avatar);
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("Error fetching profile picture:", error);
      } finally {
      }
    };

    fetchProfilePicture();
  }, []);


  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        paddingTop: '1rem', 
        padding: { xs: "2rem", md: "5rem " }, 
        backgroundColor: "#CCDDEA" 
      }}
    >
      {user ? (
        <>
        <AvatarComponent 
        color={user.banner_color} 
        updateProfilePicture={(newAvatarFileName) => {
          setUser((prevUser) => ({ ...prevUser, avatar: newAvatarFileName }));
          localStorage.setItem(
            "user",
            JSON.stringify({ ...user, avatar: newAvatarFileName })
          );
        }}
        avatarimg={avatar} 
        setLoading={setLoading}
      />
          <PersonalInfoForm user={user} setUser={setUser} />
          <PasswordUpdateForm />
        </>
      ):(
        <PageLoader message={'Loading Profile'} />
      )}
      <Backdrop open={loading} sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default ProfilePage;
