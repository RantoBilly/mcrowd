import { create } from 'zustand';

// Milestone update
export type MilestoneCategory = "Product" | "Market" | "Organization";
export type MilestoneStage = "Pre-Seed" | "Seed" | "Series A+";

export interface MilestoneChecklist {
  [milestone: string]: boolean;
}

export interface StartupMilestones {
  [category in MilestoneCategory]?: {
    [stage in MilestoneStage]?: MilestoneChecklist;
  }
}

export interface Startup {
  id: string;
  name: string;
  logo: string;
  description: string;
  shortPitch: string;
  industry: string;
  stage: string; //'seed' | 'early' | 'growth' | 'series-a' | 'series-b' | 'series-c'; Updating the milestone
  fundingGoal: number;
  currentFunding: number;
  location: string;
  founderName: string;
  founderAvatar: string;
  teamSize: number;
  pitchVideo?: string;
  foundedYear: number;
  riskLevel: 'low' | 'medium' | 'high';
  returnPotential: 'low' | 'medium' | 'high';
  aiScore: number; // 0-100
  tags: string[];
  businessCapital: number;
  milestones: StartupMilestones; // Update milestones
}

export interface StartupState {
  startups: Startup[];
  featuredStartups: Startup[];
  isLoading: boolean;
  error: string | null;
  fetchStartups: () => Promise<void>;
  getStartupById: (id: string) => Startup | undefined;
  investInStartup: (startupId: string, amount: number) => Promise<boolean>;
}

