import React, { useEffect, useCallback } from 'react';
import { useCommunication } from '../contexts/CommunicationContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { saveAs } from 'file-saver';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './report.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ReportPage = () => {
  const { companies, communications } = useCommunication();
  const [dateRange, setDateRange] = React.useState([new Date(), new Date()]);
  const [engagementData, setEngagementData] = React.useState({});
  const [overdueTrendsData, setOverdueTrendsData] = React.useState([]);
  const [communicationFrequencyData, setCommunicationFrequencyData] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const generateCommunicationFrequencyReport = useCallback(() => {
    try {
      const frequencyData = companies.reduce((acc, company) => {
        acc[company.name] = communications.filter(
          (comm) =>
            comm.companyId === company.id &&
            new Date(comm.date) >= dateRange[0] &&
            new Date(comm.date) <= dateRange[1]
        ).length;
        return acc;
      }, {});
      setCommunicationFrequencyData(frequencyData);
    } catch (err) {
      setError('Error generating frequency report');
    }
  }, [companies, communications, dateRange]);

  const generateEngagementEffectivenessReport = useCallback(() => {
    try {
      const effectivenessData = companies.reduce((acc, company) => {
        const companyCommunications = communications.filter(
          (comm) => comm.companyId === company.id
        );
        const effectiveCommMethods = companyCommunications.filter(
          (comm) => comm.responseReceived === true
        ).length;
        acc[company.name] = {
          total: companyCommunications.length,
          effective: effectiveCommMethods,
          effectiveness: companyCommunications.length
            ? (effectiveCommMethods / companyCommunications.length) * 100
            : 0,
        };
        return acc;
      }, {});
      setEngagementData(effectivenessData);
    } catch (err) {
      setError('Error generating engagement report');
    }
  }, [companies, communications]);

  const generateOverdueTrendsReport = useCallback(() => {
    try {
      const overdueTrends = companies.map((company) => {
        const overdueCount = communications.filter(
          (comm) =>
            comm.companyId === company.id &&
            new Date(comm.dueDate) < new Date() &&
            !comm.completed
        ).length;
        return {
          company: company.name,
          overdueCount,
        };
      });
      setOverdueTrendsData(overdueTrends);
    } catch (err) {
      setError('Error generating overdue trends report');
    }
  }, [companies, communications]);

  const generateReports = useCallback(() => {
    setIsLoading(true);
    setError(null);
    try {
      generateCommunicationFrequencyReport();
      generateEngagementEffectivenessReport();
      generateOverdueTrendsReport();
    } catch (err) {
      setError('Error generating reports');
    } finally {
      setIsLoading(false);
    }
  }, [
    generateCommunicationFrequencyReport,
    generateEngagementEffectivenessReport,
    generateOverdueTrendsReport,
  ]);

  useEffect(() => {
    generateReports();
  }, [generateReports]);

  const handleStartDateChange = (date) => setDateRange([date, dateRange[1]]);
  const handleEndDateChange = (date) => setDateRange([dateRange[0], date]);

  const handleDownloadReport = () => {
    const report = {
      communicationFrequency: communicationFrequencyData,
      engagementEffectiveness: engagementData,
      overdueTrends: overdueTrendsData,
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    saveAs(blob, 'communication_report.json');
  };

  const handleExportCsv = () => {
    let csvContent = 'Company,Communication Frequency\n';
    Object.entries(communicationFrequencyData).forEach(([companyName, frequency]) => {
      csvContent += `${companyName},${frequency}\n`;
    });
    const blob = new Blob([csvContent], { type: 'text/csv' });
    saveAs(blob, 'communication_frequency_report.csv');
  };

  const chartData = {
    labels: Object.keys(engagementData),
    datasets: [
      {
        label: 'Effectiveness (%)',
        data: Object.values(engagementData).map((data) => data.effectiveness),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Engagement Effectiveness Trends',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  if (isLoading) {
    return <div className="loading-spinner">Loading reports...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="report-container">
      <h1>Report Page</h1>

      <div className="report-section">
        <h2>Select Date Range</h2>
        <div className="date-range-container">
          <DatePicker
            selected={dateRange[0]}
            onChange={handleStartDateChange}
            selectsStart
            startDate={dateRange[0]}
            endDate={dateRange[1]}
          />
          <DatePicker
            selected={dateRange[1]}
            onChange={handleEndDateChange}
            selectsEnd
            startDate={dateRange[0]}
            endDate={dateRange[1]}
            minDate={dateRange[0]}
          />
        </div>
      </div>

      <div className="report-section">
        <h2>Communication Frequency Report</h2>
        <table className="report-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Frequency</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(communicationFrequencyData).map(([company, freq]) => (
              <tr key={company}>
                <td>{company}</td>
                <td>{freq}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="report-button" onClick={handleExportCsv}>
          Export as CSV
        </button>
      </div>

      <div className="report-section">
        <h2>Engagement Effectiveness</h2>
        <table className="report-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Total Communications</th>
              <th>Effective Communications</th>
              <th>Effectiveness (%)</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(engagementData).map(([company, data]) => (
              <tr key={company}>
                <td>{company}</td>
                <td>{data.total}</td>
                <td>{data.effective}</td>
                <td>{data.effectiveness.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="report-section">
        <h2>Overdue Communication Trends</h2>
        <table className="report-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Overdue Count</th>
            </tr>
          </thead>
          <tbody>
            {overdueTrendsData.map(({ company, overdueCount }) => (
              <tr key={company}>
                <td>{company}</td>
                <td>{overdueCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="report-section">
        <h2>Engagement Effectiveness Chart</h2>
        <div className="chart-container">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      <button className="report-button export-button" onClick={handleDownloadReport}>
        Download Full Report
      </button>
    </div>
  );
};

export default ReportPage;
