import { Tabs } from 'antd';
import styled from 'styled-components'
import ChatBox from './ChatBox'

const StyledTabs = styled(Tabs)`
  width: 100%;
  background: #eeeeee52;
  border-radius: 16px;
  margin: 20px;
  padding: 20px;
  display: flex;
  width: "100%";
`
// const { TabPane } = Tabs;

function TabBar({username, activeKey, setActiveKey, chatBoxes, addChatBox, removeChatBox}){

  const onChange = (key) => {
    setActiveKey(key);
  };

  const onEdit = (targetkey, action) => {
    switch(action){
      case 'remove':
        setActiveKey(removeChatBox(targetkey, activeKey));
        break;
      case 'add':
        addChatBox();
        break;
      default:
        console.log("action error");
    }
    // console.log(_plane)
    // console.log(action);
  };

  // const add = () => {
  //   openDialog();
  //   setPlane([...plane,{ title: 'New Tab', content: 'Content of new Tab' }]);
  // };

  // const remove = (key) =>{
  //   let newPlane = [...plane]
  //   newPlane.splice(key,1);
  //   setPlane(newPlane)
  // }

  return(
      <StyledTabs
          type="editable-card"
          // tabBarStyle={{height: "336px"}}
          activeKey={activeKey}
          onChange={onChange}
          onEdit={onEdit}
      >
      {chatBoxes.map((friend) => (
          <Tabs.TabPane tab={friend} key={friend} closable={true} >
              <ChatBox username={username} friend={friend} key={friend} />
          </Tabs.TabPane>
          ))}
      </StyledTabs>
  )
}

export default TabBar

// ReactDOM.render(<Demo />, mountNode);