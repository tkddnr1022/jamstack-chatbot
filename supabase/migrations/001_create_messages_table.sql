-- 메시지 테이블 생성
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_messages_user_id ON public.messages(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at);

-- RLS (Row Level Security) 활성화
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- RLS 정책 생성
-- 모든 사용자가 메시지를 읽을 수 있음
CREATE POLICY "Allow users to read all messages" ON public.messages
    FOR SELECT USING (true);

-- 인증된 사용자만 메시지를 생성할 수 있음
CREATE POLICY "Allow authenticated users to insert messages" ON public.messages
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 사용자는 자신의 메시지만 수정할 수 있음
CREATE POLICY "Allow users to update own messages" ON public.messages
    FOR UPDATE USING (auth.uid() = user_id);

-- 사용자는 자신의 메시지만 삭제할 수 있음
CREATE POLICY "Allow users to delete own messages" ON public.messages
    FOR DELETE USING (auth.uid() = user_id);

-- updated_at 자동 업데이트를 위한 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- updated_at 트리거 생성
CREATE TRIGGER update_messages_updated_at
    BEFORE UPDATE ON public.messages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 