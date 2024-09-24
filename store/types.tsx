// types.ts
export interface UserInfo {
  userid: string;
  username: string;
  email: string;
  phone: string;
  pets: Pet[];
  useraddress: Location[];
  pf_flag: boolean;
}

export interface Pet {
  id: number;
  name: string;
  type: string;
  breed: string;
  gender: string;
  dob: string;
}

export interface Location {
  id: number;
  label: string;
  detailAddress: string;
  latitude: number;
  longitude: number;
  owner_flag: boolean;
}

export interface PetCareInfo {
  user_id: string;
  username: string;
  is_active: boolean;
  hourly_price: string;
  daily_price: string;
  accept_dog: boolean;
  accept_cat: boolean;
  accept_other: boolean;
  user_addresses: pfAddress[];
  additional_service: Service[];
}

export interface Service {
  id: number;
  service_name: string;
  price: string;
  accept_dog: boolean;
  accept_cat: boolean;
  accept_other: boolean;
}

export interface pfAddress {
  id: number;
  label: string;
  detail_address: string;
  latitude: number;
  longitude: number;
  pf_flag: boolean;
}

export interface OwnerHistory {
  delivery_id: number;
  pet_owner_id: string;
  pet_friend_id: string;
  pet_owner: string;
  pet_friend: string;
  order_id: number;
  start_date: Date;
  end_date: Date;
  price: number;
  pets: OrderPet[];
  address: OrderAddress[];
  owner_address_id: number;
  pf_address_id: number;
  is_canceled_owner: boolean;
  is_canceled_pf: boolean;
  is_confirm_pf: boolean;
  is_pet_received: boolean;
  is_finish_owner: boolean;
  is_finish_pf: boolean;
  is_finish_pet_care:boolean;
  status: string;
  distance: number;
  daily_price: number;
  hourly_price: number;
  service_price: number;
  platform_fee: number;
  daily_amount: number;
  hourly_amount: number;
  is_reviewed: boolean;
  avg_rating: number;
  review_count: number;
}

export interface BookmarkInfo{
  user_id: string;
  username: string;
  price_hourly: number;
  price_daily: number;
  detail_address: string;
  distance: number;
  accept_dog: boolean;
  accept_cat: boolean;
  accept_other: boolean;
  avg_rating: number;
  review_count: number;
}

export interface OrderPet {
  pet_id: number;
  pet_name: number;
  gender: string;
  breed: string;
  dob: Date;
  type: string;
  services: OrderService[];
}

export interface OrderService {
  task_id: number;
  service_name: string;
  price: number;
  count: number;
}

export interface OrderAddress {
  id: number;
  label: string;
  detail_address: string;
  long: number;
  lat: number;
}
