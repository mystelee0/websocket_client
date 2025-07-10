import styled from "styled-components";

function ShowProfileImage({ type, item }) {
    console.log(item.profileImage);
    function renderImage() {
        switch (type) {
            case 1:
                return (
                    <ProfileImage src={item.profileImage || "/profile.jpg"} alt={item.name} />
                )
            case 3:
                return (
                    <AvatarGroup>
                        <AvatarImage
                            src={"/profile.jpg"}
                            style={{ bottom: "2px", left: "2px" }}
                        />
                        <AvatarImage
                            src={"/profile.jpg"}
                            style={{ bottom: "2px", right: "2px" }}
                        />
                        <AvatarImage
                            src={"/profile.jpg"}
                            style={{ top: "2px", left: "50%", transform: "translateX(-50%)" }}
                        />
                    </AvatarGroup>
                )
            
        }
    }
    return (
        <>
            {
                renderImage()
            }
        </>
    );
}

const ProfileImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 16px;
  margin-right: 12px;
`;

const AvatarGroup = styled.div`
  width: 48px;
  height: 48px;
  background: #f0f0f0;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  margin-right:12px;
`;

const AvatarImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
  position: absolute;
  border: 1px solid white;
`;

export default ShowProfileImage;