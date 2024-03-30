import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

// Define a reusable Icon component for category
const CategoryIcon = ({ name, size = 40, color = "#000" }) => (
    <Icon name={name} size={size} color={color} />
);

// Examples of using the CategoryIcon component
const UtilitiesIcon = () => <CategoryIcon name="bolt" />;
const GroceriesIcon = () => <CategoryIcon name="local-grocery-store" />;
const InsuranceIcon = () => <CategoryIcon name="security" />;
const HealthFitnessIcon = () => <CategoryIcon name="fitness-center" />;
const TransportationIcon = () => <CategoryIcon name="directions-car" />;
const DebtOverpaymentsIcon = () => <CategoryIcon name="trending-down" />;
const EducationIcon = () => <CategoryIcon name="school" />;
const SavingsIcon = () => <CategoryIcon name="savings" />;
const InvestmentIcon = () => <CategoryIcon name="show-chart" />;
const TravelIcon = () => <CategoryIcon name="flight" />;
const OtherExpensesIcon = () => <CategoryIcon name="attach-money" />;
const GovernmentServicesIcon = () => <CategoryIcon name="account-balance" />;

// Now you can use these components anywhere in your React Native application
