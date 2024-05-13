import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Overview.css';
import OverviewAPIContainer from '../components/OverviewAPIContainer';
import { Button, Flex, Input, Space, Spin } from 'antd'; // Import Spin from 'antd'
import { useLocation } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import TableP14 from '../components/TableP14';
import DashboardAPIContainer from '../components/DashboardAPIContainer';

function Dashboard() {
  const location = useLocation();
  const integration = new URLSearchParams(location.search).get('integration');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => (
  

          <a style={{ fontSize: '17px', color: '#002855', fontWeight: '200' }}>
            {text}
          </a>

      ),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      render: (text) => (
        <a style={{ fontSize: '17px', color: '#002855', fontWeight: '200' }}>
          {text}
        </a>
      ),
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dob',
      render: (text) => (
        <a style={{ fontSize: '17px', color: '#002855', fontWeight: '200' }}>
          {text}
        </a>
      ),
    },
    {
      title: 'Account Number',
      dataIndex: 'account_number',
      render: (text) => (
        <a style={{ fontSize: '17px', color: '#002855', fontWeight: '200' }}>
          {text}
        </a>
      ),
    },
    {
      title: null,
      dataIndex: 'null',
      render: (text, record) => (
        <Link
          to={`/UserDetails?name=${record.name}&account_number=${record.account_number}`}
        >
          <img
            src="https://i.ibb.co/tY7MTNq/pepicons-pop-dots-x.png"
            alt="Click Me"
            style={{ width: '28px', height: '28px' }}
          />
        </Link>
      ),
    },
  ];

  useEffect(() => {
    fetch('http://192.168.100.70:5000/clients/users/1')
      .then((response) => response.json())
      .then((result) => {
        if (result.users) {
          setData(result.users);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container-fluid vh-110">
      <div className="row" style={{ width: '100%' }}>
        <div className="col">
          <p className="title_name">
            Dashboard
            {integration && (
              <span className="integration_label">/{integration}</span>
            )}
          </p>
        </div>
        <div
          className="col"
          style={{
            marginTop: '20px',
            display: 'flex',
            marginLeft: 'auto',
            marginRight: '0px',
          }}
        >
          <div className="col d-flex justify-content-end">
            <button className="btn_filterbtn">
              <img
                src="https://i.ibb.co/SmkQQ8G/editbuttonpwc.png"
                alt="Filter Icon"
              />
            </button>
            <Link to="/Map" style={{ marginLeft: '-20px' }}>
              <button className="btn_filterbtn">
                <img
                  src="https://i.ibb.co/DzNZFjh/Mapbuttonpwc.png"
                  alt="Filter Icon"
                />{' '}
                {/* Map */}
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="row" id="container_list">
        <DashboardAPIContainer />
      </div>

      <div className="row"></div>

      <div className="overview_table">
        <Spin spinning={loading} size="large">
          <TableP14 columns={columns} data={data} />
        </Spin>
      </div>
    </div>
  );
}

export default Dashboard;
