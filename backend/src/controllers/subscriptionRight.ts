import {
  ServerSubscriptionRightResponse,
  SubscriptionRight
} from '../interfaces/interfaces';
import { getSubscriptionRightData } from '../services/subscriptionRights';
import subscriptionRightConfig from '../../static/subscriptionRightConfig';

export async function getSubscriptionRight(
  req,
  res
): Promise<ServerSubscriptionRightResponse> {
  const subscriptionRightData: SubscriptionRight[] =
    await getSubscriptionRightData(subscriptionRightConfig);
  return res.send({ rights: subscriptionRightData });
}
