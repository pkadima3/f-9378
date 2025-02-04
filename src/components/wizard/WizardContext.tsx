import React, { createContext, useContext, useState } from 'react';
import { Platform, Goal, Tone } from '@/types/post';

interface WizardContextType {
  step: number;
  setStep: (step: number) => void;
  platform: Platform | undefined;
  setPlatform: (platform: Platform) => void;
  niche: string;
  setNiche: (niche: string) => void;
  goal: Goal | undefined;
  setGoal: (goal: Goal) => void;
  tone: Tone | undefined;
  setTone: (tone: Tone) => void;
  file: File | null;
  setFile: (file: File | null) => void;
  preview: string;
  setPreview: (preview: string) => void;
  fileType: string;
  setFileType: (fileType: string) => void;
  postId: string | null;
  setPostId: (postId: string | null) => void;
  captions: string[];
  setCaptions: (captions: string[]) => void;
  selectedCaption: string | undefined;
  setSelectedCaption: (caption: string) => void;
  overlayEnabled: boolean;
  setOverlayEnabled: (enabled: boolean) => void;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export const WizardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [step, setStep] = useState(1);
  const [platform, setPlatform] = useState<Platform>();
  const [niche, setNiche] = useState('');
  const [goal, setGoal] = useState<Goal>();
  const [tone, setTone] = useState<Tone>();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [fileType, setFileType] = useState('');
  const [postId, setPostId] = useState<string | null>(null);
  const [captions, setCaptions] = useState<string[]>([]);
  const [selectedCaption, setSelectedCaption] = useState<string>();
  const [overlayEnabled, setOverlayEnabled] = useState(false);

  return (
    <WizardContext.Provider
      value={{
        step,
        setStep,
        platform,
        setPlatform,
        niche,
        setNiche,
        goal,
        setGoal,
        tone,
        setTone,
        file,
        setFile,
        preview,
        setPreview,
        fileType,
        setFileType,
        postId,
        setPostId,
        captions,
        setCaptions,
        selectedCaption,
        setSelectedCaption,
        overlayEnabled,
        setOverlayEnabled,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export const useWizard = () => {
  const context = useContext(WizardContext);
  if (context === undefined) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
};
