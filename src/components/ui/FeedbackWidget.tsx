import React, { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, CheckCircle2 } from 'lucide-react';
import { saveAnalysisFeedback, getFeedbackForMoment } from '../../lib/stratiq/playerHistory';

interface FeedbackWidgetProps {
  momentId: string;
  matchId: string;
}

export const FeedbackWidget: React.FC<FeedbackWidgetProps> = ({ momentId, matchId }) => {
  const [feedback, setFeedback] = useState<'helpful' | 'not_accurate' | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const existing = getFeedbackForMoment(momentId);
    if (existing) {
      setFeedback(existing);
      setSubmitted(true);
    }
  }, [momentId]);

  const handleVote = (rating: 'helpful' | 'not_accurate') => {
    setFeedback(rating);
    setSubmitted(true);
    saveAnalysisFeedback(momentId, matchId, rating);
  };

  return (
    <div className="bg-[#11141e]/90 border border-slate-800/80 rounded-xl p-3.5 my-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div>
          <p className="text-xs font-semibold text-slate-300">Was this analysis useful?</p>
          <p className="text-[11px] text-slate-500">Your feedback improves future coaching recommendations</p>
        </div>

        {submitted ? (
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-lg self-start sm:self-auto">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>
              {feedback === 'helpful' ? 'Marked as Helpful' : 'Marked as Not Accurate'}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleVote('helpful')}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 text-slate-200 hover:bg-emerald-950 hover:text-emerald-300 hover:border-emerald-500/40 border border-slate-700/50 transition-all active:scale-95"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>Helpful</span>
            </button>
            <button
              onClick={() => handleVote('not_accurate')}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 text-slate-200 hover:bg-rose-950 hover:text-rose-300 hover:border-rose-500/40 border border-slate-700/50 transition-all active:scale-95"
            >
              <ThumbsDown className="w-3.5 h-3.5" />
              <span>Not accurate</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
