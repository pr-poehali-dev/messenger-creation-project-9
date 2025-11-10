import { useState, useEffect } from 'react';
import { User } from '@/types';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import DatingOnboarding from '@/components/Dating/DatingOnboarding';
import DatingProfileForm from '@/components/Dating/DatingProfileForm';
import DatingFeed from '@/components/Dating/DatingFeed';
import DatingMatches from '@/components/Dating/DatingMatches';
import DatingMatchModal from '@/components/Dating/DatingMatchModal';

interface DatingProfile {
  id: number;
  user_id: number;
  name: string;
  age: number;
  gender?: string;
  bio?: string;
  interests?: string[];
  location?: string;
  photos?: string[];
  is_active: boolean;
}

interface DatingProps {
  currentUser: User;
  onNavigateToChats?: () => void;
}

export default function Dating({ currentUser, onNavigateToChats }: DatingProps) {
  const [hasProfile, setHasProfile] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<DatingProfile | null>(null);
  const [profiles, setProfiles] = useState<DatingProfile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matchedProfile, setMatchedProfile] = useState<DatingProfile | null>(null);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'feed' | 'matches'>('feed');
  const [matches, setMatches] = useState<DatingProfile[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    bio: '',
    interests: '',
    location: ''
  });

  useEffect(() => {
    checkProfile();
    loadProfiles();
    loadMatches();
  }, []);

  const checkProfile = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const chatsUrl = 'https://functions.poehali.dev/fe62a1f5-6c6e-4d99-ba0c-8ceed33a9b17';
      const response = await fetch(chatsUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token || ''
        },
        body: JSON.stringify({ action: 'dating_profile_get' })
      });
      if (response.ok) {
        const profile = await response.json();
        setHasProfile(true);
        setCurrentProfile(profile);
      }
    } catch (err) {
      console.error('Failed to check profile:', err);
    }
  };

  const loadProfiles = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const chatsUrl = 'https://functions.poehali.dev/fe62a1f5-6c6e-4d99-ba0c-8ceed33a9b17';
      const response = await fetch(chatsUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token || ''
        },
        body: JSON.stringify({ action: 'dating_feed' })
      });
      if (response.ok) {
        const data = await response.json();
        setProfiles(data);
      }
    } catch (err) {
      console.error('Failed to load profiles:', err);
    }
  };

  const loadMatches = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const chatsUrl = 'https://functions.poehali.dev/fe62a1f5-6c6e-4d99-ba0c-8ceed33a9b17';
      const response = await fetch(chatsUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token || ''
        },
        body: JSON.stringify({ action: 'dating_matches' })
      });
      if (response.ok) {
        const data = await response.json();
        setMatches(data);
      }
    } catch (err) {
      console.error('Failed to load matches:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('auth_token');
      const chatsUrl = 'https://functions.poehali.dev/fe62a1f5-6c6e-4d99-ba0c-8ceed33a9b17';
      const response = await fetch(chatsUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token || ''
        },
        body: JSON.stringify({
          action: 'dating_profile_create',
          ...formData,
          age: parseInt(formData.age),
          interests: formData.interests.split(',').map(i => i.trim()).filter(Boolean)
        })
      });
      
      if (response.ok) {
        setShowForm(false);
        checkProfile();
        loadProfiles();
      }
    } catch (err) {
      console.error('Failed to create profile:', err);
    }
  };

  const handleSwipe = async (action: 'like' | 'dislike' | 'superlike') => {
    const profile = profiles[currentIndex];
    if (!profile) return;

    try {
      const token = localStorage.getItem('auth_token');
      const chatsUrl = 'https://functions.poehali.dev/fe62a1f5-6c6e-4d99-ba0c-8ceed33a9b17';
      const response = await fetch(chatsUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token || ''
        },
        body: JSON.stringify({
          action: 'dating_swipe',
          to_user_id: profile.user_id,
          swipe_action: action
        })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.matched) {
          setMatchedProfile(profile);
          setShowMatchModal(true);
          loadMatches();
        }
        setCurrentIndex(prev => prev + 1);
      }
    } catch (err) {
      console.error('Failed to swipe:', err);
    }
  };

  if (!hasProfile && !showForm) {
    return <DatingOnboarding onCreateProfile={() => setShowForm(true)} />;
  }

  if (showForm) {
    return (
      <DatingProfileForm
        formData={formData}
        onFormDataChange={setFormData}
        onSubmit={handleSubmit}
        onClose={() => setShowForm(false)}
      />
    );
  }

  const currentCard = profiles[currentIndex];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="flex justify-center gap-1 sm:gap-2 p-2 sm:p-4 bg-white/50 backdrop-blur-sm border-b overflow-x-auto">
        <Button
          variant={activeTab === 'feed' ? 'default' : 'ghost'}
          className={activeTab === 'feed' ? 'bg-gradient-to-r from-pink-500 to-purple-600' : ''}
          onClick={() => setActiveTab('feed')}
        >
          <Icon name="Heart" size={18} className="sm:mr-2" />
          <span className="hidden sm:inline">Знакомства</span>
        </Button>
        <Button
          variant={activeTab === 'matches' ? 'default' : 'ghost'}
          className={activeTab === 'matches' ? 'bg-gradient-to-r from-pink-500 to-purple-600' : ''}
          onClick={() => setActiveTab('matches')}
        >
          <Icon name="Sparkles" size={18} className="sm:mr-2" />
          <span className="hidden sm:inline">Мои матчи</span>
          <span className="sm:hidden">Матчи</span>
          <span> ({matches.length})</span>
        </Button>
      </div>

      {activeTab === 'matches' ? (
        <DatingMatches
          matches={matches}
          onNavigateToFeed={() => setActiveTab('feed')}
          onNavigateToChats={onNavigateToChats}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center p-2 sm:p-4">
          <DatingFeed
            currentCard={currentCard}
            onSwipe={handleSwipe}
            onReload={loadProfiles}
          />
        </div>
      )}

      {showMatchModal && matchedProfile && (
        <DatingMatchModal
          matchedProfile={matchedProfile}
          onClose={() => {
            setShowMatchModal(false);
            setMatchedProfile(null);
          }}
          onNavigateToChats={onNavigateToChats}
        />
      )}
    </div>
  );
}