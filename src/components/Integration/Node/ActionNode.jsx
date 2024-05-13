import { useCallback, useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { Typography, Input, Select, Checkbox, Row, Col, Form } from 'antd';

const { Text } = Typography;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const ActionNode = ({ data, isConnectable }) => {
  const [channel, setChannel] = useState('Email');
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  useEffect(() => {
    data.addParametersElement('output', 'allowAnalytics', false);
    data.addParametersElement('output', 'alert', false);
    data.addParametersElement('output', 'email', 'Rabill785@gmail.com');
  }, []);

  const allowAnalyticChange = (event) => {
    console.log(event.target.checked);
    data.addParametersElement('output', 'allowAnalytics', event.target.checked);
  };
  const allowAlertChange = (event) => {
    console.log(event.target.checked);
    data.addParametersElement('output', 'alert', event.target.checked);
  };
  const emailChange = (event) => {
    console.log(event.target.value);
    data.addParametersElement('output', 'email', event.target.value);
  };

  const key = getRandomInt(9999);

  return (
    <div className="text-updater-node">
      <div>
        <div
          style={{
            background: '#D9D9D9',
            width: '100%',
            height: '25px',
            borderRadius: '5px 5px 0px 0px',
            paddingLeft: '5px',
          }}
        >
          <Text style={{ color: '#002855' }}>
            <b>Action</b>
          </Text>
        </div>
        <div style={{ width: '100%', height: '100%', padding: '10px' }}>
          {/* */}
          <Row
            style={{ marginTop: '10px', marginBottom: '-10px', padding: '0px' }}
          >
            <Checkbox
              onChange={allowAnalyticChange}
              style={{ color: '#007EA7' }}
            ></Checkbox>
            <Text style={{ color: '#002855', marginLeft: '10px' }}>
              Allow Analytics
            </Text>
          </Row>
          <Row
            style={{ marginTop: '10px', marginBottom: '-10px', padding: '0px' }}
          >
            <Checkbox
              onChange={allowAlertChange}
              style={{ color: '#007EA7' }}
            ></Checkbox>
            <Text style={{ color: '#002855', marginLeft: '10px' }}>Alert</Text>
          </Row>
          <Text style={{ color: '#002855' }}>Channel</Text>
          <select
            name="channel"
            id="channels"
            style={{
              width: '100%',
              height: '30px',
              border: '1px solid #D9D9D9',
              borderRadius: '5px',
              marginBottom: '10px',
            }}
            onChange={(e) => setChannel(e.target.value)}
          >
            <option value="Email">Email</option>
            <option value="SMS">SMS</option>
            <option value="POST Link">Request</option>
            {/* <option value="audi">VerifAI</option> */}
          </select>
          {/* <Input
            key={key + 1}
            onChange={onChange}
            style={{ width: '100%' }}
            placeholder={`${channel}`}
          /> */}
          <Form name="basic" autoComplete="off">
            <Text style={{ color: '#002855' }}>Host</Text>
            <Form.Item name="body" style={{ margin: 0, marginBottom: '5px' }}>
              <Input
                key={key + 1}
                onChange={emailChange}
                style={{ width: '100%' }}
                placeholder={`${channel}`}
              />
            </Form.Item>
          </Form>
          <Text style={{ color: '#8c8c8c' }}>Cost: $0.2 per request</Text>
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Top}
        id="b"
        isConnectable={isConnectable}
        style={{
          width: '15px',
          height: '15px',
          background: '#007EA7',
          bottom: '-7px',
        }}
      />
    </div>
  );
};

export default ActionNode;
