import { ServerPortfolioResponse } from '../interfaces/interfaces';
import { getPortfolioData } from '../services/portfolio';
import staticPortfolio from '../../static/portfolio';

export async function getPortfolio(req, res) {
  const portfolioData: ServerPortfolioResponse = await getPortfolioData(
    staticPortfolio
  );
  res.send(portfolioData);
}
