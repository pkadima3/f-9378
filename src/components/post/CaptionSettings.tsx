import React from 'react';
import { Platform } from '../PostWizard';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface CaptionSettingsProps {
  initialValues: {
    platform: Platform;
    niche: string;
    goal: string;
    tone: string;
  };
  onSubmit: (values: {
    platform: Platform;
    niche: string;
    goal: string;
    tone: string;
  }) => void;
}

export const CaptionSettings = ({ initialValues, onSubmit }: CaptionSettingsProps) => {
  const [values, setValues] = React.useState(initialValues);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="platform">Platform</Label>
          <Select
            value={values.platform}
            onValueChange={(value: Platform) => setValues({ ...values, platform: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Instagram">Instagram</SelectItem>
              <SelectItem value="Twitter">Twitter</SelectItem>
              <SelectItem value="Facebook">Facebook</SelectItem>
              <SelectItem value="LinkedIn">LinkedIn</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="niche">Niche</Label>
          <Input
            id="niche"
            value={values.niche}
            onChange={(e) => setValues({ ...values, niche: e.target.value })}
            placeholder="e.g., Technology, Fashion, Food"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="goal">Goal</Label>
          <Input
            id="goal"
            value={values.goal}
            onChange={(e) => setValues({ ...values, goal: e.target.value })}
            placeholder="e.g., Increase engagement, Drive sales"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tone">Tone</Label>
          <Input
            id="tone"
            value={values.tone}
            onChange={(e) => setValues({ ...values, tone: e.target.value })}
            placeholder="e.g., Professional, Casual, Humorous"
          />
        </div>

        <Button type="submit" className="w-full">
          Generate Captions
        </Button>
      </form>
    </Card>
  );
};