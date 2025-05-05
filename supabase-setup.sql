-- 创建生成任务表
CREATE TABLE generations (
  id UUID PRIMARY KEY,
  status TEXT NOT NULL,
  progress INTEGER NOT NULL,
  mode TEXT NOT NULL,
  size TEXT NOT NULL,
  result TEXT,
  error TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 添加索引以提高查询性能
CREATE INDEX idx_generations_status ON generations(status);
CREATE INDEX idx_generations_created_at ON generations(created_at);

-- 添加自动清理策略（可选，保留30天数据）
CREATE POLICY "自动删除30天前的记录" ON generations
FOR DELETE USING (created_at < NOW() - INTERVAL '30 days');
