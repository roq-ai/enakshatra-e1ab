import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ConsultationInterface {
  id?: string;
  customer_id?: string;
  consultant_id?: string;
  status: string;
  date_time: any;
  created_at?: any;
  updated_at?: any;

  user_consultation_customer_idTouser?: UserInterface;
  user_consultation_consultant_idTouser?: UserInterface;
  _count?: {};
}

export interface ConsultationGetQueryInterface extends GetQueryInterface {
  id?: string;
  customer_id?: string;
  consultant_id?: string;
  status?: string;
}
