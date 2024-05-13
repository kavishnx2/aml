import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import OverviewAPIContainer from '../components/OverviewAPIContainer';
import TableP14 from '../components/TableP14';
import { Spin } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Overview.css';
import UserDetailsAPIContainer from '../components/UserDetailsAPIContainer';

function UserDetails() {
  const location = useLocation();
  const name = new URLSearchParams(location.search).get('name');
  const accountNumber = new URLSearchParams(location.search).get('account_number');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      title: 'Account Number',
      dataIndex: 'Account_No',
      render: (text) => (
        <a style={{ fontSize: '17px', color: '#002855', fontWeight: '200' }}>
          {text}
        </a>
      ),
    },
    {
      title: 'Balance Amount',
      dataIndex: 'BALANCE_AMT',
      render: (text) => (
        <a style={{ fontSize: '17px', color: '#002855', fontWeight: '200' }}>
          {text}
        </a>
      ),
    },
    {
      title: 'Cheque',
      dataIndex: 'CHQ_NO',
      render: (text) => (
        <a style={{ fontSize: '17px', color: '#002855', fontWeight: '200' }}>
          {text}
        </a>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'DATE',
      render: (text) => (
        <a style={{ fontSize: '17px', color: '#002855', fontWeight: '200' }}>
          {text}
        </a>
      ),
    },
    {
      title: 'Deposit Amount',
      dataIndex: 'DEPOSIT_AMT',
      render: (text) => (
        <a style={{ fontSize: '17px', color: '#002855', fontWeight: '200' }}>
          {text}
        </a>
      ),
    },
    {
      title: 'Transaction Details',
      dataIndex: 'TRANSACTION DETAILS',
      render: (text) => (
        <a style={{ fontSize: '17px', color: '#002855', fontWeight: '200' }}>
          {text}
        </a>
      ),
    },
    {
      title: 'Value Date',
      dataIndex: 'VALUE DATE',
      render: (text) => (
        <a style={{ fontSize: '17px', color: '#002855', fontWeight: '200' }}>
          {text}
        </a>
      ),
    },
    {
      title: 'Withdrawal Amount',
      dataIndex: 'WITHDRAWAL_AMT',
      render: (text) => (
        <a style={{ fontSize: '17px', color: '#002855', fontWeight: '200' }}>
          {text}
        </a>
      ),
    },
    {
      title: 'Fraud',
      dataIndex: 'isFraud',
      render: (text) => (
        <a style={{ fontSize: '17px', color: '#002855', fontWeight: '200' }}>
          {text}
        </a>
      ),
    },
    {
      title: 'Risk Level',
      dataIndex: 'riskLevel',
      render: (text) => (
        <a style={{ fontSize: '17px', color: '#002855', fontWeight: '200' }}>
          {text}
        </a>
      ),
    },
  ];


  useEffect(() => {
    fetch('http://192.168.100.70:5000/transaction/list?account_no=409000611074')
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          setData(result);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);


  // useEffect(() => {
  //   fetch('http://192.168.100.70:5000/transaction/list?account_no=409000611074')
  //     .then((response) => response.json())
  //     .then((result) => {
  //       const matchingUser = result.users.find(
  //         (user) => user.account_number === accountNumber
  //       );

  //       const matchingPrediction = result.prediction.find(
  //         (prediction) => prediction.account_number === accountNumber
  //       );

  //       if (matchingUser && matchingPrediction) {
  //         setData([
  //           {
  //             ...matchingPrediction,
  //             kyc_score: matchingUser.kyc_score,
  //             risk_score: matchingUser.risk.score,
  //             risk_value: matchingUser.risk.value,
  //           },
  //         ]);
  //       }
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //       setLoading(false);
  //     });
  // }, [accountNumber]);

  return (
    <div className="container-fluid vh-90">
      <div className="row">
        <div className="col">
          <p className="title_name">
            Client
            <b>
              {name && <span className="name_label">/{name}</span>}
              {accountNumber && <span className="account_number_label">-{accountNumber}</span>}
            </b>
          </p>
        </div>
      </div>

      <div className="row" id="container_list">
        <UserDetailsAPIContainer Account_No = {accountNumber}  />
      </div>

      <div className="overview_table">
        <Spin spinning={loading} size="large">
          <TableP14 columns={columns} data={data} />
        </Spin>
      </div>
    </div>
  );
}

export default UserDetails;
