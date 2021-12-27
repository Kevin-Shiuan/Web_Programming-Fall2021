import { Tabs } from 'antd';

const { TabPane } = Tabs;

function TabBar({setActiveTabKey, plane, setPlane, openDialog, closeDialog}){
  const onChange = (key) => {
    setActiveTabKey(key);
    // console.log(key);
  };
  const onEdit = (key, action) => {
    switch(action){
      case 'remove':
        remove(key);
        break;
      case 'add':
        add();
        break;
      default:
        console.log("action error");
    }
    // console.log(_plane)
    // console.log(action);
  };

  const add = () => {
    openDialog();
    setPlane([...plane,{ title: 'New Tab', content: 'Content of new Tab' }]);
  };

  const remove = (key) =>{
    let newPlane = [...plane]
    newPlane.splice(key,1);
    setPlane(newPlane)
  }

  return(
      <Tabs
          type="editable-card"
          defaultActiveKey="0"
          onChange={onChange}
          onEdit={onEdit}
          style={{width: "100%"}}
      >
      {plane.map((pane, i) => (
          <TabPane tab={pane.title} key={i} >
              {pane.content}
          </TabPane>
          ))}
      </Tabs>
  )
}

export default TabBar

// ReactDOM.render(<Demo />, mountNode);