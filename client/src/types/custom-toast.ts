/** @format */

export interface CustomToastAlertType {
  id: number;
  message: string;
  code: string;

  timeout?: number;
  noTimeout?: boolean;

  html?: any;
}
