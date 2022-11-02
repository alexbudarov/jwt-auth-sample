import { Result } from "antd";
import "./Home.css";
import { FormattedMessage } from "react-intl";
import { SmileOutlined } from "@ant-design/icons";
import { useSecurity } from "../../../core/security/useSecurity";
import { observer } from "mobx-react";

export const Home = observer(() => {
  const { userName } = useSecurity();

  return (
    <Result
      icon={<SmileOutlined />}
      title={
        <FormattedMessage id="home.welcome" values={{ appName: "JWT Demo" }} />
      }
      subTitle={<FormattedMessage id="home.loggedInAs" values={{ userName }} />}
    />
  );
});
