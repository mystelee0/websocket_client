function ChatRoom(){

    return (
                <>
                  <ChatHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                  <BodyArea>
                    <ChatMessages />
                    <SideMenu menuOpen={menuOpen} />
                  </BodyArea>
                  <ChatInput client={client} />
                </>
    )
}

const BodyArea = styled.div`
  flex: 1;
  display: flex;
  position: relative;
  overflow: hidden;
`;

export default ChatRoom;