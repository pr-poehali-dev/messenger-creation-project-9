import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { getActiveStoryPromotions, incrementStoryViews, incrementStoryClicks } from '@/lib/stories';

export default function Stories() {
  const navigate = useNavigate();
  const [selectedStory, setSelectedStory] = useState<number | null>(null);
  const [viewedStories, setViewedStories] = useState<Set<string>>(new Set());

  const promotions = getActiveStoryPromotions();
  
  const stories = promotions.map(promo => ({
    ...promo,
    viewed: viewedStories.has(promo.id)
  }));

  if (stories.length === 0) return null;

  const openStory = (index: number) => {
    setSelectedStory(index);
    const story = stories[index];
    setViewedStories(prev => new Set(prev).add(story.id));
    incrementStoryViews(story.id);
  };

  const closeStory = () => {
    setSelectedStory(null);
  };

  const nextStory = () => {
    if (selectedStory !== null && selectedStory < stories.length - 1) {
      openStory(selectedStory + 1);
    } else {
      closeStory();
    }
  };

  const prevStory = () => {
    if (selectedStory !== null && selectedStory > 0) {
      openStory(selectedStory - 1);
    }
  };

  const goToProduct = () => {
    if (selectedStory !== null) {
      const story = stories[selectedStory];
      incrementStoryClicks(story.id);
      closeStory();
      navigate(`/product/${story.productId}`);
    }
  };

  return (
    <>
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
            {stories.map((story, index) => (
              <button
                key={story.id}
                onClick={() => openStory(index)}
                className="flex-shrink-0 flex flex-col items-center gap-2 group"
              >
                <div className={`relative w-16 h-16 rounded-full p-0.5 ${
                  story.viewed 
                    ? 'bg-slate-600' 
                    : 'bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500'
                }`}>
                  <div className="w-full h-full rounded-full bg-slate-800 p-0.5">
                    <img
                      src={story.productImage}
                      alt={story.sellerName}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  {!story.viewed && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      <Icon name="Sparkles" size={12} />
                    </div>
                  )}
                </div>
                <span className="text-xs text-slate-300 max-w-[70px] truncate group-hover:text-white transition-colors">
                  {story.sellerName}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedStory !== null && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <button
            onClick={closeStory}
            className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <Icon name="X" size={24} />
          </button>

          <button
            onClick={prevStory}
            disabled={selectedStory === 0}
            className="absolute left-4 z-50 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Icon name="ChevronLeft" size={28} />
          </button>

          <button
            onClick={nextStory}
            className="absolute right-4 z-50 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <Icon name="ChevronRight" size={28} />
          </button>

          <div className="w-full max-w-md h-full relative">
            <div className="absolute top-0 left-0 right-0 z-40 p-4 flex gap-1">
              {stories.map((_, index) => (
                <div
                  key={index}
                  className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
                >
                  {index <= selectedStory && (
                    <div className="h-full bg-white rounded-full w-full" />
                  )}
                </div>
              ))}
            </div>

            <div className="absolute top-8 left-0 right-0 z-40 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-white p-0.5 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <Icon name="User" size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">
                  {stories[selectedStory].sellerName}
                </p>
                <p className="text-white/70 text-xs flex items-center gap-1">
                  <Icon name="Clock" size={12} />
                  {Math.floor((Date.now() - new Date(stories[selectedStory].startDate).getTime()) / (1000 * 60 * 60))} ч назад
                </p>
              </div>
              <div className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white text-xs font-semibold flex items-center gap-1">
                <Icon name="Zap" size={12} />
                Реклама
              </div>
            </div>

            <img
              src={stories[selectedStory].productImage}
              alt={stories[selectedStory].productName}
              className="w-full h-full object-cover"
            />

            <div className="absolute bottom-0 left-0 right-0 z-40 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
              <h3 className="text-white font-bold text-xl mb-2">
                {stories[selectedStory].productName}
              </h3>
              <div className="flex items-center justify-between mb-4">
                <p className="text-white text-2xl font-bold">
                  {stories[selectedStory].productPrice.toLocaleString('ru-RU')} ₽
                </p>
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <Icon name="Eye" size={16} />
                  <span>{stories[selectedStory].views}</span>
                </div>
              </div>
              <button
                onClick={goToProduct}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
              >
                Смотреть товар
                <Icon name="ArrowRight" size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
