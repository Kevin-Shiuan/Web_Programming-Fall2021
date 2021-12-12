import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Title from "../components/Title";
import H1 from '../components/H1'

const SignIn = ({ me, setMe, setSignedIn, displayStatus }) => (
<> 
    <Title>
        <H1>My Chat Room</H1>
    </Title>
    <Input.Search
      prefix={<UserOutlined />}
      value={me} enterButton="Sign In"
      onChange={(e) => setMe(e.target.value)}
      placeholder="Enter your name"
      size="large" style={{ width: 300, margin: 50 }}
      onSearch={ (name) => {
        if (!name)
            displayStatus({
                type: "error",
                msg: "Missing user name",
            });
        else setSignedIn(true);
      }}
    /> 
</>
);
export default SignIn;
 