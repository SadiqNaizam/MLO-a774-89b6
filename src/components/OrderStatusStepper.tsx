import React from 'react';
import { CheckCircle, Loader2, XCircle } from 'lucide-react'; // Icons for steps

interface OrderStep {
  name: string;
  status: 'completed' | 'current' | 'pending' | 'failed'; // Status of the step
  description?: string;
}

interface OrderStatusStepperProps {
  steps: OrderStep[];
  currentStepIndex: number; // Index of the current active step
}

const OrderStatusStepper: React.FC<OrderStatusStepperProps> = ({ steps, currentStepIndex }) => {
  console.log("Rendering OrderStatusStepper, current step index:", currentStepIndex);

  return (
    <div className="w-full">
      <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 sm:text-base">
        {steps.map((step, index) => {
          const isActive = index === currentStepIndex;
          const isCompleted = index < currentStepIndex || step.status === 'completed';
          const isFailed = step.status === 'failed' && isActive; // Only show failed on the current active step if it failed

          let icon;
          let textColor = 'text-gray-500 dark:text-gray-400';
          let lineColor = 'border-gray-500 dark:border-gray-400';

          if (isFailed) {
            icon = <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 dark:text-red-500" />;
            textColor = 'text-red-600 dark:text-red-500';
            lineColor = 'border-red-600 dark:border-red-500';
          } else if (isCompleted) {
            icon = <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-500" />;
            textColor = 'text-green-600 dark:text-green-500';
            lineColor = 'border-green-600 dark:border-green-500';
          } else if (isActive) {
            icon = <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-500 animate-spin" />;
            textColor = 'text-blue-600 dark:text-blue-500';
            lineColor = 'border-blue-600 dark:border-blue-500';
          } else { // Pending
            icon = <span className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-gray-500 rounded-full flex items-center justify-center text-xs">{index + 1}</span>;
          }

          return (
            <li
              key={step.name}
              className={`flex md:w-full items-center ${textColor} ${
                index < steps.length - 1 ? "after:content-[''] after:w-full after:h-1 after:border-b after:border-1 after:inline-block" : ""
              } ${index < steps.length - 1 ? `after:${lineColor}` : ''} ${isActive ? 'font-semibold' : ''}`}
            >
              <span className={`flex items-center flex-col sm:flex-row ${index < steps.length - 1 ? 'sm:after:content-["/"] after:mx-2 after:hidden sm:after:inline-block after:text-gray-200 dark:after:text-gray-500' : ''}`}>
                <div className="flex items-center justify-center mr-0 sm:mr-2 mb-1 sm:mb-0">{icon}</div>
                <div className="flex flex-col items-center sm:items-start">
                  {step.name}
                  {step.description && <span className="text-xs hidden sm:block">{step.description}</span>}
                </div>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default OrderStatusStepper;