import { useCallback, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { Typography, Input, Select, Space, InputNumber, Form } from 'antd';

const { Text } = Typography;
const options = [
  { label: 'Withdrawal', value: 'WITHDRAWAL AMT' },
  { label: 'Deposit', value: 'DEPOSIT AMT' },
  { label: 'Cheque', value: 'CHQ.NO.' },
];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const Fraudulent = ({ data, isConnectable }) => {
  useEffect(() => {
    data.addIntegrationElement('Fraudulent', 'features', []);
    data.addIntegrationElement('Fraudulent', 'duration', '');
    data.addIntegrationElement('Fraudulent', 'id', 7);
  }, []);

  const key = getRandomInt(9999);

  const FeasturesChange = (criteria) => {
    data.addIntegrationElement('Fraudulent', 'features', criteria);
    // console.log(event);
  };

  const dayChange = (event) => {
    data.addIntegrationElement(
      'Fraudulent',
      'duration',
      event.target.value.toString()
    );
  };

  return (
    <div className="text-updater-node">
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
            <b>Fraud classification</b>
          </Text>
        </div>
        <div
          style={{
            width: '100%',
            height: '100%',
            padding: '10px',
            maxWidth: '300px',
          }}
        >
          <Text style={{ color: '#002855' }}>Duration</Text>
          <Form name="basic" autoComplete="off">
            <Form.Item name="day">
              <Input
                key={key + 1}
                onChange={dayChange}
                style={{ width: '100%' }}
                placeholder="Number of days"
              />
            </Form.Item>
          </Form>
          <Text style={{ color: '#002855' }}>Features</Text>
          <Select
            mode="multiple"
            allowClear
            style={{
              width: '100%',
              maxWidth: '300px',
              marginBottom: '10px',
            }}
            placeholder="Search criteria"
            // defaultValue={['a10', 'c12']}
            onChange={FeasturesChange}
            options={options}
          />
          <Text style={{ color: '#8c8c8c' }}>Cost: $0.10 per request</Text>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
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

export default Fraudulent;
