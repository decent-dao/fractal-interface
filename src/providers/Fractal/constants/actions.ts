export enum GnosisAction {
  SET_SAFE_SERVICE_CLIENT,
  SET_SAFE,
  SET_SAFE_ADDRESS,
  SET_SAFE_TRANSACTIONS,
  SET_MODULES,
  SET_GUARD_CONTRACTS,
  SET_FREEZE_DATA,
  FREEZE_VOTE_EVENT,
  SET_DAO_NAME,
  SET_DAO_PARENT,
  SET_DAO_CHILDREN,
  INVALIDATE,
  RESET,
}

export enum TreasuryAction {
  UPDATE_GNOSIS_SAFE_FUNGIBLE_ASSETS,
  UPDATE_GNOSIS_SAFE_NONFUNGIBLE_ASSETS,
  UPDATE_GNOSIS_SAFE_TRANSFERS,
  RESET,
}

export enum AccountAction {
  UPDATE_DAO_FAVORITES,
  UPDATE_AUDIT_MESSAGE,
  RESET,
}
