import React from 'react';
import { SaaSLandingTemplate, AgencyPortfolioTemplate, ProductLaunchTemplate } from '@/atomic-design-system/templates';

export default {
  title: 'Templates/Landing Pages',
};

export const SaaS = () => <SaaSLandingTemplate />;
export const Agency = () => <AgencyPortfolioTemplate />;
export const ProductLaunch = () => <ProductLaunchTemplate />;
