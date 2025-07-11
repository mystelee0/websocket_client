import styled from "styled-components";

function ShowProfileImage({ type, contents }) {
    console.log("showprofileimage", contents.profileImage);

    //서버에 프로필 이미지 요청
    function getProfileImages() {
        if (type === 1) {
            axios.get(`/users/${contents.mobNum||contents.sender.mobNum}/profileUrl`)
                .then((res) => {
                    console.log("프로필url", res);
                    srcUrl = res.data;
                })
        }else{
            axios.get(`/users/${contents.sender.mobNum}/profileUrl`)
                .then((res) => {
                    console.log("프로필url", res);
                    srcUrl = res.data;
                })
        }

    }
    //이미지 경로, 이미지 없으면 기본 이미지로 지정됨
    let srcUrl;
    srcUrl = srcUrl || "/profile.jpg";

    function renderImage() {
        switch (type) {
            case 1:
                return (
                    <ProfileImage src={srcUrl} alt="profile image" />
                )
            case 3:
                return (
                    <AvatarGroup>
                        <AvatarImage
                            src={srcUrl}
                            style={{ bottom: "2px", left: "2px" }}
                        />
                        <AvatarImage
                            src={srcUrl}
                            style={{ bottom: "2px", right: "2px" }}
                        />
                        <AvatarImage
                            src={srcUrl}
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