import TestModuleTypes from '@/store/modules/test/interface'
import UserModuleTypes from '@/store/modules/user/interface'

// root state
export default interface RootStateTypes {
  test: string;
  ordersTab: string;
}

export interface AllStateTypes extends RootStateTypes {
  testModule: TestModuleTypes,
  userModule: UserModuleTypes
}
