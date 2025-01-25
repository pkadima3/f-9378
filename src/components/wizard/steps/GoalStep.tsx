import React from 'react';
import { Button } from '../../ui/button';
import { useWizard } from '../WizardContext';

type Goal = 'Sales' | 'Drive Engagement' | 'Grow Followers' | 'Share Knowledge' | 'Brand Awareness';

export const GoalStep = () => {
  const { goal, setGoal } = useWizard();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm">
          4
        </div>
        <h2 className="text-xl font-semibold">Select Goal</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {(['Sales', 'Drive Engagement', 'Grow Followers', 'Share Knowledge', 'Brand Awareness'] as Goal[]).map((g) => (
          <Button
            key={g}
            variant={goal === g ? "default" : "outline"}
            className="h-12"
            onClick={() => setGoal(g)}
          >
            {g}
          </Button>
        ))}
      </div>
    </div>
  );
};