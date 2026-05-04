import React, {useContext} from 'react'
import styled from 'styled-components'
import {AuthContext} from "../../context/AuthContext";

const LoginContainer = styled.div`
    position: absolute;
    right: 10px;
    top: 0;
    display: flex;
    flex-direction: row;
    margin-top: 0.5vh;
    height: 40px;
    padding: 5px 5px;
    background-color: #282c34;
    border: white 1px solid;
    border-radius: 10px;
    font-size: clamp(6px, 2.5vw, 20px);
    justify-content: center;
    align-items: center;
    z-index: 1
`;

const Avatar = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
    padding-right: 10px;
`;

const LoginLogoutButton = styled.div`
    border-radius: 4px;
    padding: 4px 8px;
    cursor: pointer;
    font-size: 15px;
    color: darkgrey;

    &:hover {
        color: #f0f0f0;
    }
`;

const GoogleLogin: React.FC<any> = () => {
    const {authUser} = useContext(AuthContext);
    const {user, signIn, signOut, isAuthenticated} = authUser;

    if (isAuthenticated) {
        return (
            <LoginContainer>
                <Avatar
                    src={user?.user_metadata?.avatar_url}
                    alt="avatar"
                    title={user?.email}
                />
                <LoginLogoutButton onClick={signOut}>Quit</LoginLogoutButton>
            </LoginContainer>
        )
    }

    return (
        <LoginContainer>
            <LoginLogoutButton onClick={signIn}>
                Sign in with Google
            </LoginLogoutButton>
        </LoginContainer>
    )
}

export default GoogleLogin