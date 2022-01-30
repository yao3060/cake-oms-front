import TestModuleTypes from '@/store/modules/test/interface'
import UserModuleTypes from '@/store/modules/user/interface'
import { OrderStatusKey } from '@/types/OrderStatus';

// root state
export default interface RootStateTypes {
  test: string;
  ordersTab: OrderStatusKey;
}

export interface AllStateTypes extends RootStateTypes {
  testModule: TestModuleTypes,
  userModule: UserModuleTypes
}
