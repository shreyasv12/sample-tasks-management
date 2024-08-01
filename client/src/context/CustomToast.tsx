/** @format */

import * as React from 'react';

import { CustomToastAlertType } from '../types/custom-toast';

import CustomToast from '../components/common/CustomToast';

export interface CustomToastProviderContextType {
  alerts: CustomToastAlertType[];
  handleCleartAlerts: (alert: CustomToastAlertType) => void;
  handleAddAlerts: (alert: CustomToastAlertType) => void;
}

const defaultValue: CustomToastProviderContextType = {
  alerts: [],
  handleCleartAlerts: console.info,
  handleAddAlerts: console.info,
};

export const CustomToastContext = React.createContext(defaultValue);

interface CustomToastProviderProps {
  children: any;
}

const CustomToastProvider: React.FC<CustomToastProviderProps> = (props) => {
  const [alerts, setAlerts] = React.useState<CustomToastAlertType[]>([]);

  const handleCleartAlerts = (alertItem: CustomToastAlertType) => {
    setAlerts(prev => prev.filter(item => item.id !== alertItem.id));
  };

  const handleAddAlerts = (alertItem: CustomToastAlertType) => {
    setAlerts(prev => prev.concat(alertItem));
  };

  const value = {
    alerts,
    handleCleartAlerts,
    handleAddAlerts,
  };

  return (
    <CustomToastContext.Provider value={value}>
      <CustomToast />
      {props.children}
    </CustomToastContext.Provider>
  );
};

export default CustomToastProvider;
