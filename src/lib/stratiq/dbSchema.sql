-- ==============================================================================
-- StratIQ Database Schema (PostgreSQL / Supabase)
-- Modular, Game-Agnostic, Owner-Scoped Row Level Security (RLS)
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Games Directory (Future-proof for Free Fire, BGMI, Valorant, CoD)
CREATE TABLE IF NOT EXISTS public.games (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'coming-soon', -- 'supported' | 'coming-soon'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed initial games
INSERT INTO public.games (id, name, category, status)
VALUES 
    ('free-fire', 'Free Fire', 'Battle Royale (Mobile)', 'supported'),
    ('bgmi', 'BGMI (Battlegrounds Mobile India)', 'Battle Royale (Mobile)', 'coming-soon'),
    ('valorant', 'Valorant', 'Tactical FPS (PC)', 'coming-soon'),
    ('cod', 'Call of Duty: Mobile', 'Action FPS (Mobile)', 'coming-soon')
ON CONFLICT (id) DO NOTHING;

-- 2. Gameplay Sessions
CREATE TABLE IF NOT EXISTS public.gameplay_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    game_id VARCHAR(50) REFERENCES public.games(id),
    session_type VARCHAR(30) NOT NULL, -- 'upload' | 'capture'
    status VARCHAR(30) NOT NULL DEFAULT 'pending', -- 'pending' | 'processing' | 'completed' | 'failed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Gameplay Videos Storage Metadata
CREATE TABLE IF NOT EXISTS public.gameplay_videos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES public.gameplay_sessions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    storage_path TEXT,
    filename TEXT NOT NULL,
    size_bytes BIGINT NOT NULL,
    duration_seconds INT NOT NULL,
    mime_type VARCHAR(50) NOT NULL,
    thumbnail_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Game Verifications
CREATE TABLE IF NOT EXISTS public.game_verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES public.gameplay_sessions(id) ON DELETE CASCADE,
    selected_game_id VARCHAR(50) REFERENCES public.games(id),
    detected_game_name TEXT NOT NULL,
    confidence_score NUMERIC(5, 4) NOT NULL,
    is_match BOOLEAN NOT NULL,
    verification_status VARCHAR(30) NOT NULL, -- 'verified' | 'mismatch' | 'uncertain'
    rejection_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Match Analyses
CREATE TABLE IF NOT EXISTS public.match_analyses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES public.gameplay_sessions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    game_id VARCHAR(50) REFERENCES public.games(id),
    overall_score INT NOT NULL,
    combat_score INT NOT NULL,
    positioning_score INT NOT NULL,
    movement_score INT NOT NULL,
    decision_making_score INT NOT NULL,
    match_title TEXT,
    match_duration_text VARCHAR(50),
    is_demo BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Key Moments
CREATE TABLE IF NOT EXISTS public.key_moments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    match_analysis_id UUID REFERENCES public.match_analyses(id) ON DELETE CASCADE,
    timestamp_seconds INT NOT NULL,
    timestamp_display VARCHAR(20) NOT NULL,
    title TEXT NOT NULL,
    situation TEXT NOT NULL,
    player_action TEXT NOT NULL,
    outcome VARCHAR(50) NOT NULL, -- 'eliminated' | 'survived' | 'disengaged'
    importance VARCHAR(20) NOT NULL, -- 'High' | 'Medium' | 'Low'
    category VARCHAR(50) NOT NULL, -- 'combat' | 'positioning' | 'movement' | 'decisionMaking'
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Decision Analyses
CREATE TABLE IF NOT EXISTS public.decision_analyses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key_moment_id UUID REFERENCES public.key_moments(id) ON DELETE CASCADE,
    situation_explanation TEXT NOT NULL,
    player_decision_explanation TEXT NOT NULL,
    outcome_explanation TEXT NOT NULL,
    why_it_mattered TEXT NOT NULL,
    confidence_note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Alternative Actions ("What If?" Counterfactuals)
CREATE TABLE IF NOT EXISTS public.alternative_actions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key_moment_id UUID REFERENCES public.key_moments(id) ON DELETE CASCADE,
    original_decision TEXT NOT NULL,
    possible_alternative TEXT NOT NULL,
    expected_difference TEXT NOT NULL,
    tactical_rationale TEXT NOT NULL,
    risk_factor VARCHAR(20) NOT NULL, -- 'Low' | 'Moderate' | 'High'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Recurring Mistakes
CREATE TABLE IF NOT EXISTS public.mistakes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    match_analysis_id UUID REFERENCES public.match_analyses(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    game_id VARCHAR(50) REFERENCES public.games(id),
    title VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL,
    frequency_count INT NOT NULL DEFAULT 1,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Training Plans & Coaching
CREATE TABLE IF NOT EXISTS public.training_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    match_analysis_id UUID REFERENCES public.match_analyses(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    primary_focus VARCHAR(100) NOT NULL,
    reason TEXT NOT NULL,
    next_match_goal TEXT NOT NULL,
    training_goals TEXT[],
    recommended_drills TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. Player Profiles
CREATE TABLE IF NOT EXISTS public.player_profiles (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    player_name VARCHAR(100) NOT NULL,
    matches_analyzed INT DEFAULT 0,
    strongest_area VARCHAR(100),
    strongest_score INT,
    recurring_weakness VARCHAR(100),
    recurring_weakness_count INT,
    current_focus TEXT,
    average_score INT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 12. Improvement Metrics (Multi-match trends)
CREATE TABLE IF NOT EXISTS public.improvement_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    game_id VARCHAR(50) REFERENCES public.games(id),
    match_analysis_id UUID REFERENCES public.match_analyses(id) ON DELETE CASCADE,
    metric_name VARCHAR(100) NOT NULL,
    metric_value NUMERIC(8, 2) NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 13. Analysis Feedback
CREATE TABLE IF NOT EXISTS public.analysis_feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    key_moment_id UUID REFERENCES public.key_moments(id) ON DELETE CASCADE,
    rating VARCHAR(20) NOT NULL, -- 'helpful' | 'not_accurate'
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================================
-- Row Level Security (RLS) Policies
-- ==============================================================================

ALTER TABLE public.gameplay_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gameplay_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.match_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.key_moments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.decision_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alternative_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mistakes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.improvement_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analysis_feedback ENABLE ROW LEVEL SECURITY;

-- Owner-scoped access policies
CREATE POLICY "Users can access own gameplay sessions" 
    ON public.gameplay_sessions FOR ALL 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can access own gameplay videos" 
    ON public.gameplay_videos FOR ALL 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can access own match analyses" 
    ON public.match_analyses FOR ALL 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can access own player profile" 
    ON public.player_profiles FOR ALL 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can view public games"
    ON public.games FOR SELECT
    TO authenticated, anon
    USING (true);