// Mock data
const MOCK_STARTUPS: Startup[] = [
  {
    id: '1',
    name: 'EcoTech Solutions',
    logo: 'https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=150',
    description: 'EcoTech Solutions is developing sustainable energy solutions for urban environments. Our innovative solar panels are 30% more efficient than traditional panels and designed to integrate seamlessly with modern architecture.',
    shortPitch: 'Next-gen sustainable energy solutions with 30% higher efficiency',
    industry: 'Clean Energy',
    stage: 'Product',
    fundingGoal: 5000,
    currentFunding: 1500,
    location: 'Antananarivo - Madagascar',
    founderName: 'Alex Green',
    founderAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    teamSize: 6,
    pitchVideo: 'https://www.example.com/videos/ecotech-pitch.mp4',
    foundedYear: 2022,
    riskLevel: 'medium',
    returnPotential: 'high',
    aiScore: 85,
    tags: ['sustainability', 'renewable energy', 'cleantech'],
    businessCapital: 8000,
    milestones: {
      Product: {
        "Pre-Seed": {
          "Problem identified and validated": true,
          "Clear value proposition": true,
          "Prototype or interactive mockup": true,
        },
        Seed: {
          "MVP tested in the field": true,
          "First user feedback": true,
          "Start of retention": true,
        },
        "Series A+": {
          "Product stabilized": true,
          "Clear roadmap": true,
          "Technical scalability validated": true,
        }
      },
      Market: {
        "Pre-Seed": {
          "User interviews": true,
          "Early adopters engaged": false,
        },
        Seed: {
          "First revenues": true,
          "Tracked traction KPIs (CAC, LTV, churn...)": true,
          "Acquisition channels tested": false,
        },
        "Series A+": {
          "Significant revenue": false,
          "Monthly growth": true,
          "Market fit confirmed": true,
          "High retention and NPS": false,
        },
      },
      Organization: {
      "Pre-Seed": {
        "Complementary founding team": true,
        "Company status": true,
        "NDA and clear role allocation": false,
      },
      Seed: {
        "First key recruitments": true,
        "Basic governance in place": false,
        "Beginning of process structuring": true,
      },
      "Series A+": {
        "More robust HR structure": true,
        "Operational KPIs": false,
        "Board or advisory committee in place": true,
      }
    }
    }
  },
  {
    id: '2',
    name: 'MediSync',
    logo: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=150',
    description: 'MediSync is revolutionizing healthcare with AI-powered diagnostic tools. Our platform connects patients with healthcare providers and uses machine learning to assist in early disease detection.',
    shortPitch: 'AI-powered healthcare diagnostics for early disease detection',
    industry: 'Healthcare',
    stage: 'Product',
    fundingGoal: 1200,
    currentFunding: 450,
    location: 'Antananarivo - Madagascar',
    founderName: 'Sarah Chen',
    founderAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    teamSize: 12,
    pitchVideo: 'https://www.example.com/videos/medisync-pitch.mp4',
    foundedYear: 2021,
    riskLevel: 'medium',
    returnPotential: 'high',
    aiScore: 92,
    tags: ['healthcare', 'AI', 'medtech', 'diagnostics'],
    businessCapital: 4000,
    milestones: {
      Product: {
        "Pre-Seed": {
          "Problem identified and validated": true,
          "Clear value proposition": false,
          "Prototype or interactive mockup": true,
        },
        Seed: {
          "MVP tested in the field": true,
          "First user feedback": false,
          "Start of retention": false,
        },
        "Series A+": {
          "Product stabilized": false,
          "Clear roadmap": true,
          "Technical scalability validated": false,
        }
      },
      Market: {
        "Pre-Seed": {
          "User interviews": true,
          "Early adopters engaged": false,
        },
        Seed: {
          "First revenues": true,
          "Tracked traction KPIs (CAC, LTV, churn...)": true,
          "Acquisition channels tested": false,
        },
        "Series A+": {
          "Significant revenue": false,
          "Monthly growth": false,
          "Market fit confirmed": true,
          "High retention and NPS": false,
        },
      },
      Organization: {
      "Pre-Seed": {
        "Complementary founding team": true,
        "Company status": true,
        "NDA and clear role allocation": false,
      },
      Seed: {
        "First key recruitments": true,
        "Basic governance in place": true,
        "Beginning of process structuring": true,
      },
      "Series A+": {
        "More robust HR structure": true,
        "Operational KPIs": false,
        "Board or advisory committee in place": true,
      }
    }
    }
  },
  {
    id: '3',
    name: 'FinWise',
    logo: 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=150',
    description: 'FinWise provides personalized financial management tools for small businesses. Our platform simplifies accounting, tax preparation, and financial forecasting using blockchain technology.',
    shortPitch: 'Blockchain-powered financial tools for small businesses',
    industry: 'Fintech',
    stage: 'Product',
    fundingGoal: 2000,
    currentFunding: 1100,
    location: 'Antananarivo - Madagascar',
    founderName: 'Michael Torres',
    founderAvatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
    teamSize: 18,
    pitchVideo: 'https://www.example.com/videos/finwise-pitch.mp4',
    foundedYear: 2020,
    riskLevel: 'low',
    returnPotential: 'medium',
    aiScore: 78,
    tags: ['fintech', 'blockchain', 'small business', 'accounting'],
    businessCapital: 6500,
    milestones: {
      Product: {
        "Pre-Seed": {
          "Problem identified and validated": true,
          "Clear value proposition": false,
          "Prototype or interactive mockup": true,
        },
        Seed: {
          "MVP tested in the field": true,
          "First user feedback": true,
          "Start of retention": false,
        },
        "Series A+": {
          "Product stabilized": false,
          "Clear roadmap": true,
          "Technical scalability validated": true,
        }
      },
      Market: {
        "Pre-Seed": {
          "User interviews": true,
          "Early adopters engaged": true,
        },
        Seed: {
          "First revenues": true,
          "Tracked traction KPIs (CAC, LTV, churn...)": false,
          "Acquisition channels tested": false,
        },
        "Series A+": {
          "Significant revenue": true,
          "Monthly growth": true,
          "Market fit confirmed": true,
          "High retention and NPS": true,
        },
      },
      Organization: {
      "Pre-Seed": {
        "Complementary founding team": true,
        "Company status": true,
        "NDA and clear role allocation": false,
      },
      Seed: {
        "First key recruitments": true,
        "Basic governance in place": false,
        "Beginning of process structuring": true,
      },
      "Series A+": {
        "More robust HR structure": true,
        "Operational KPIs": true,
        "Board or advisory committee in place": true,
      }
    }
    }
  },
  {
    id: '4',
    name: 'EduVerse',
    logo: 'https://images.pexels.com/photos/5940721/pexels-photo-5940721.jpeg?auto=compress&cs=tinysrgb&w=150',
    description: 'EduVerse is creating an immersive educational platform using virtual reality. Our technology helps students experience historical events, scientific concepts, and cultural landmarks in an interactive 3D environment.',
    shortPitch: 'VR educational platform for immersive learning experiences',
    industry: 'Education',
    stage: 'Product',
    fundingGoal: 4500,
    currentFunding: 1800,
    location: 'Antananarivo - Madagascar',
    founderName: 'Priya Patel',
    founderAvatar: 'https://images.pexels.com/photos/3714743/pexels-photo-3714743.jpeg?auto=compress&cs=tinysrgb&w=150',
    teamSize: 9,
    pitchVideo: 'https://www.example.com/videos/eduverse-pitch.mp4',
    foundedYear: 2021,
    riskLevel: 'medium',
    returnPotential: 'high',
    aiScore: 88,
    tags: ['education', 'VR', 'edtech', 'immersive learning'],
    businessCapital: 9500,
    milestones: {
      Product: {
        "Pre-Seed": {
          "Problem identified and validated": true,
          "Clear value proposition": true,
          "Prototype or interactive mockup": true,
        },
        Seed: {
          "MVP tested in the field": true,
          "First user feedback": true,
          "Start of retention": true,
        },
        "Series A+": {
          "Product stabilized": true,
          "Clear roadmap": true,
          "Technical scalability validated": true,
        }
      },
      Market: {
        "Pre-Seed": {
          "User interviews": true,
          "Early adopters engaged": false,
        },
        Seed: {
          "First revenues": false,
          "Tracked traction KPIs (CAC, LTV, churn...)": false,
          "Acquisition channels tested": true,
        },
        "Series A+": {
          "Significant revenue": true,
          "Monthly growth": true,
          "Market fit confirmed": true,
          "High retention and NPS": true,
        },
      },
      Organization: {
      "Pre-Seed": {
        "Complementary founding team": true,
        "Company status": true,
        "NDA and clear role allocation": true,
      },
      Seed: {
        "First key recruitments": true,
        "Basic governance in place": true,
        "Beginning of process structuring": false,
      },
      "Series A+": {
        "More robust HR structure": true,
        "Operational KPIs": true,
        "Board or advisory committee in place": true,
      }
    }
    }
  },
  {
    id: '5',
    name: 'AgriTech Innovations',
    logo: 'https://images.pexels.com/photos/442589/pexels-photo-442589.jpeg?auto=compress&cs=tinysrgb&w=150',
    description: 'AgriTech Innovations is developing smart farming solutions using IoT sensors and AI. Our system helps farmers optimize crop yields, reduce water usage, and minimize pesticide application.',
    shortPitch: 'IoT and AI-powered smart farming solutions',
    industry: 'Agriculture',
    stage: 'Product',
    fundingGoal: 3000,
    currentFunding: 900,
    location: 'Antananarivo - Madagascar',
    founderName: 'Carlos Rodriguez',
    founderAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    teamSize: 7,
    pitchVideo: 'https://www.example.com/videos/agritech-pitch.mp4',
    foundedYear: 2022,
    riskLevel: 'high',
    returnPotential: 'medium',
    aiScore: 76,
    tags: ['agriculture', 'IoT', 'AI', 'sustainability'],
    businessCapital: 7000,
    milestones: {
      Product: {
        "Pre-Seed": {
          "Problem identified and validated": true,
          "Clear value proposition": true,
          "Prototype or interactive mockup": false,
        },
        Seed: {
          "MVP tested in the field": true,
          "First user feedback": false,
          "Start of retention": false,
        },
        "Series A+": {
          "Product stabilized": false,
          "Clear roadmap": true,
          "Technical scalability validated": true,
        }
      },
      Market: {
        "Pre-Seed": {
          "User interviews": true,
          "Early adopters engaged": true,
        },
        Seed: {
          "First revenues": true,
          "Tracked traction KPIs (CAC, LTV, churn...)": true,
          "Acquisition channels tested": false,
        },
        "Series A+": {
          "Significant revenue": false,
          "Monthly growth": true,
          "Market fit confirmed": true,
          "High retention and NPS": false,
        },
      },
      Organization: {
      "Pre-Seed": {
        "Complementary founding team": true,
        "Company status": true,
        "NDA and clear role allocation": false,
      },
      Seed: {
        "First key recruitments": true,
        "Basic governance in place": false,
        "Beginning of process structuring": true,
      },
      "Series A+": {
        "More robust HR structure": true,
        "Operational KPIs": false,
        "Board or advisory committee in place": true,
      }
    }
    }
  }
];

export const useStartupStore = create<StartupState>()((set, get) => ({
  startups: [],
  featuredStartups: [],
  isLoading: false,
  error: null,
  
  fetchStartups: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Using mock data
      set({ 
        startups: MOCK_STARTUPS, 
        featuredStartups: MOCK_STARTUPS.slice(0, 3), // First 3 as featured
        isLoading: false 
      });
    } catch (error) {
      set({ error: 'Failed to fetch startups. Please try again.', isLoading: false });
    }
  },
  
  getStartupById: (id) => {
    return get().startups.find(startup => startup.id === id);
  },
  
  investInStartup: async (startupId, amount) => {
    set({ isLoading: true });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update the startup's funding (in a real app, this would be a backend call)
      const updatedStartups = get().startups.map(startup => {
        if (startup.id === startupId) {
          return {
            ...startup,
            currentFunding: startup.currentFunding + amount
          };
        }
        return startup;
      });
      
      set({ startups: updatedStartups, isLoading: false });
      return true;
    } catch (error) {
      set({ error: 'Investment failed. Please try again.', isLoading: false });
      return false;
    }
  }
}));