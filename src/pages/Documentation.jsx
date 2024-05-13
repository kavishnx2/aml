import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles/Overview.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/OverviewAPIContainer.css';
import '../styles/Documentation.css';
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Get Started', '1', <PieChartOutlined />, [
    getItem('Sub Header 1', '3'),
    getItem('Sub Header 2', '4'),
    getItem('Sub Header 3', '5'),
  ]),
  getItem('Overview Dashboard', '2', <DesktopOutlined />, [
    getItem('Sub Header 1', '3'),
    getItem('Sub Header 2', '4'),
    getItem('Sub Header 3', '5'),
  ]),
  getItem('Integration Dashboard', 'sub1', <UserOutlined />, [
    getItem('Sub Header 1', '3'),
    getItem('Sub Header 2', '4'),
    getItem('Sub Header 3', '5'),
  ]),

  getItem('Client Specific Dashboard', 'sub2', <TeamOutlined />, [
    getItem('Sub Header 1', '3'),
    getItem('Sub Header 2', '4'),
    getItem('Sub Header 3', '5'),
  ]),
  getItem('Files', '9', <FileOutlined />, [
    getItem('Sub Header 1', '3'),
    getItem('Sub Header 2', '4'),
    getItem('Sub Header 3', '5'),
  ]),
];
const Documentation = () => {
  const [collapsed, setCollapsed] = useState(false);
  //   const {
  //     token: { colorBgContainer },
  //   } = theme.useToken();
  return (
    <Row>
      <div className="container-fluid vh-100 padding">
        <Content>
          <Row>
            <Col>
              <h2>Get Started</h2>
            </Col>
          </Row>
          <Row>
            <div className="generic-styling padding-inside">
              <p>
                Test Dimain has the objective to deliver an AML Saas Software.
                The SaaS service also caters to the seemless integration of AML
                services by developers.The very first page is the Overview Page
                which provides a high level presentation of Active, Down API,
                Efficiency gained by a company by using the AML service. The
                table provides the available AML integrations that the AML SaaS
                solution has to offer namely: AML Risk Scoring, CDD Integration,
                KYC Pipeline Integration.
              </p>
            </div>
          </Row>
          <Row>
            <Col>
              <h2>AML Risk Score Integration</h2>
            </Col>
          </Row>
          <Row>
            <div className="generic-styling padding-inside">
              <p>
                The AML Risk Score Integration page is a dashboard page which
                provides an overview of clients in the active integration, a Map
                API to visualition geolocation of clients using the API and a
                table of the clients using the Integration.
              </p>
            </div>
            <Row>
              <div className="generic-styling padding-inside">
                <p>
                  The AML Risk Score Integration table displays the clients
                  subscribed to the AML Service Integration. The table allows
                  viewing the transactions of individual subscribed clients by
                  clicking the triple dots button.
                </p>
              </div>
            </Row>
          </Row>

          <Row>
            <Col>
              <h2>Individual AML Risk Score Integration</h2>
            </Col>
          </Row>
          <Row>
            <div className="generic-styling padding-inside">
              <p>
                The Individual AML Risk Score Integration page will provide a
                detailed view of the transactions made by the Client.Graphs are
                used to showcase the behavioural patterns of the client account
                traffic. Our AI model will perform a screening on every
                transaction received and made by clients whether they appear as
                fraudulent or not. All these data are then displayed on tables.
              </p>
            </div>
          </Row>
          <Row>
            <Col>
              <h2>KYC Integration</h2>
            </Col>
          </Row>
          <Row>
            <div className="generic-styling padding-inside">
              <p>KYC integration paragraph</p>
            </div>
          </Row>
          <Row>
            <div>
              <h2>Individual KYC Integration</h2>
            </div>
          </Row>
          <Row>
            <div className="generic-styling padding-inside">
              <p>
                Individual KYC Integration contains the KYC score of a client
              </p>
            </div>
          </Row>
          <Row>
            <Col>
              <h2>Low Code Integration</h2>
            </Col>
          </Row>
          <Row>
            <div className="generic-styling padding-inside">
              <p>
                This section will allow the users to create integrations in a
                Low code environment. In the process toolbar, the user will be
                able to drag and drop nodes such as Input, Integration and
                Output node. These nodes can be connected to each other to
                create a pipeline. The user can publish the flow to the database
                and the server will generate an API profile for the current flow
              </p>
            </div>
          </Row>
        </Content>
      </div>
    </Row>
  );
};
export default Documentation;
