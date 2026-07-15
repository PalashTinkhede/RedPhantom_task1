import mockData from '../data/mock.json';

// Simulate network latency
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchDashboardData = async () => {
  await delay(900);
  return mockData;
};
