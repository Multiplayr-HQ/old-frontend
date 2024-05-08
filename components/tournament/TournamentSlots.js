import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const TournamentSlots = ({ total, reg }) => {
  let bColor = '';
  if (total - reg === 0) {
    bColor = 'rgba(198, 37, 37, 1)';
  } else {
    bColor = 'rgba(236, 210, 18, 1)';
  }

  const data = {
    datasets: [
      {
        label: 'Slots',
        data: [`${reg}`, `${total - reg}`],
        backgroundColor: [
          // rgba(236, 210, 18, 1)
          bColor,
          'rgba(0, 0, 0, 0)'
        ],
        borderColor: ['#808080']
      }
    ]
  };

  const options = {
    responsive: true,
    cutout: 10,
    elements: {
      arc: {
        borderWidth: 0.5
      }
    },
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        enabled: false
      }
    }
  };

  return (
    <>
      <div>
        <Doughnut
          style={{ height: '100%', width: '40px' }}
          options={options}
          data={data}
        />
      </div>
    </>
  );
};

export default TournamentSlots;
