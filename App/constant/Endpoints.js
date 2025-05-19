import {
  INVENTORY_REPORTS_PAGE_SIZE,
  NOTIFICATION_PAGE_SIZE
} from './constants';

export default {
  LOGIN_USER: '/user/login',
  REFRESH_TOKEN: '/user/refresh-auth',
  INVENTORY_TYPES: '/inventory/all',
  INVENTORY_BY_ID: '/widget-family/search-by-inventory?inventory=',
  FILTER_ITEMS: '/item/web-filter?inventory=',
  ITEM_DETAILS: (id) => `/item/${id}/for-transaction`,
  CHECK_IN_ITEM: (id) => `/item/${id}/check-in`,
  CHECK_OUT_ITEM: (id) => `/item/${id}/check-out`,
  SCAN_QR: '/scan?type=',
  PUT_ITEM: (id) => `/item/${id}/put`,
  PICK_ITEM: (id) => `/item/${id}/pick`,
  RESERVE_ITEM: (id) => `/item/${id}/reserve`,
  REPORT_ITEM: (id) => `/item/${id}/report`,
  ADJUST_ITEM: (id) => `/item/${id}/adjust`,
  RESERVES_BY_ID: (id, picked = true) =>
    `/item/reserves?itemId=${id}&picked=${picked}&cancelled=false`,
  NOTIFICATION: (page = 1) =>
    `/notification/all?page=${page}&perPage=${NOTIFICATION_PAGE_SIZE}`,
  REPORT_RESERVES: '/report/reservations?picked=false&cancelled=false',
  CANCEL_RESERVATION: (id) => `/item/${id}/reserve`,
  INVENTORY_REPORT: (page = 1) =>
    `report/inventory?page=${page}&perPage=${INVENTORY_REPORTS_PAGE_SIZE}`,
  GET_WAREHOUSE_DATA: '/warehouse/all'
};
