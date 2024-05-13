import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles/OverviewAPIContainer.css';
import ChartPie from '../components/ChartPie';

function UserDetailsAPIContainer({ accountNumber }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://192.168.100.70:5000/clients/users/1')
      .then((response) => response.json())
      .then((result) => {
        const matchingUser = result.users.find(
          (user) => user.account_number === accountNumber
        );

        const matchingPrediction = result.prediction.find(
          (prediction) => prediction.account_number === accountNumber
        );

        if (matchingUser && matchingPrediction) {
          setData([
            {
              ...matchingPrediction,
              kyc_score: matchingUser.kyc_score,
              risk_score: matchingUser.risk.score,
              risk_value: matchingUser.risk.value,
            },
          ]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [accountNumber]);

  return (
    <div className="row">
      <div className="col-md-6">
        <div className="api_container">
          <Container>
            <Row>
              <p className="api_container_title">
                Predicted Amount: {data && data[0] && data[0].predicted_amount}
              </p>
              <p className="api_container_title">Date: {data && data[0] && data[0].date} </p>
              <p className="api_container_title">Action: {data && data[0] && data[0].action} </p>
            </Row>
            <Row>
              {/* You can display other data here */}
            </Row>
          </Container>
        </div>
      </div>
      <div className="col-md-6">
        <div className="api_container">
          <Container>
            <Row>
              <p className="api_container_title">KYC Score: {data && data[0] && data[0].kyc_score} </p>
              <p className="api_container_title">Risk Score: {data && data[0] && data[0].risk.score} </p>
              <p className="api_container_title">Risk Value: {data && data[0] && data[0].risk.value} </p>
            </Row>
            <Row>
              {/* You can display other data here */}
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default UserDetailsAPIContainer;
